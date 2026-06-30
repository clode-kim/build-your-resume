import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { CosmosClient } from "@azure/cosmos";

const client = new CosmosClient(process.env.COSMOS_CONNECTION_STRING!);
const container = client.database("resume-db").container("resumes");

function getUserId(req: HttpRequest): string | null {
  const principal = req.headers.get("x-ms-client-principal");
  if (!principal) return null;
  try {
    const decoded = Buffer.from(principal, "base64").toString("utf-8");
    const { userId } = JSON.parse(decoded);
    return userId || null;
  } catch {
    return null;
  }
}

const corsHeaders = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
};

async function getResume(req: HttpRequest, ctx: InvocationContext): Promise<HttpResponseInit> {
  const userId = getUserId(req);
  if (!userId) return { status: 401, body: "Unauthorized" };

  try {
    const { resource } = await container.item(userId, userId).read();
    return { status: 200, headers: corsHeaders, body: JSON.stringify(resource?.data ?? null) };
  } catch (e: any) {
    if (e.code === 404) return { status: 200, headers: corsHeaders, body: "null" };
    ctx.error("getResume error:", e);
    return { status: 500, body: "Internal Server Error" };
  }
}

async function saveResume(req: HttpRequest, ctx: InvocationContext): Promise<HttpResponseInit> {
  const userId = getUserId(req);
  if (!userId) return { status: 401, body: "Unauthorized" };

  try {
    const resumeData = await req.json();
    await container.items.upsert({ id: userId, userId, data: resumeData });
    return { status: 200, headers: corsHeaders, body: JSON.stringify({ ok: true }) };
  } catch (e) {
    ctx.error("saveResume error:", e);
    return { status: 500, body: "Internal Server Error" };
  }
}

app.http("getResume", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "resume",
  handler: getResume,
});

app.http("saveResume", {
  methods: ["PUT"],
  authLevel: "anonymous",
  route: "resume",
  handler: saveResume,
});
