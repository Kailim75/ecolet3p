# Google Ads lead conversions
- [x] Require a resolved, explicit FCO session choice; handle load failures and concurrent submissions without duplicate leads.
- [x] Preserve the confirmed FCO dates, split hours, pause, price and notification; verify unconfirmed capacity is absent.
- [x] Run isolated targeted tests and check the preview without submission or publication; report changed files.
- [x] Exclude driving bookings and blog guide requests; retain the six lead forms and validate regression tests (25 passing tests).
- [x] Connect successful public lead requests to the shared conversion helper.
- [x] Keep existing cookie controls unchanged and suppress conversions without marketing acceptance.
- [x] Update advertising disclosure and verify success/error tracking with tests and browser checks (38 passing tests; fictitious Contact request persisted with HTTP 201, one conversion command, Google requests observed; provider attribution unverified).
- [x] Report all modified files and forms.
# CRM lead link (site side)
- [x] Outbox table, insert triggers, lease/complete functions, admin-only access.
- [x] push-crm-leads function (fail-closed, HTTPS allowlist, timeout, backoff, no PII logs), admin panel, quote message column.
- [ ] Activation — blocked: CRM endpoint and shared token not provided yet (see docs/crm-liaison.md).
