"use client";

import { useState, useEffect } from "react";

export interface AuthUser {
  userId: string;
  userDetails: string;
  identityProvider: string;
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/.auth/me")
      .then((r) => r.json())
      .then((data) => {
        const p = data?.clientPrincipal;
        if (p?.userRoles?.includes("authenticated")) {
          setUser({ userId: p.userId, userDetails: p.userDetails, identityProvider: p.identityProvider });
        } else {
          setUser(null);
        }
      })
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  return { user, loading };
}
