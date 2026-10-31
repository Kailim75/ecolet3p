/**
 * Règles de validation communes aux formulaires de prospects : ce sont celles du formulaire de
 * contact (/contact). Un e-mail sans extension (« nom@exemple ») ou un téléphone de 2 chiffres
 * ne passent pas (audit du 31/10/2026 : le simulateur de revenus les acceptait).
 */
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Numéro français : 0X, +33 X ou 0033 X, puis 8 chiffres, espaces, points ou tirets tolérés. */
export const FRENCH_PHONE_REGEX = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;

export const MESSAGE_EMAIL_INVALIDE = "L'email n'est pas valide";
export const MESSAGE_TELEPHONE_INVALIDE = "Le numéro de téléphone n'est pas valide";

export const isValidEmail = (email: string): boolean => EMAIL_REGEX.test(email.trim());

export const isValidFrenchPhone = (phone: string): boolean =>
  FRENCH_PHONE_REGEX.test(phone.replace(/\s/g, ""));
