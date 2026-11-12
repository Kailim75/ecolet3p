// Whitelisted columns per CRM source table for the admin "Voir la demande" dialog.
// Simulations: contact + profession only, never financial figures.
export const SOURCE_COLUMNS = {
  pre_registrations: "id, created_at, first_name, last_name, email, phone, formation_title, formation_duration, message, session_id, status",
  contact_requests: "id, created_at, full_name, email, phone, formation, message, status",
  appointments: "id, created_at, first_name, last_name, email, formation_choice, appointment_date, appointment_time, notes, status",
  simulations: "id, created_at, first_name, last_name, email, phone, profession, source",
} as const;
export type CrmSourceTable = keyof typeof SOURCE_COLUMNS;
export const isCrmSourceTable = (t: string): t is CrmSourceTable => t in SOURCE_COLUMNS;
