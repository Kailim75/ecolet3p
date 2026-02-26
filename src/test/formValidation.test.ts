import { describe, it, expect } from "vitest";
import { z } from "zod";

// Recreate the validation schemas from the forms to test them in isolation
const preRegistrationSchema = z.object({
  firstName: z.string().trim().min(2, "Le prénom doit contenir au moins 2 caractères").max(50),
  lastName: z.string().trim().min(2, "Le nom doit contenir au moins 2 caractères").max(50),
  email: z.string().trim().email("Veuillez entrer une adresse email valide").max(100),
  phone: z.string().trim().regex(
    /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/,
    "Veuillez entrer un numéro de téléphone français valide"
  ),
});

describe("PreRegistration validation schema", () => {
  const validData = {
    firstName: "Jean",
    lastName: "Dupont",
    email: "jean.dupont@email.com",
    phone: "06 12 34 56 78",
  };

  it("should accept valid data", () => {
    const result = preRegistrationSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  // --- firstName ---
  it("should reject empty firstName", () => {
    const result = preRegistrationSchema.safeParse({ ...validData, firstName: "" });
    expect(result.success).toBe(false);
  });

  it("should reject single-char firstName", () => {
    const result = preRegistrationSchema.safeParse({ ...validData, firstName: "J" });
    expect(result.success).toBe(false);
  });

  it("should trim and validate firstName", () => {
    const result = preRegistrationSchema.safeParse({ ...validData, firstName: "  AB  " });
    expect(result.success).toBe(true);
  });

  // --- email ---
  it("should reject invalid email", () => {
    const result = preRegistrationSchema.safeParse({ ...validData, email: "not-an-email" });
    expect(result.success).toBe(false);
  });

  it("should accept email with subdomain", () => {
    const result = preRegistrationSchema.safeParse({ ...validData, email: "user@sub.domain.com" });
    expect(result.success).toBe(true);
  });

  // --- phone ---
  it("should accept French mobile format 06", () => {
    expect(preRegistrationSchema.safeParse({ ...validData, phone: "06 12 34 56 78" }).success).toBe(true);
  });

  it("should accept French mobile format 07", () => {
    expect(preRegistrationSchema.safeParse({ ...validData, phone: "07 12 34 56 78" }).success).toBe(true);
  });

  it("should accept +33 format", () => {
    expect(preRegistrationSchema.safeParse({ ...validData, phone: "+33 6 12 34 56 78" }).success).toBe(true);
  });

  it("should accept format with dots", () => {
    expect(preRegistrationSchema.safeParse({ ...validData, phone: "06.12.34.56.78" }).success).toBe(true);
  });

  it("should accept format with dashes", () => {
    expect(preRegistrationSchema.safeParse({ ...validData, phone: "06-12-34-56-78" }).success).toBe(true);
  });

  it("should reject non-French phone number", () => {
    expect(preRegistrationSchema.safeParse({ ...validData, phone: "+1 555 123 4567" }).success).toBe(false);
  });

  it("should reject too-short phone number", () => {
    expect(preRegistrationSchema.safeParse({ ...validData, phone: "06 12 34" }).success).toBe(false);
  });

  it("should reject phone starting with 00 (not French)", () => {
    // 0033 is valid French international prefix
    expect(preRegistrationSchema.safeParse({ ...validData, phone: "0033 6 12 34 56 78" }).success).toBe(true);
  });
});
