import { describe, it, expect } from "vitest";
import { calculateSimulation } from "@/components/simulator/SimulatorLevel1";
import type { SimulationInputs } from "@/components/simulator/SimulatorLevel1";

describe("calculateSimulation", () => {
  const defaultInputs: SimulationInputs = {
    profession: "vtc",
    hoursPerDay: 8,
    daysPerWeek: 5,
    avgFare: 25,
    ridesPerHour: 2,
  };

  it("should return positive monthly revenue", () => {
    const result = calculateSimulation(defaultInputs);
    expect(result.monthlyRevenue).toBeGreaterThan(0);
  });

  it("should compute monthly revenue = hours * days * 4.33 * fare * rides", () => {
    const result = calculateSimulation(defaultInputs);
    const expected = 8 * 5 * 4.33 * 25 * 2;
    expect(result.monthlyRevenue).toBeCloseTo(expected, 0);
  });

  it("should have charges less than revenue", () => {
    const result = calculateSimulation(defaultInputs);
    expect(result.monthlyCharges).toBeLessThan(result.monthlyRevenue);
    expect(result.monthlyCharges).toBeGreaterThan(0);
  });

  it("should compute net = revenue - charges", () => {
    const result = calculateSimulation(defaultInputs);
    expect(result.monthlyNet).toBeCloseTo(result.monthlyRevenue - result.monthlyCharges, 2);
  });

  it("should compute dailyNet = monthlyNet / (daysPerWeek * 4.33)", () => {
    const result = calculateSimulation(defaultInputs);
    const expectedDaily = result.monthlyNet / (5 * 4.33);
    expect(result.dailyNet).toBeCloseTo(expectedDaily, 2);
  });

  it("should apply different charge rates per profession", () => {
    const vtcResult = calculateSimulation({ ...defaultInputs, profession: "vtc" });
    const taxiResult = calculateSimulation({ ...defaultInputs, profession: "taxi" });
    const vmdtrResult = calculateSimulation({ ...defaultInputs, profession: "vmdtr" });

    // Same revenue (same inputs), different charges
    expect(vtcResult.monthlyRevenue).toEqual(taxiResult.monthlyRevenue);
    expect(vtcResult.monthlyCharges).not.toEqual(taxiResult.monthlyCharges);
    expect(vmdtrResult.monthlyCharges).not.toEqual(taxiResult.monthlyCharges);
  });

  it("should scale linearly with hours per day", () => {
    const result8h = calculateSimulation({ ...defaultInputs, hoursPerDay: 8 });
    const result4h = calculateSimulation({ ...defaultInputs, hoursPerDay: 4 });
    expect(result8h.monthlyRevenue).toBeCloseTo(result4h.monthlyRevenue * 2, 0);
  });

  it("should handle minimum inputs without errors", () => {
    const result = calculateSimulation({
      profession: "vmdtr",
      hoursPerDay: 4,
      daysPerWeek: 3,
      avgFare: 10,
      ridesPerHour: 1,
    });
    expect(result.monthlyNet).toBeGreaterThan(0);
    expect(result.dailyNet).toBeGreaterThan(0);
  });
});
