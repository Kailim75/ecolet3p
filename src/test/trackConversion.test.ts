import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { trackLeadConversion } from "@/lib/trackConversion";
import { COOKIE_CONSENT_KEY } from "@/lib/cookieConsent";

describe("Google Ads lead conversion", () => {
  const gtag = vi.fn();
  beforeEach(() => {
    localStorage.clear();
    window.gtag = gtag;
    gtag.mockClear();
  });
  afterEach(() => vi.unstubAllGlobals());
  const consent = (marketing: boolean, analytics = false) =>
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify({ essential: true, marketing, analytics }));

  it("reports one event with the requested account, label, value and currency", () => {
    consent(true);
    trackLeadConversion();
    expect(gtag.mock.calls).toEqual([["event", "conversion", {
      send_to: "AW-18546542995/etILCIrlgq8dEJOT14tF", value: 1.0, currency: "EUR",
    }]]);
  });
  it("does not report when the tag is absent", () => {
    consent(true);
    vi.stubGlobal("gtag", undefined);
    expect(() => trackLeadConversion()).not.toThrow();
    expect(gtag).not.toHaveBeenCalled();
  });
  it("does not report without a saved marketing choice", () => {
    trackLeadConversion();
    expect(gtag).not.toHaveBeenCalled();
  });
  it("analytics acceptance alone never permits advertising conversion", () => {
    consent(false, true);
    trackLeadConversion();
    expect(gtag).not.toHaveBeenCalled();
  });
  it("checks withdrawal even when gtag remains available", () => {
    consent(true);
    trackLeadConversion();
    consent(false);
    trackLeadConversion();
    expect(gtag).toHaveBeenCalledTimes(1);
  });
  it("is safe outside the browser", () => {
    vi.stubGlobal("window", undefined);
    expect(() => trackLeadConversion()).not.toThrow();
    expect(gtag).not.toHaveBeenCalled();
  });
});