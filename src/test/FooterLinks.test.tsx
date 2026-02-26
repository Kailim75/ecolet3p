/// <reference types="node" />
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Footer from "@/components/layout/Footer";
import fs from "fs";
import path from "path";

describe("Footer internal links validity", () => {
  // Parse all route paths from App.tsx
  const appSource = fs.readFileSync(
    path.resolve(__dirname, "../App.tsx"),
    "utf-8"
  );
  const routePathRegex = /<Route\s+path="([^"*]+)"/g;
  const appRoutes = new Set<string>();
  let match: RegExpExecArray | null;
  while ((match = routePathRegex.exec(appSource)) !== null) {
    appRoutes.add(match[1]);
  }

  // Also add dynamic route patterns for matching
  const dynamicPatterns = [
    /^\/blog\/.+/,          // /blog/:slug
    /^\/formations\/.+/,    // /formations/:ville
  ];

  const isValidRoute = (href: string) => {
    if (appRoutes.has(href)) return true;
    return dynamicPatterns.some((p) => p.test(href));
  };

  it("should have app routes loaded", () => {
    expect(appRoutes.size).toBeGreaterThan(10);
  });

  it("every internal link in Footer should match a valid app route", () => {
    const { container } = render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );

    const allLinks = Array.from(container.querySelectorAll("a[href]"));
    const internalLinks = allLinks.filter((a) => {
      const href = a.getAttribute("href") || "";
      // Only check internal links (starting with /) and skip anchors (#) and external
      return href.startsWith("/") && !href.startsWith("//");
    });

    expect(internalLinks.length).toBeGreaterThan(10);

    const invalidLinks: string[] = [];
    for (const link of internalLinks) {
      const href = link.getAttribute("href")!;
      if (!isValidRoute(href)) {
        invalidLinks.push(`"${link.textContent?.trim()}" → ${href}`);
      }
    }

    expect(
      invalidLinks,
      `Liens du Footer pointant vers des routes inexistantes :\n${invalidLinks.join("\n")}`
    ).toEqual([]);
  });
});
