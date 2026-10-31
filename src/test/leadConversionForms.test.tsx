import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Contact from "@/pages/Contact";
import PreRegistrationForm from "@/components/formations/PreRegistrationForm";
import StepPreRegistrationForm from "@/components/formations/StepPreRegistrationForm";
import QuoteRequestModal from "@/components/quote/QuoteRequestModal";
import LeadCaptureForm from "@/components/simulator/LeadCaptureForm";
import DrivingPlanner from "@/components/resultats/DrivingPlanner";
import AppointmentForm from "@/components/appointments/AppointmentForm";
import BlogArticle from "@/pages/BlogArticle";

const mocks = vi.hoisted(() => ({
  track: vi.fn(), insert: vi.fn(), invoke: vi.fn(), formSubmit: vi.fn(),
  toastSuccess: vi.fn(), toastError: vi.fn(),
}));
vi.mock("sonner", () => ({ toast: { success: mocks.toastSuccess, error: mocks.toastError } }));
vi.mock("@/lib/trackConversion", () => ({ trackLeadConversion: mocks.track }));
vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    from: () => ({
      insert: mocks.insert,
      select: () => {
        const query = { eq: () => query, gte: () => query, order: () => Promise.resolve({ data: [] }) };
        return query;
      },
    }),
    functions: { invoke: mocks.invoke },
  },
}));
vi.mock("@/components/layout/Layout", () => ({ default: ({ children }: { children: React.ReactNode }) => <>{children}</> }));
vi.mock("@/components/seo/DynamicSEOHead", () => ({ default: () => null }));
vi.mock("@/components/seo/SeoH1Text", () => ({ default: () => null }));
vi.mock("@/components/home/TrustBar", () => ({ default: () => null }));
vi.mock("@/components/newsletter/NewsletterForm", () => ({ default: () => null }));
vi.mock("@/components/ui/OptimizedImage", () => ({ default: () => null }));
vi.mock("@/data/blogArticles", () => ({
  getArticleBySlug: () => ({
    slug: "test-guide", title: "Test guide", content: "Premier paragraphe.\n\nDeuxième paragraphe.\n\nTroisième paragraphe.\n\nDernier paragraphe.",
    publishDate: "2026-10-31", category: "Taxi", image: "/test.jpg", author: "ÉCOLE T3P", excerpt: "Test", metaDescription: "Test", readTime: "2 min",
  }),
  getRelatedArticles: () => [],
}));
vi.mock("@/lib/analytics", () => ({ analytics: { trackFormSubmission: mocks.formSubmit, trackPreRegistrationComplete: vi.fn() } }));
vi.mock("@/hooks/use-toast", () => ({ useToast: () => ({ toast: vi.fn() }), toast: vi.fn() }));
vi.mock("@/components/ui/calendar", () => ({
  Calendar: ({ onSelect }: { onSelect: (date: Date) => void }) =>
    <button type="button" onClick={() => onSelect(new Date("2027-01-11T12:00:00"))}>11 janvier 2027</button>,
}));

function insertResult(error: object | null) {
  const result = { data: { id: "test-lead" }, error };
  const pending = Promise.resolve(result);
  return Object.assign(pending, { select: () => ({ single: () => pending }) });
}
function fill(placeholder: string, value: string) {
  fireEvent.change(screen.getByPlaceholderText(placeholder), { target: { value } });
}
function fillPerson() {
  fill("Jean", "Test");
  fill("Dupont", "Conversion");
  fill("jean@email.com", "test@example.com");
  fill("06 12 34 56 78", "0612345678");
}

describe("successful saved requests only", () => {
  beforeEach(() => {
    vi.stubGlobal("ResizeObserver", class { observe() {} unobserve() {} disconnect() {} });
    Element.prototype.scrollIntoView = vi.fn();
    Element.prototype.hasPointerCapture = () => false;
    Element.prototype.setPointerCapture = vi.fn();
    Element.prototype.releasePointerCapture = vi.fn();
    mocks.track.mockReset(); mocks.insert.mockReset(); mocks.invoke.mockReset(); mocks.formSubmit.mockReset();
    mocks.toastSuccess.mockReset(); mocks.toastError.mockReset();
    mocks.invoke.mockResolvedValue({ data: {}, error: null });
  });
  afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

  for (const failed of [false, true]) {
    const name = failed ? "does not count failed persistence" : "counts successful persistence once";
    it(`contact request ${name}`, async () => {
      mocks.insert.mockReturnValue(insertResult(failed ? { message: "failure" } : null));
      render(<MemoryRouter><Contact /></MemoryRouter>);
      expect(mocks.track).not.toHaveBeenCalled();
      fill("Jean Dupont", "Test Conversion");
      fill("jean.dupont@exemple.fr", "test@example.com");
      fill("06 12 34 56 78", "0612345678");
      fireEvent.click(screen.getByRole("checkbox"));
      fireEvent.submit(document.querySelector("form") as HTMLFormElement);
      await waitFor(() => expect(mocks.insert).toHaveBeenCalledTimes(1));
      if (!failed) await screen.findByText("Demande envoyée avec succès");
      expect(mocks.track).toHaveBeenCalledTimes(failed ? 0 : 1);
      expect(mocks.formSubmit).toHaveBeenCalledTimes(failed ? 0 : 1);
    });
    it(`quote request ${name}`, async () => {
      mocks.insert.mockReturnValue(insertResult(failed ? { message: "failure" } : null));
      render(<QuoteRequestModal isOpen onClose={vi.fn()} preselectedFormation="taxi" />);
      expect(mocks.track).not.toHaveBeenCalled();
      fireEvent.click(screen.getByRole("button", { name: /Suivant/ }));
      await screen.findByPlaceholderText("Jean");
      fillPerson();
      fireEvent.click(screen.getByRole("button", { name: /Suivant/ }));
      const send = await screen.findByRole("button", { name: /^Envoyer$/ });
      fireEvent.click(send);
      await waitFor(() => expect(mocks.insert).toHaveBeenCalledTimes(1));
      if (!failed) await screen.findByText("Demande envoyée !");
      expect(mocks.track).toHaveBeenCalledTimes(failed ? 0 : 1);
      expect(mocks.formSubmit).toHaveBeenCalledTimes(failed ? 0 : 1);
    });
    it(`appointment request ${name}`, async () => {
      mocks.insert.mockReturnValue(insertResult(failed ? { message: "failure" } : null));
      render(<AppointmentForm />);
      expect(mocks.track).not.toHaveBeenCalled();
      fill("Jean", "Test"); fill("Dupont", "Conversion"); fill("jean.dupont@email.com", "test@example.com");
      fireEvent.click(screen.getAllByRole("combobox")[0]);
      fireEvent.click(await screen.findByRole("option", { name: "Formation VTC (35h)" }));
      fireEvent.click(screen.getByRole("button", { name: /Choisir une date/ }));
      fireEvent.click(screen.getByRole("button", { name: "11 janvier 2027" }));
      fireEvent.click(screen.getAllByRole("combobox")[1]);
      fireEvent.click(await screen.findByRole("option", { name: "09:00" }));
      fireEvent.submit(document.querySelector("form") as HTMLFormElement);
      await waitFor(() => expect(mocks.insert).toHaveBeenCalledTimes(1));
      if (!failed) await screen.findByText("Demande envoyée !");
      expect(mocks.track).toHaveBeenCalledTimes(failed ? 0 : 1);
    });
    it(`standard pre-registration ${name}`, async () => {
      mocks.insert.mockReturnValue(insertResult(failed ? { message: "failure" } : null));
      render(<PreRegistrationForm isOpen onClose={vi.fn()} formationTitle="Taxi" formationDuration="Journée" />);
      expect(mocks.track).not.toHaveBeenCalled();
      // Required values are provided through the actual inputs, not the tracker.
      fill("Jean", "Test"); fill("Dupont", "Conversion");
      fill("jean.dupont@email.com", "test@example.com"); fill("06 12 34 56 78", "0612345678");
      fireEvent.submit(document.querySelector("form") as HTMLFormElement);
      await waitFor(() => expect(mocks.insert).toHaveBeenCalledTimes(1));
      await waitFor(() => expect(mocks.invoke).toHaveBeenCalledTimes(failed ? 0 : 1));
      expect(mocks.track).toHaveBeenCalledTimes(failed ? 0 : 1);
      expect(mocks.formSubmit).toHaveBeenCalledTimes(failed ? 0 : 1);
    });
    it(`step pre-registration ${name}`, async () => {
      mocks.insert.mockReturnValue(insertResult(failed ? { message: "failure" } : null));
      render(<StepPreRegistrationForm isOpen onClose={vi.fn()} defaultFormation="taxi" />);
      expect(mocks.track).not.toHaveBeenCalled();
      fireEvent.click(screen.getByRole("radio", { name: /Journée/ }));
      fireEvent.click(screen.getByRole("button", { name: /Suivant/ }));
      await screen.findByPlaceholderText("Jean");
      fillPerson();
      fireEvent.click(screen.getByRole("button", { name: /^Envoyer$/ }));
      await waitFor(() => expect(mocks.insert).toHaveBeenCalledTimes(1));
      await waitFor(() => expect(mocks.invoke).toHaveBeenCalledTimes(failed ? 0 : 1));
      expect(mocks.track).toHaveBeenCalledTimes(failed ? 0 : 1);
      expect(mocks.formSubmit).toHaveBeenCalledTimes(failed ? 0 : 1);
    });
    it(`simulator lead ${name}`, async () => {
      mocks.insert.mockReturnValue(insertResult(failed ? { message: "failure" } : null));
      const onSuccess = vi.fn();
      render(<LeadCaptureForm inputs={{} as never} results={{} as never} onSuccess={onSuccess} />);
      expect(mocks.track).not.toHaveBeenCalled();
      fill("Prénom *", "Test"); fill("Email *", "test@example.com"); fill("Téléphone *", "0612345678");
      fireEvent.submit(document.querySelector("form") as HTMLFormElement);
      await waitFor(() => expect(mocks.insert).toHaveBeenCalledTimes(1));
      await waitFor(() => expect(onSuccess).toHaveBeenCalledTimes(failed ? 0 : 1));
      expect(mocks.track).toHaveBeenCalledTimes(failed ? 0 : 1);
      expect(mocks.formSubmit).toHaveBeenCalledTimes(failed ? 0 : 1);
    });
  }
  it("invalid pre-registration never inserts or counts", () => {
    render(<PreRegistrationForm isOpen onClose={vi.fn()} formationTitle="Taxi" formationDuration="Journée" />);
    fireEvent.submit(document.querySelector("form") as HTMLFormElement);
    expect(mocks.insert).not.toHaveBeenCalled();
    expect(mocks.track).not.toHaveBeenCalled();
  });
  it("simulator lead refuses an email without extension or a 2-digit phone", async () => {
    mocks.insert.mockReturnValue(insertResult(null));
    render(<LeadCaptureForm inputs={{} as never} results={{} as never} onSuccess={vi.fn()} />);
    fill("Prénom *", "Test"); fill("Email *", "audit.test@example"); fill("Téléphone *", "12");
    fireEvent.submit(document.querySelector("form") as HTMLFormElement);
    expect(await screen.findByText("L'email n'est pas valide")).toBeInTheDocument();
    expect(screen.getByText("Le numéro de téléphone n'est pas valide")).toBeInTheDocument();
    expect(mocks.insert).not.toHaveBeenCalled();
    expect(mocks.track).not.toHaveBeenCalled();
    expect(mocks.formSubmit).not.toHaveBeenCalled();
  });
  it("quote request notifies the centre in the format the function expects, message included", async () => {
    mocks.insert.mockReturnValue(insertResult(null));
    render(<QuoteRequestModal isOpen onClose={vi.fn()} preselectedFormation="vtc" />);
    fireEvent.click(screen.getByRole("button", { name: /Suivant/ }));
    await screen.findByPlaceholderText("Jean");
    fillPerson();
    fireEvent.click(screen.getByRole("button", { name: /Suivant/ }));
    fireEvent.change(await screen.findByPlaceholderText(/Questions, disponibilités/), { target: { value: "Plutôt le soir" } });
    fireEvent.click(screen.getByRole("button", { name: /^Envoyer$/ }));
    await waitFor(() => expect(mocks.invoke).toHaveBeenCalledTimes(1));
    expect(mocks.insert).toHaveBeenCalledWith(expect.objectContaining({ formation_title: "VTC", formation_duration: "Devis demandé" }));
    expect(mocks.invoke).toHaveBeenCalledWith("notify-contact-request", {
      body: {
        record: {
          full_name: "Test Conversion",
          email: "test@example.com",
          phone: "0612345678",
          formation: "vtc",
          message: "Demande de devis — Plutôt le soir",
        },
      },
    });
  });
  it("quote request ignores an unknown preselected formation", () => {
    render(<QuoteRequestModal isOpen onClose={vi.fn()} preselectedFormation="t3p" />);
    expect(screen.getByRole("button", { name: /Suivant/ })).toBeDisabled();
  });
  it("quote request refuses a phone that is not a French number", async () => {
    render(<QuoteRequestModal isOpen onClose={vi.fn()} preselectedFormation="taxi" />);
    fireEvent.click(screen.getByRole("button", { name: /Suivant/ }));
    await screen.findByPlaceholderText("Jean");
    fill("Jean", "Test"); fill("Dupont", "Conversion"); fill("jean@email.com", "test@example.com");
    fill("06 12 34 56 78", "abcdefghij");
    fireEvent.click(screen.getByRole("button", { name: /Suivant/ }));
    fireEvent.click(await screen.findByRole("button", { name: /^Envoyer$/ }));
    expect(await screen.findByText("Numéro français invalide")).toBeInTheDocument();
    expect(mocks.insert).not.toHaveBeenCalled();
  });
  it("notification failure does not lose a successfully saved lead", async () => {
    mocks.insert.mockReturnValue(insertResult(null));
    mocks.invoke.mockRejectedValue(new Error("Email unavailable"));
    render(<PreRegistrationForm isOpen onClose={vi.fn()} formationTitle="Taxi" formationDuration="Journée" />);
    fill("Jean", "Test"); fill("Dupont", "Conversion");
    fill("jean.dupont@email.com", "test@example.com"); fill("06 12 34 56 78", "0612345678");
    fireEvent.submit(document.querySelector("form") as HTMLFormElement);
    await screen.findByText("Demande envoyée !");
    expect(mocks.track).toHaveBeenCalledTimes(1);
  });
  for (const status of ["booked", "full", "already_booked", "error"]) {
    it(`driving booking never counts a lead conversion (${status})`, async () => {
      const slot = { id: "slot", starts_at: "2027-01-11T10:00:00Z", duration_minutes: 60, location: "Montrouge", remaining: 1 };
      mocks.invoke.mockResolvedValueOnce({ data: { status: "ok", slots: [slot], bookings: [] } })
        .mockResolvedValueOnce({ data: { status } });
      render(<DrivingPlanner credentials={{ dossierNumber: "TEST", birthDate: "1990-01-01" }} />);
      fireEvent.click(await screen.findByRole("button", { name: /11:00/ }));
      expect(mocks.track).not.toHaveBeenCalled();
      fireEvent.change(screen.getByLabelText(/Téléphone/), { target: { value: "0612345678" } });
      fireEvent.click(screen.getByRole("button", { name: /Réserver ce créneau/ }));
      await waitFor(() => expect(mocks.invoke).toHaveBeenCalledTimes(2));
      await waitFor(() => expect(screen.getByRole("status")).toBeInTheDocument());
      expect(mocks.track).not.toHaveBeenCalled();
    });
  }
  it("a successfully saved blog guide request never counts a lead conversion", async () => {
    mocks.insert.mockReturnValue(insertResult(null));
    render(<MemoryRouter initialEntries={["/blog/test-guide"]}><Routes><Route path="/blog/:slug" element={<BlogArticle />} /></Routes></MemoryRouter>);
    expect(mocks.track).not.toHaveBeenCalled();
    fill("Votre email", "guide-test@example.com");
    const input = screen.getByPlaceholderText("Votre email");
    const form = input.closest("form");
    if (!form) throw new Error("Guide request form missing");
    fireEvent.submit(form);
    await waitFor(() => expect(mocks.invoke).toHaveBeenCalledWith("send-lead-magnet-guide", {
      body: { email: "guide-test@example.com", source: "blog-lead-magnet-test-guide" },
    }));
    expect(mocks.insert).toHaveBeenCalledTimes(1);
    expect(mocks.track).not.toHaveBeenCalled();
    await waitFor(() => expect(mocks.toastSuccess).toHaveBeenCalledWith(expect.stringMatching(/Guide envoyé/)));
  });
  it("a failed guide sending shows an error with the phone number, never « Guide envoyé »", async () => {
    mocks.insert.mockReturnValue(insertResult(null));
    mocks.invoke.mockResolvedValue({ data: null, error: { message: "Edge function returned 500" } });
    render(<MemoryRouter initialEntries={["/blog/test-guide"]}><Routes><Route path="/blog/:slug" element={<BlogArticle />} /></Routes></MemoryRouter>);
    fill("Votre email", "guide-test@example.com");
    const form = screen.getByPlaceholderText("Votre email").closest("form");
    if (!form) throw new Error("Guide request form missing");
    fireEvent.submit(form);
    await waitFor(() => expect(mocks.toastError).toHaveBeenCalledWith(expect.stringMatching(/01 88 75 05 55/)));
    expect(mocks.toastSuccess).not.toHaveBeenCalled();
    expect(screen.getByText(/vous êtes inscrit\(e\) à notre newsletter/)).toBeInTheDocument();
  });
});