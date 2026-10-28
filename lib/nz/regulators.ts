// ============================================================================
// New Zealand (/nz) — the regulator, defined once and joined into the shared
// regulator lists (REGULATOR_LABEL, REGULATORS, COURT_SERVICE,
// JURISDICTION_NOTE) the same way as the Canadian law societies.
//
// Sources (read 28 Oct 2026):
//  - NZ Law Society Registry lookup: https://www.lawsociety.org.nz/registry-lookup/
//    (shows practising certificate, Barrister & Solicitor / Barrister,
//    employer, admission date)
//  - Complaints: Lawyers Complaints Service, 0800 261 801
//    https://www.lawsociety.org.nz/for-the-public/complaining-about-a-lawyer/
//  - Courts: https://www.justice.govt.nz/contact-us/find-us/
//
// This file must not import from lib/data/static-lawyers.ts (that file
// imports this one).
// ============================================================================

export type NzRegulator = "NZLS";

export const NZ_REGISTER_URL = "https://www.lawsociety.org.nz/registry-lookup/";
export const NZ_REGISTER_LABEL = "New Zealand Law Society's register of lawyers";
export const NZ_COMPLAINTS_URL = "https://www.lawsociety.org.nz/for-the-public/complaining-about-a-lawyer/";

export const NZ_REGULATOR_LABELS: Record<NzRegulator, string> = {
  NZLS: "NZ Law Society",
};

export const NZ_REGULATOR_DETAILS: Record<NzRegulator, { name: string; shortName: string; registerUrl: string; registerLabel: string }> = {
  NZLS: {
    name: "New Zealand Law Society",
    shortName: "NZ Law Society",
    registerUrl: NZ_REGISTER_URL,
    registerLabel: NZ_REGISTER_LABEL,
  },
};

export const NZ_COURT_SERVICES: Record<NzRegulator, { name: string; url: string }> = {
  NZLS: { name: "Ministry of Justice — find a court", url: "https://www.justice.govt.nz/contact-us/find-us/" },
};

export const NZ_JURISDICTION_NOTES: Record<NzRegulator, { title: string; body: string }> = {
  NZLS: {
    title: "New Zealand law",
    body: "Lawyers in New Zealand must hold a practising certificate issued by the New Zealand Law Society. You can check anyone on the Law Society's public register before you hire them, and complaints about lawyers go to its Lawyers Complaints Service.",
  },
};
