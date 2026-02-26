import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Footer from "@/components/layout/Footer";

const renderWithRouter = (ui: React.ReactElement) =>
  render(<BrowserRouter>{ui}</BrowserRouter>);

describe("Footer", () => {
  it("renders the company name and SIRET", () => {
    renderWithRouter(<Footer />);
    expect(screen.getAllByText(/ECOLE T3P/).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/94856480200023/)).toBeInTheDocument();
  });

  it("renders the phone number", () => {
    renderWithRouter(<Footer />);
    expect(screen.getAllByText(/01 88 75 05 55/).length).toBeGreaterThanOrEqual(1);
  });

  it("renders the email address", () => {
    renderWithRouter(<Footer />);
    expect(screen.getByText("montrouge@ecolet3p.fr")).toBeInTheDocument();
  });

  it("renders the address", () => {
    renderWithRouter(<Footer />);
    expect(screen.getByText(/3 rue Corneille/)).toBeInTheDocument();
    expect(screen.getByText(/92120 Montrouge/)).toBeInTheDocument();
  });

  it("renders section titles for silo links", () => {
    renderWithRouter(<Footer />);
    expect(screen.getAllByText(/Formations initiales/).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/Renouvellement & Services/).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/Blog Transport/).length).toBeGreaterThanOrEqual(1);
  });

  it("renders legal links", () => {
    renderWithRouter(<Footer />);
    const legalLinks = screen.getAllByText(/Mentions légales/);
    expect(legalLinks.length).toBeGreaterThanOrEqual(1);
  });

  it("renders Google reviews badge", () => {
    renderWithRouter(<Footer />);
    expect(screen.getByText(/359 avis Google/)).toBeInTheDocument();
  });
});
