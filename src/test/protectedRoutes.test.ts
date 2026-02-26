/// <reference types="node" />
import { describe, it, expect } from "vitest";
import { PROTECTED_ROUTES } from "@/data/protectedRoutes";

// Extract all route paths defined in App.tsx by parsing the source
import fs from "fs";
import path from "path";

describe("PROTECTED_ROUTES sync with App.tsx", () => {
  const appSource = fs.readFileSync(
    path.resolve(__dirname, "../App.tsx"),
    "utf-8"
  );

  // Match <Route path="/some/path" from App.tsx
  const routePathRegex = /<Route\s+path="([^"*]+)"/g;
  const appRoutes = new Set<string>();
  let match: RegExpExecArray | null;
  while ((match = routePathRegex.exec(appSource)) !== null) {
    // Skip dynamic segments like :ville, :slug
    if (!match[1].includes(":")) {
      appRoutes.add(match[1]);
    }
  }

  it("should find routes in App.tsx", () => {
    expect(appRoutes.size).toBeGreaterThan(10);
  });

  it("every non-redirect App.tsx route should be in PROTECTED_ROUTES", () => {
    // Filter out Navigate redirects — they're not real pages
    const navigateRegex = /<Route\s+path="([^"*]+)"\s+element=\{<Navigate/g;
    const redirectPaths = new Set<string>();
    let m: RegExpExecArray | null;
    while ((m = navigateRegex.exec(appSource)) !== null) {
      redirectPaths.add(m[1]);
    }

    const missing: string[] = [];
    for (const route of appRoutes) {
      if (!redirectPaths.has(route) && !PROTECTED_ROUTES.has(route)) {
        missing.push(route);
      }
    }

    expect(missing, `Routes manquantes dans PROTECTED_ROUTES: ${missing.join(", ")}`).toEqual([]);
  });

  it("every PROTECTED_ROUTE should exist in App.tsx (no stale entries)", () => {
    const stale: string[] = [];
    for (const route of PROTECTED_ROUTES) {
      if (!appRoutes.has(route)) {
        stale.push(route);
      }
    }

    expect(stale, `Routes obsolètes dans PROTECTED_ROUTES: ${stale.join(", ")}`).toEqual([]);
  });
});
