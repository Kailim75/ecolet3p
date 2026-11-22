import { describe, it, expect } from "vitest";
import { parseTimes, presetTimesFor } from "@/lib/drivingSlots";

describe("parseTimes", () => {
  it("accepte 9h, 10:30, 14h15 et trie sans doublons", () => {
    expect(parseTimes("14h15, 9h; 10:30 9:00")).toEqual(["09:00", "10:30", "14:15"]);
  });

  it("ignore les heures invalides", () => {
    expect(parseTimes("25:00, 10:75, midi, 8")).toEqual(["08:00"]);
  });
});

describe("presetTimesFor", () => {
  it("propose les créneaux du samedi et du dimanche", () => {
    expect(presetTimesFor("2026-11-28")).toBe("16:00, 18:00");
    expect(presetTimesFor("2026-11-29")).toBe("09:00, 11:00, 14:00, 16:00");
  });

  it("ne propose rien en semaine ou si la date est vide", () => {
    expect(presetTimesFor("2026-12-01")).toBeNull();
    expect(presetTimesFor("")).toBeNull();
  });
});
