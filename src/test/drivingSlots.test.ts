import { describe, it, expect } from "vitest";
import { parseTimes } from "@/lib/drivingSlots";

describe("parseTimes", () => {
  it("accepte 9h, 10:30, 14h15 et trie sans doublons", () => {
    expect(parseTimes("14h15, 9h; 10:30 9:00")).toEqual(["09:00", "10:30", "14:15"]);
  });

  it("ignore les heures invalides", () => {
    expect(parseTimes("25:00, 10:75, midi, 8")).toEqual(["08:00"]);
  });
});
