import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { CosmosClient, SqlQuerySpec } from "@azure/cosmos";
import { v4 as uuidv4 } from "uuid";

const client = new CosmosClient(process.env.COSMOS_CONNECTION_STRING!);
const container = client.database("resume-db").container("resumes");

// ── 공통 유틸 ────────────────────────────────────────────────────────────────

function getUserId(req: HttpRequest): string | null {
  const principal = req.headers.get("x-ms-client-principal");
  if (!principal) return null;
  try {
    const { userId } = JSON.parse(Buffer.from(principal, "base64").toString("utf-8"));
    return userId || null;
  } catch {
    return null;
  }
}

const json = (body: unknown, status = 200): HttpResponseInit => ({
  status,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
});

// ── POST /api/resumes — 생성 또는 갱신 ──────────────────────────────────────

async function saveResume(req: HttpRequest, ctx: InvocationContext): Promise<HttpResponseInit> {
  const userId = getUserId(req);
  if (!userId) return { status: 401, body: "Unauthorized" };

  try {
    const body = await req.json() as { id?: string; data: unknown };
    const now = new Date().toISOString();
    let createdAt = now;

    if (body.id) {
      // 기존 문서 소유권 확인
      try {
        const { resource } = await container.item(body.id, userId).read();
        if (resource) {
          if (resource.userId !== userId) return { status: 403, body: "Forbidden" };
          createdAt = resource.createdAt ?? now;
        }
      } catch (e: any) {
        if (e.code !== 404) throw e;
        // 404면 신규 생성으로 처리
      }
    }

    const doc = {
      id: body.id || uuidv4(),
      userId,
      data: body.data,
      createdAt,
      updatedAt: now,
    };

    await container.items.upsert(doc);
    return json(doc);
  } catch (e) {
    ctx.error("saveResume:", e);
    return { status: 500, body: "Internal Server Error" };
  }
}

// ── GET /api/resumes — 목록 조회 ─────────────────────────────────────────────

async function listResumes(req: HttpRequest, ctx: InvocationContext): Promise<HttpResponseInit> {
  const userId = getUserId(req);
  if (!userId) return { status: 401, body: "Unauthorized" };

  try {
    const query: SqlQuerySpec = {
      query: "SELECT c.id, c.updatedAt FROM c WHERE c.userId = @userId ORDER BY c.updatedAt DESC",
      parameters: [{ name: "@userId", value: userId }],
    };
    const { resources } = await container.items.query(query).fetchAll();
    return json(resources);
  } catch (e) {
    ctx.error("listResumes:", e);
    return { status: 500, body: "Internal Server Error" };
  }
}

// ── GET /api/resumes/{id} — 단건 조회 ───────────────────────────────────────

async function getResume(req: HttpRequest, ctx: InvocationContext): Promise<HttpResponseInit> {
  const userId = getUserId(req);
  if (!userId) return { status: 401, body: "Unauthorized" };

  try {
    const { resource } = await container.item(req.params.id, userId).read();
    if (!resource) return json({ error: "Not found" }, 404);
    if (resource.userId !== userId) return { status: 403, body: "Forbidden" };
    return json(resource);
  } catch (e: any) {
    if (e.code === 404) return json({ error: "Not found" }, 404);
    ctx.error("getResume:", e);
    return { status: 500, body: "Internal Server Error" };
  }
}

// ── DELETE /api/resumes/{id} ─────────────────────────────────────────────────

async function deleteResume(req: HttpRequest, ctx: InvocationContext): Promise<HttpResponseInit> {
  const userId = getUserId(req);
  if (!userId) return { status: 401, body: "Unauthorized" };

  try {
    const { resource } = await container.item(req.params.id, userId).read();
    if (!resource) return { status: 404, body: "Not found" };
    if (resource.userId !== userId) return { status: 403, body: "Forbidden" };
    await container.item(req.params.id, userId).delete();
    return { status: 204, body: "" };
  } catch (e: any) {
    if (e.code === 404) return { status: 404, body: "Not found" };
    ctx.error("deleteResume:", e);
    return { status: 500, body: "Internal Server Error" };
  }
}

// ── 라우트 등록 ──────────────────────────────────────────────────────────────

app.http("saveResume", {
  methods: ["POST"],
  authLevel: "anonymous",
  route: "resumes",
  handler: saveResume,
});

app.http("listResumes", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "resumes",
  handler: listResumes,
});

app.http("getResume", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "resumes/{id}",
  handler: getResume,
});

app.http("deleteResume", {
  methods: ["DELETE"],
  authLevel: "anonymous",
  route: "resumes/{id}",
  handler: deleteResume,
});
