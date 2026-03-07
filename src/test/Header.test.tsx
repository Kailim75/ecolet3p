import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Header from "@/components/layout/Header";

const renderWithRouter = (ui: React.ReactElement) =>
  render(<BrowserRouter>{ui}</BrowserRouter>);

describe("Header", () => {
  it("renders the logo link to home", () => {
    renderWithRouter(<Header />);
    const homeLinks = screen.getAllByRole("link").filter((a) => a.getAttribute("href") === "/");
    expect(homeLinks.length).toBeGreaterThanOrEqual(1);
  });

  it("renders the phone number", () => {
    renderWithRouter(<Header />);
    expect(screen.getAllByText(/01 88 75 05 55/).length).toBeGreaterThanOrEqual(1);
  });

  it("renders the CTA button 'Prendre RDV'", () => {
    renderWithRouter(<Header />);
    expect(screen.getAllByText(/Prendre RDV/).length).toBeGreaterThanOrEqual(1);
  });

  it("renders main navigation items", () => {
    renderWithRouter(<Header />);
    expect(screen.getAllByText("Devenir Chauffeur").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Blog").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Contact").length).toBeGreaterThanOrEqual(1);
  });
});
