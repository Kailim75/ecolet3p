# Liaison ecolet3p.fr -> CRM t3pcampus.net (inactive)

Status: code and database ready, nothing is sent. No secret exists yet.

Flow: AFTER INSERT triggers on pre_registrations, contact_requests, appointments, simulations
enqueue a reference in `crm_lead_outbox` (unique source_table+source_id; tests, "NE PAS TRAITER",
cancelled rows and anonymous simulations are skipped). `push-crm-leads` claims a leased batch
(`crm_claim_leads`), re-reads the source row server-side, re-checks cancel/test, POSTs the exact
contract with header `x-website-token`, and finishes via `crm_complete_lead` (lease-token checked).
Non-2xx/unknown answers retry with exponential backoff (1 min .. 6 h, 8 attempts, then "failed").
Expired leases are reclaimed (crash recovery). Admins see/requeue rows in Admin > CRM.

## Activation steps (to do later, in this order)
1. Add secrets `CRM_LEADS_ENDPOINT` (https URL ending in /receive-website-lead, host t3pcampus.net,
   *.t3pcampus.net or a project *.supabase.co) and `CRM_LEADS_TOKEN` (same value as the CRM side).
2. Test: Admin > CRM > "Envoyer maintenant" (admin JWT). Without step 1 the function answers 503.
3. Scheduling: add secret `CRM_PUSH_CRON_TOKEN` (>= 32 chars), then create a pg_cron job every
   5 minutes POSTing to push-crm-leads with header `x-cron-token`, using the managed cron
   helper (repair with rebind_secrets credential "cron_auth" first). Not created on purpose.
4. Historical leads are NOT enqueued; a backfill would be a separate, explicit decision.
