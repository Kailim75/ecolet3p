import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import HeroSection from "@/components/home-v2/HeroSection";

const renderWithRouter = (ui: React.ReactElement) =>
  render(<BrowserRouter>{ui}</BrowserRouter>);

describe("HeroSection", () => {
  it("renders the default h1", () => {
    renderWithRouter(<HeroSection />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Devenez chauffeur professionnel à partir de 990€."
    );
  });

  it("renders a custom h1 when h1Override is provided", () => {
    renderWithRouter(<HeroSection h1Override="Formation VTC Montrouge" />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Formation VTC Montrouge"
    );
  });

  it("renders the CTA 'Réserver ma place'", () => {
    renderWithRouter(<HeroSection />);
    expect(screen.getByText("Réserver ma place")).toBeInTheDocument();
  });

  it("renders the secondary CTA 'Voir les formations'", () => {
    renderWithRouter(<HeroSection />);
    expect(screen.getByText("Voir les formations")).toBeInTheDocument();
  });

  it("renders the hero image with alt text", () => {
    renderWithRouter(<HeroSection />);
    const img = screen.getByAltText(/Session de formation/);
    expect(img).toBeInTheDocument();
    expect(img.tagName).toBe("IMG");
  });

  it("renders the success rate badge", () => {
    renderWithRouter(<HeroSection />);
    expect(screen.getAllByText("94%").length).toBeGreaterThanOrEqual(1);
  });

  it("renders the audit link", () => {
    renderWithRouter(<HeroSection />);
    expect(screen.getByText(/Audit de rentabilité gratuit/)).toBeInTheDocument();
  });
});
