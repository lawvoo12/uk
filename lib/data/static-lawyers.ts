// ============================================================================
// EDIT THIS FILE to add, remove, or change the solicitors shown on the site.
// This is the only source of solicitor data — no database involved.
//
// After editing, just save and refresh (dev server) or redeploy (production).
//
// citySlug must match a slug in lib/seo/uk-cities.ts
// practiceAreaSlugs must be from: immigration, family, personal-injury,
// employment, property, wills-probate
//
// Data checked 27 Sep 2026: every England & Wales firm's SRA number was
// checked against the SRA Solicitors Register (registerUrl). sraNumber is the
// FIRM's number, not the individual solicitor's. Scottish firms are regulated
// by the Law Society of Scotland and Northern Irish firms by the Law Society
// of Northern Ireland — they are not SRA-regulated (Thorntons and Aberdein
// Considine also hold an SRA registration for their English-law arm).
// Re-check registerUrl before relying on an entry: people move firms.
//
// These firms have NOT (yet) consented to being listed. Get their OK, or at
// least offer a clear removal route, before promoting the pages.
// ============================================================================

export type Regulator = "SRA" | "LSS" | "LSNI";

export const REGULATOR_LABEL: Record<Regulator, string> = {
  SRA: "SRA regulated",
  LSS: "Law Society of Scotland",
  LSNI: "Law Society of NI",
};

export interface StaticLawyer {
  id: string; // used in the URL /uk/lawyer/[id] — short, unique, URL-safe
  firmName: string;
  lawyerName: string;
  role: string; // e.g. "Partner, Family"
  regulator: Regulator;
  sraNumber: string | null; // firm SRA number; null for firms with no SRA registration
  registerUrl: string; // where a visitor can check the firm on its regulator's register
  citySlug: string;
  practiceAreaSlugs: string[];
  // The solicitor's own specialism. "Request a callback" pre-selects it so the
  // visitor skips the practice-area step. Must be one of practiceAreaSlugs.
  primaryPracticeArea: string;
  bio: string;
  addressLine1: string;
  yearsExperience: number | null; // null = not published
  experienceNote: string; // the basis for the figure, shown as-is
  profileUrl: string; // public source for the solicitor's details
  // Only fill these in with real, verifiable reviews — never invent them.
  ratingAverage?: number; // 0-5
  ratingCount?: number;
}

export const STATIC_LAWYERS: StaticLawyer[] = [
  {
    "id": "london-claire-filer",
    "firmName": "Irwin Mitchell LLP",
    "lawyerName": "Claire Filer",
    "role": "Partner, Family",
    "regulator": "SRA",
    "sraNumber": "570654",
    "registerUrl": "https://www.sra.org.uk/consumers/register/organisation/?sraNumber=570654",
    "citySlug": "london",
    "practiceAreaSlugs": [
      "immigration",
      "family",
      "personal-injury",
      "employment",
      "property",
      "wills-probate"
    ],
    "primaryPracticeArea": "family",
    "bio": "Family law partner handling complex financial remedies and children matters, including high-net-worth cases with international assets and pre-nups.",
    "addressLine1": "The Northcliffe, 26-28 Tudor Street, London EC4Y 0AY",
    "yearsExperience": 22,
    "experienceNote": "22 (qualified 2004)",
    "profileUrl": "https://www.irwinmitchell.com/our-people/claire-filer"
  },
  {
    "id": "birmingham-hilary-wetherell",
    "firmName": "Irwin Mitchell LLP",
    "lawyerName": "Hilary Wetherell",
    "role": "Partner, Regional Head of Serious Injury",
    "regulator": "SRA",
    "sraNumber": "570654",
    "registerUrl": "https://www.sra.org.uk/consumers/register/organisation/?sraNumber=570654",
    "citySlug": "birmingham",
    "practiceAreaSlugs": [
      "immigration",
      "family",
      "personal-injury",
      "employment",
      "property",
      "wills-probate"
    ],
    "primaryPracticeArea": "personal-injury",
    "bio": "Leads the West Midlands serious injury team, specialising in brain injury and fatal accident claims with multiple seven-figure settlements.",
    "addressLine1": "9th Floor, The Colmore Building, 20 Colmore Circus, Birmingham B4 6AH",
    "yearsExperience": 26,
    "experienceNote": "26+ (joined firm 2000; partner 2011)",
    "profileUrl": "https://www.irwinmitchell.com/our-people/hilary-wetherell"
  },
  {
    "id": "manchester-matthew-garson",
    "firmName": "Irwin Mitchell LLP",
    "lawyerName": "Matthew Garson",
    "role": "Partner, Serious Injury",
    "regulator": "SRA",
    "sraNumber": "570654",
    "registerUrl": "https://www.sra.org.uk/consumers/register/organisation/?sraNumber=570654",
    "citySlug": "manchester",
    "practiceAreaSlugs": [
      "immigration",
      "family",
      "personal-injury",
      "employment",
      "property",
      "wills-probate"
    ],
    "primaryPracticeArea": "personal-injury",
    "bio": "APIL Senior Litigator and accredited brain injury & fatal accident specialist handling head, spinal and complex orthopaedic injury claims.",
    "addressLine1": "One St Peter's Square, Manchester M2 3AF",
    "yearsExperience": 25,
    "experienceNote": "25 (acting for injured clients since 2001)",
    "profileUrl": "https://www.irwinmitchell.com/our-people/matthew-garson"
  },
  {
    "id": "leeds-arif-khalfe",
    "firmName": "Ison Harrison Limited",
    "lawyerName": "Arif Khalfe",
    "role": "Partner, Business Immigration",
    "regulator": "SRA",
    "sraNumber": "484936",
    "registerUrl": "https://www.sra.org.uk/consumers/register/organisation/?sraNumber=484936",
    "citySlug": "leeds",
    "practiceAreaSlugs": [
      "immigration",
      "family",
      "personal-injury",
      "employment",
      "property",
      "wills-probate"
    ],
    "primaryPracticeArea": "immigration",
    "bio": "Partner in the business immigration team at Ison Harrison's Leeds head office, advising employers on sponsorship and corporate immigration.",
    "addressLine1": "Duke House, 54 Wellington Street, Leeds LS1 2EE",
    "yearsExperience": null,
    "experienceNote": "Not published",
    "profileUrl": "https://www.isonharrison.co.uk/our-people/arif-khalfe/"
  },
  {
    "id": "glasgow-heather-calderwood",
    "firmName": "Harper Macleod LLP",
    "lawyerName": "Heather Calderwood",
    "role": "Partner, Solicitor-Advocate",
    "regulator": "LSS",
    "sraNumber": null,
    "registerUrl": "https://www.lawscot.org.uk/find-a-solicitor/",
    "citySlug": "glasgow",
    "practiceAreaSlugs": [
      "family",
      "personal-injury",
      "employment",
      "property",
      "wills-probate"
    ],
    "primaryPracticeArea": "personal-injury",
    "bio": "Solicitor-advocate handling high-value personal injury, fatal and clinical negligence litigation in the Scottish courts.",
    "addressLine1": "The Ca'd'oro, 45 Gordon Street, Glasgow G1 3PE",
    "yearsExperience": 19,
    "experienceNote": "19 (qualified 2007)",
    "profileUrl": "https://www.harpermacleod.co.uk/people/detail/heather-calderwood"
  },
  {
    "id": "sheffield-james-henshall",
    "firmName": "Irwin Mitchell LLP",
    "lawyerName": "James Henshall",
    "role": "Senior Associate Solicitor, Family",
    "regulator": "SRA",
    "sraNumber": "570654",
    "registerUrl": "https://www.sra.org.uk/consumers/register/organisation/?sraNumber=570654",
    "citySlug": "sheffield",
    "practiceAreaSlugs": [
      "immigration",
      "family",
      "personal-injury",
      "employment",
      "property",
      "wills-probate"
    ],
    "primaryPracticeArea": "family",
    "bio": "Sheffield family solicitor advising on divorce, child arrangements, pre/post-nuptial agreements and surrogacy law.",
    "addressLine1": "Riverside East, 2 Millsands, Sheffield S3 8DT (head office)",
    "yearsExperience": 10,
    "experienceNote": "10 (qualified 2016)",
    "profileUrl": "https://www.irwinmitchell.com/our-people/james-henshall"
  },
  {
    "id": "bradford-kanika-sohpal",
    "firmName": "Schofield Sweeney LLP",
    "lawyerName": "Kanika Sohpal",
    "role": "Partner, Private Wealth & Succession",
    "regulator": "SRA",
    "sraNumber": "371175",
    "registerUrl": "https://www.sra.org.uk/consumers/register/organisation/?sraNumber=371175",
    "citySlug": "bradford",
    "practiceAreaSlugs": [
      "employment",
      "property",
      "wills-probate"
    ],
    "primaryPracticeArea": "wills-probate",
    "bio": "STEP member advising high-net-worth families and business owners on succession planning, trusts and estate administration; Chambers-ranked.",
    "addressLine1": "Church Bank House, Church Bank, Bradford BD1 4DY",
    "yearsExperience": 20,
    "experienceNote": "20+",
    "profileUrl": "https://chambers.com/lawyer/kanika-sohpal-high-net-worth-21:27198623"
  },
  {
    "id": "edinburgh-elaine-motion",
    "firmName": "Balfour+Manson LLP",
    "lawyerName": "Elaine Motion",
    "role": "Partner & Chair, Solicitor-Advocate",
    "regulator": "LSS",
    "sraNumber": null,
    "registerUrl": "https://www.lawscot.org.uk/find-a-solicitor/",
    "citySlug": "edinburgh",
    "practiceAreaSlugs": [
      "family",
      "personal-injury",
      "employment",
      "property",
      "wills-probate"
    ],
    "primaryPracticeArea": "personal-injury",
    "bio": "Civil solicitor-advocate leading the medical negligence team, with personal injury, public law and five House of Lords appearances.",
    "addressLine1": "56-66 Frederick Street, Edinburgh EH2 1LS",
    "yearsExperience": 40,
    "experienceNote": "40 (qualified 1986)",
    "profileUrl": "https://www.legal500.com/firms/207-balfourmanson-llp/4539-edinburgh-scotland/lawyers/506046-elaine-j-motion/"
  },
  {
    "id": "liverpool-carol-mason",
    "firmName": "Morecrofts LLP",
    "lawyerName": "Carol Mason",
    "role": "Partner, Private Client",
    "regulator": "SRA",
    "sraNumber": "484828",
    "registerUrl": "https://www.sra.org.uk/consumers/register/organisation/?sraNumber=484828",
    "citySlug": "liverpool",
    "practiceAreaSlugs": [
      "family",
      "personal-injury",
      "employment",
      "property",
      "wills-probate"
    ],
    "primaryPracticeArea": "wills-probate",
    "bio": "Private client specialist advising on wills, probate, trusts and inheritance tax planning for high-net-worth individuals and business owners.",
    "addressLine1": "7 Church Road, Woolton, Liverpool L25 5JE",
    "yearsExperience": 42,
    "experienceNote": "42 (qualified 1984)",
    "profileUrl": "https://www.morecrofts.co.uk/profile/carol-mason/"
  },
  {
    "id": "bristol-clare-cox",
    "firmName": "Barcan+Kirby LLP",
    "lawyerName": "Clare Cox",
    "role": "Legal Director, Head of Care Team",
    "regulator": "SRA",
    "sraNumber": "568743",
    "registerUrl": "https://www.sra.org.uk/consumers/register/organisation/?sraNumber=568743",
    "citySlug": "bristol",
    "practiceAreaSlugs": [
      "family",
      "personal-injury",
      "employment",
      "property",
      "wills-probate"
    ],
    "primaryPracticeArea": "family",
    "bio": "Law Society Children Panel member representing children and parents in care proceedings and complex private children disputes; Legal 500 Key Lawyer.",
    "addressLine1": "Second Floor Prince House, 43-51 Prince Street, Bristol BS1 4PS",
    "yearsExperience": 19,
    "experienceNote": "19 (qualified 2007)",
    "profileUrl": "https://barcankirby.co.uk/clare-cox/"
  },
  {
    "id": "cardiff-cari-sowden-taylor",
    "firmName": "Hugh James",
    "lawyerName": "Cari Sowden-Taylor",
    "role": "Partner, Joint Head of Serious Injury",
    "regulator": "SRA",
    "sraNumber": "303202",
    "registerUrl": "https://www.sra.org.uk/consumers/register/organisation/?sraNumber=303202",
    "citySlug": "cardiff",
    "practiceAreaSlugs": [
      "family",
      "personal-injury",
      "employment",
      "property",
      "wills-probate"
    ],
    "primaryPracticeArea": "personal-injury",
    "bio": "Represents adults and children with life-changing brain and spinal injuries; Chambers Band 1 and Legal 500 Leading Individual.",
    "addressLine1": "Two Central Square, Central Square, Cardiff CF10 1FS",
    "yearsExperience": 18,
    "experienceNote": "18 (qualified 2008; partner 2016)",
    "profileUrl": "https://www.hughjames.com/people/cari-sowden-taylor/"
  },
  {
    "id": "belfast-niall-o-hare",
    "firmName": "O'Hare Solicitors",
    "lawyerName": "Niall O'Hare",
    "role": "Partner",
    "regulator": "LSNI",
    "sraNumber": null,
    "registerUrl": "https://lawsoc-ni.org/using-a-solicitor",
    "citySlug": "belfast",
    "practiceAreaSlugs": [
      "family",
      "personal-injury",
      "employment",
      "property",
      "wills-probate"
    ],
    "primaryPracticeArea": "family",
    "bio": "Litigation partner covering personal injury, medical negligence and high-value divorce and financial settlements.",
    "addressLine1": "St George's Buildings, 37-41 High Street, Belfast BT1 2AB",
    "yearsExperience": 16,
    "experienceNote": "16 (qualified 2010; partner 2017)",
    "profileUrl": "https://www.oharesolicitors.com/meet-the-team/niall-ohare/"
  },
  {
    "id": "leicester-lewis-addison",
    "firmName": "Nelsons Solicitors Limited",
    "lawyerName": "Lewis Addison",
    "role": "Partner, Contentious Trusts & Probate",
    "regulator": "SRA",
    "sraNumber": "536939",
    "registerUrl": "https://www.sra.org.uk/consumers/register/organisation/?sraNumber=536939",
    "citySlug": "leicester",
    "practiceAreaSlugs": [
      "family",
      "personal-injury",
      "employment",
      "property",
      "wills-probate"
    ],
    "primaryPracticeArea": "wills-probate",
    "bio": "ACTAPS-accredited dispute resolution partner handling inheritance claims, will disputes and property disputes.",
    "addressLine1": "Provincial House, 37 New Walk, Leicester LE1 6TU",
    "yearsExperience": 20,
    "experienceNote": "20 (qualified 2006)",
    "profileUrl": "https://www.nelsonslaw.co.uk/press-releases/lewis-addison-leicester-partner/"
  },
  {
    "id": "wakefield-paul-campbell",
    "firmName": "Chadwick Lawrence LLP",
    "lawyerName": "Paul Campbell",
    "role": "Partner, Employment",
    "regulator": "SRA",
    "sraNumber": "424887",
    "registerUrl": "https://www.sra.org.uk/consumers/register/organisation/?sraNumber=424887",
    "citySlug": "wakefield",
    "practiceAreaSlugs": [
      "family",
      "personal-injury",
      "employment",
      "property",
      "wills-probate"
    ],
    "primaryPracticeArea": "employment",
    "bio": "Senior employment lawyer handling senior executive contracts, high-value claims and commercial agency matters for businesses and individuals.",
    "addressLine1": "Paragon Point, Paragon Business Village, Wakefield WF1 2DF",
    "yearsExperience": 40,
    "experienceNote": "40+ (with the firm)",
    "profileUrl": "https://www.chadwicklawrence.co.uk/your-team/paul-campbell/"
  },
  {
    "id": "coventry-richard-stanford",
    "firmName": "Brindley Twist Tafft & James LLP",
    "lawyerName": "Richard Stanford",
    "role": "Partner, Head of Medical Negligence",
    "regulator": "SRA",
    "sraNumber": "557410",
    "registerUrl": "https://www.sra.org.uk/consumers/register/organisation/?sraNumber=557410",
    "citySlug": "coventry",
    "practiceAreaSlugs": [
      "family",
      "personal-injury",
      "employment",
      "property",
      "wills-probate"
    ],
    "primaryPracticeArea": "personal-injury",
    "bio": "AvMA panel clinical negligence specialist running orthopaedic, oncology and urology claims through to trial.",
    "addressLine1": "Lowick Gate, Siskin Drive, Coventry CV3 4FJ",
    "yearsExperience": 16,
    "experienceNote": "16 (in the department since 2010; partner 2021)",
    "profileUrl": "https://www.bttj.com/team-member/richard-stanford/"
  },
  {
    "id": "nottingham-kirsten-wood",
    "firmName": "Rothera Bray LLP",
    "lawyerName": "Kirsten Wood",
    "role": "Partner, Head of Wills & Probate",
    "regulator": "SRA",
    "sraNumber": "8000973",
    "registerUrl": "https://www.sra.org.uk/solicitors/firm-based-authorisation/abs-register/8000973/",
    "citySlug": "nottingham",
    "practiceAreaSlugs": [
      "family",
      "personal-injury",
      "employment",
      "property",
      "wills-probate"
    ],
    "primaryPracticeArea": "wills-probate",
    "bio": "STEP-accredited head of wills and probate, advising on wills, trusts, estate administration and LPAs; Notts Law Society Partner of the Year 2025.",
    "addressLine1": "2 Kayes Walk, The Lace Market, Nottingham NG1 1PZ",
    "yearsExperience": 21,
    "experienceNote": "21 (qualified 2005)",
    "profileUrl": "https://rotherabray.co.uk/team/kirsten-wood/"
  },
  {
    "id": "newcastle-upon-tyne-phil-davison",
    "firmName": "Sintons LLP",
    "lawyerName": "Phil Davison",
    "role": "Partner, Head of General Personal Injury",
    "regulator": "SRA",
    "sraNumber": "8004106",
    "registerUrl": "https://www.sra.org.uk/solicitors/firm-based-authorisation/abs-register/8004106/",
    "citySlug": "newcastle-upon-tyne",
    "practiceAreaSlugs": [
      "family",
      "personal-injury",
      "employment",
      "property",
      "wills-probate"
    ],
    "primaryPracticeArea": "personal-injury",
    "bio": "Leads Sintons' personal injury department on serious workplace and road accident claims; inducted into the Legal 500 Hall of Fame (2026).",
    "addressLine1": "The Cube, Barrack Road, Newcastle upon Tyne NE4 6DB",
    "yearsExperience": 20,
    "experienceNote": "20+ (\"decades\" per firm)",
    "profileUrl": "https://sintons.co.uk/our-people/phil-davison/"
  },
  {
    "id": "sunderland-rebecca-cresswell",
    "firmName": "Sweeney Miller LLP",
    "lawyerName": "Rebecca Cresswell",
    "role": "Partner, Head of Family",
    "regulator": "SRA",
    "sraNumber": "569467",
    "registerUrl": "https://www.sra.org.uk/consumers/register/organisation/?sraNumber=569467",
    "citySlug": "sunderland",
    "practiceAreaSlugs": [
      "family",
      "personal-injury",
      "property",
      "wills-probate"
    ],
    "primaryPracticeArea": "family",
    "bio": "Heads the family department, advising on divorce, separation, financial settlements and child arrangements.",
    "addressLine1": "Sweeney Miller House, Riverbank Road, Sunderland SR5 3JJ",
    "yearsExperience": 9,
    "experienceNote": "9 (CILEx 2017; solicitor & partner 2023)",
    "profileUrl": "https://www.sweeneymiller.co.uk/team/rebecca-cresswell/"
  },
  {
    "id": "brighton-and-hove-joanna-potbury",
    "firmName": "DMH Stallard LLP",
    "lawyerName": "Joanna Potbury",
    "role": "Partner, Family",
    "regulator": "SRA",
    "sraNumber": "490576",
    "registerUrl": "https://www.sra.org.uk/consumers/register/organisation/?sraNumber=490576",
    "citySlug": "brighton-and-hove",
    "practiceAreaSlugs": [
      "immigration",
      "family",
      "personal-injury",
      "employment",
      "property",
      "wills-probate"
    ],
    "primaryPracticeArea": "family",
    "bio": "Family partner handling complex high-net-worth divorces involving trusts, businesses and overseas assets, plus pre-nups and cohabitation agreements.",
    "addressLine1": "The Portland Building, 27-28 Church Street, Brighton BN1 1RB",
    "yearsExperience": null,
    "experienceNote": "Not published",
    "profileUrl": "https://www.legal500.com/firms/932-dmh-stallard-llp/r-england/lawyers/1256987-joanna-potbury"
  },
  {
    "id": "hull-sarah-clubley",
    "firmName": "Williamsons Solicitors Limited",
    "lawyerName": "Sarah Clubley",
    "role": "Director, Senior Solicitor, Family",
    "regulator": "SRA",
    "sraNumber": "522081",
    "registerUrl": "https://www.sra.org.uk/consumers/register/organisation/?sraNumber=522081",
    "citySlug": "hull",
    "practiceAreaSlugs": [
      "family",
      "personal-injury",
      "property",
      "wills-probate"
    ],
    "primaryPracticeArea": "family",
    "bio": "Senior family solicitor at the Hull head office specialising in high-value family and divorce matters; mentioned in the Legal 500.",
    "addressLine1": "45 Lowgate, Hull HU1 1EN",
    "yearsExperience": 35,
    "experienceNote": "35 (qualified 1991)",
    "profileUrl": "https://www.williamsons-solicitors.co.uk/family-childcare/"
  },
  {
    "id": "plymouth-gemma-smith",
    "firmName": "Wolferstans LLP",
    "lawyerName": "Gemma Smith",
    "role": "Partner, Head of Wills & Probate",
    "regulator": "SRA",
    "sraNumber": "811913",
    "registerUrl": "https://www.sra.org.uk/consumers/register/organisation/?sraNumber=811913",
    "citySlug": "plymouth",
    "practiceAreaSlugs": [
      "family",
      "personal-injury",
      "employment",
      "property",
      "wills-probate"
    ],
    "primaryPracticeArea": "wills-probate",
    "bio": "Leads the wills, probate and trusts department, handling estate administration, LPAs and high-net-worth estates with international elements.",
    "addressLine1": "60-66 North Hill, Plymouth PL4 8EP",
    "yearsExperience": 18,
    "experienceNote": "18 (qualified 2008)",
    "profileUrl": "https://wolferstans.com/about/people/gemma-smith/"
  },
  {
    "id": "stoke-on-trent-sarah-jones",
    "firmName": "Beswicks Solicitors LLP",
    "lawyerName": "Sarah Jones",
    "role": "Partner, Head of Family Law",
    "regulator": "SRA",
    "sraNumber": "533645",
    "registerUrl": "https://www.sra.org.uk/consumers/register/organisation/?sraNumber=533645",
    "citySlug": "stoke-on-trent",
    "practiceAreaSlugs": [
      "family",
      "personal-injury",
      "employment",
      "property",
      "wills-probate"
    ],
    "primaryPracticeArea": "family",
    "bio": "Resolution-accredited family lawyer advising on divorce, financial settlements, children matters and pre/post-nuptial agreements.",
    "addressLine1": "West Court, Campbell Road, Stoke-on-Trent ST4 4FB",
    "yearsExperience": 14,
    "experienceNote": "14+ (in family law)",
    "profileUrl": "https://www.beswicks.com/our-team/sarah-jones-family-solicitor/"
  },
  {
    "id": "wolverhampton-susan-todhunter",
    "firmName": "FBC Manby Bowdler (Midlands) Limited",
    "lawyerName": "Susan Todhunter",
    "role": "Partner, Head of Serious Injury",
    "regulator": "SRA",
    "sraNumber": "8008738",
    "registerUrl": "https://www.sra.org.uk/consumers/register/organisation/?sraNumber=8008738",
    "citySlug": "wolverhampton",
    "practiceAreaSlugs": [
      "family",
      "personal-injury",
      "employment",
      "property",
      "wills-probate"
    ],
    "primaryPracticeArea": "personal-injury",
    "bio": "Catastrophic and brain injury specialist with multiple multi-million-pound settlements; Legal 500 Leading Partner 2026.",
    "addressLine1": "6-10 George Street, Snow Hill, Wolverhampton WV2 4DN",
    "yearsExperience": 35,
    "experienceNote": "35 (qualified 1991)",
    "profileUrl": "https://www.fbcmb.co.uk/lawyers/susan-todhunter/"
  },
  {
    "id": "derby-melanie-bridgen",
    "firmName": "Nelsons Solicitors Limited",
    "lawyerName": "Melanie Bridgen",
    "role": "Partner, Family",
    "regulator": "SRA",
    "sraNumber": "536939",
    "registerUrl": "https://www.sra.org.uk/consumers/register/organisation/?sraNumber=536939",
    "citySlug": "derby",
    "practiceAreaSlugs": [
      "family",
      "personal-injury",
      "employment",
      "property",
      "wills-probate"
    ],
    "primaryPracticeArea": "family",
    "bio": "Family partner handling high-net-worth divorce, international relocation and child abduction, and care proceedings.",
    "addressLine1": "Sterne House, Lodge Lane, Derby DE1 3WD",
    "yearsExperience": null,
    "experienceNote": "Not published (partner since 2023)",
    "profileUrl": "https://www.reviewsolicitors.co.uk/94689983/melanie-jane-bridgen"
  },
  {
    "id": "swansea-matthew-owen",
    "firmName": "JCP Solicitors Limited",
    "lawyerName": "Matthew Owen",
    "role": "Director, Head of Catastrophic Injury",
    "regulator": "SRA",
    "sraNumber": "620755",
    "registerUrl": "https://www.sra.org.uk/consumers/register/organisation/?sraNumber=620755",
    "citySlug": "swansea",
    "practiceAreaSlugs": [
      "family",
      "personal-injury",
      "employment",
      "property",
      "wills-probate"
    ],
    "primaryPracticeArea": "personal-injury",
    "bio": "Law Society Clinical Negligence Panel member handling birth, brain and spinal injury claims; Chambers Band 1.",
    "addressLine1": "Venture Court, Waterside Business Park, Valley Way, Enterprise Park, Swansea SA6 8AH",
    "yearsExperience": 25,
    "experienceNote": "~25 (in clinical negligence)",
    "profileUrl": "https://www.jcpsolicitors.co.uk/site/people/profile/matthew.owen"
  },
  {
    "id": "southampton-claire-merritt",
    "firmName": "Paris Smith LLP",
    "lawyerName": "Claire Merritt",
    "role": "Partner, Employment & Education",
    "regulator": "SRA",
    "sraNumber": "408233",
    "registerUrl": "https://www.sra.org.uk/consumers/register/organisation/?sraNumber=408233",
    "citySlug": "southampton",
    "practiceAreaSlugs": [
      "immigration",
      "family",
      "personal-injury",
      "employment",
      "property",
      "wills-probate"
    ],
    "primaryPracticeArea": "employment",
    "bio": "Employment partner advising employers and individuals on contracts, tribunal claims, redundancy, discrimination and TUPE, with an education-sector focus.",
    "addressLine1": "1 London Road, Southampton SO15 2AE",
    "yearsExperience": 14,
    "experienceNote": "14",
    "profileUrl": "https://parissmith.co.uk/staff/claire-merritt-partner/"
  },
  {
    "id": "salford-david-connor",
    "firmName": "WHN Solicitors Limited",
    "lawyerName": "David Connor",
    "role": "Director, Head of Family",
    "regulator": "SRA",
    "sraNumber": "646807",
    "registerUrl": "https://www.sra.org.uk/consumers/register/organisation/?sraNumber=646807",
    "citySlug": "salford",
    "practiceAreaSlugs": [
      "family",
      "personal-injury",
      "employment",
      "property",
      "wills-probate"
    ],
    "primaryPracticeArea": "family",
    "bio": "Leads WHN's family and legal aid work, handling complex financial and children cases and pre-nuptial agreements.",
    "addressLine1": "Centenary House, 1 Centenary Way, Salford M50 1RF",
    "yearsExperience": 36,
    "experienceNote": "36 (qualified 1990)",
    "profileUrl": "https://www.whnsolicitors.co.uk/people/david-connor/"
  },
  {
    "id": "aberdeen-ruth-aberdein",
    "firmName": "Aberdein Considine LLP",
    "lawyerName": "Ruth Aberdein",
    "role": "Partner-in-Charge, Family Law",
    "regulator": "LSS",
    "sraNumber": "8011453",
    "registerUrl": "https://www.lawscot.org.uk/find-a-solicitor/",
    "citySlug": "aberdeen",
    "practiceAreaSlugs": [
      "family",
      "employment",
      "property",
      "wills-probate"
    ],
    "primaryPracticeArea": "family",
    "bio": "Law Society of Scotland accredited family law specialist and mediator, known for high-net-worth cases involving business interests.",
    "addressLine1": "1st Floor, Blenheim House, Fountainhall Road, Aberdeen AB15 4DT",
    "yearsExperience": 22,
    "experienceNote": "22+ (partner since 2004)",
    "profileUrl": "https://www.legal500.com/firms/29-aberdein-considine/c-scotland/lawyers/489621-ruth-aberdein"
  },
  {
    "id": "westminster-tracy-evlogidis",
    "firmName": "Forsters LLP",
    "lawyerName": "Tracy Evlogidis",
    "role": "Partner, Head of Immigration",
    "regulator": "SRA",
    "sraNumber": "400249",
    "registerUrl": "https://www.sra.org.uk/consumers/register/organisation/?sraNumber=400249",
    "citySlug": "westminster",
    "practiceAreaSlugs": [
      "immigration",
      "family",
      "employment",
      "property",
      "wills-probate"
    ],
    "primaryPracticeArea": "immigration",
    "bio": "Legal 500 Hall of Fame immigration lawyer advising businesses and HNW individuals on visas, settlement, citizenship and sponsor licences.",
    "addressLine1": "22 Baker Street, London W1U 3BW",
    "yearsExperience": 25,
    "experienceNote": "25+",
    "profileUrl": "https://www.forsters.co.uk/our-people/tracy-evlogidis"
  },
  {
    "id": "portsmouth-stephanie-bellchambers",
    "firmName": "Biscoes Legal Services Limited",
    "lawyerName": "Stephanie Bellchambers",
    "role": "Director, Head of Family",
    "regulator": "SRA",
    "sraNumber": "644797",
    "registerUrl": "https://www.sra.org.uk/consumers/register/organisation/?sraNumber=644797",
    "citySlug": "portsmouth",
    "practiceAreaSlugs": [
      "immigration",
      "family",
      "personal-injury",
      "employment",
      "property",
      "wills-probate"
    ],
    "primaryPracticeArea": "family",
    "bio": "Heads the family department, covering divorce, financial remedies, children, surrogacy and military family matters.",
    "addressLine1": "Lake House, 2 Port Way, Port Solent, Portsmouth PO6 4TY",
    "yearsExperience": 10,
    "experienceNote": "10+ (in family law)",
    "profileUrl": "https://www.reviewsolicitors.co.uk/93517587/stephanie-bellchambers"
  },
  {
    "id": "york-ed-ryder",
    "firmName": "Harrowells Limited",
    "lawyerName": "Ed Ryder",
    "role": "Director, Head of Private Client",
    "regulator": "SRA",
    "sraNumber": "615304",
    "registerUrl": "https://www.sra.org.uk/consumers/register/organisation/?sraNumber=615304",
    "citySlug": "york",
    "practiceAreaSlugs": [
      "family",
      "personal-injury",
      "employment",
      "property",
      "wills-probate"
    ],
    "primaryPracticeArea": "wills-probate",
    "bio": "Advises high-net-worth, business-owning and farming clients on inheritance tax, succession planning, trusts, wills and probate.",
    "addressLine1": "1 St Saviourgate, York YO1 8ZQ",
    "yearsExperience": 20,
    "experienceNote": "20+",
    "profileUrl": "https://www.harrowells.co.uk/site/people/profile/ed.ryder"
  },
  {
    "id": "peterborough-chris-brown",
    "firmName": "Hegarty LLP",
    "lawyerName": "Chris Brown",
    "role": "Partner, Head of Family",
    "regulator": "SRA",
    "sraNumber": "440601",
    "registerUrl": "https://www.sra.org.uk/consumers/register/organisation/?sraNumber=440601",
    "citySlug": "peterborough",
    "practiceAreaSlugs": [
      "family",
      "employment",
      "property",
      "wills-probate"
    ],
    "primaryPracticeArea": "family",
    "bio": "Resolution-accredited specialist in complex financial remedies and a collaborative family lawyer.",
    "addressLine1": "48 Broadway, Peterborough PE1 1YW",
    "yearsExperience": 17,
    "experienceNote": "17 (qualified 2009)",
    "profileUrl": "https://hegarty.co.uk/people/chris-brown"
  },
  {
    "id": "dundee-lynne-sturrock",
    "firmName": "Thorntons Law LLP",
    "lawyerName": "Lynne Sturrock",
    "role": "Associate, Family Law",
    "regulator": "LSS",
    "sraNumber": "831290",
    "registerUrl": "https://www.lawscot.org.uk/find-a-solicitor/",
    "citySlug": "dundee",
    "practiceAreaSlugs": [
      "family",
      "personal-injury",
      "employment",
      "property",
      "wills-probate"
    ],
    "primaryPracticeArea": "family",
    "bio": "Law Society of Scotland accredited specialist in family law and family mediation, and a former court-appointed Child Welfare Reporter.",
    "addressLine1": "Whitehall House, 33 Yeaman Shore, Dundee DD1 4BJ",
    "yearsExperience": null,
    "experienceNote": "Not published",
    "profileUrl": "https://www.thorntons-law.co.uk/our-people/lynne-sturrock"
  },
  {
    "id": "lancaster-rebecca-patience",
    "firmName": "Harrison Drury & Co Ltd",
    "lawyerName": "Rebecca Patience",
    "role": "Partner, Family",
    "regulator": "SRA",
    "sraNumber": "534326",
    "registerUrl": "https://www.sra.org.uk/consumers/register/organisation/?sraNumber=534326",
    "citySlug": "lancaster",
    "practiceAreaSlugs": [
      "family",
      "employment",
      "property",
      "wills-probate"
    ],
    "primaryPracticeArea": "family",
    "bio": "Family partner advising on divorce, matrimonial finances and child arrangements; Resolution member and Legal 500 Key Lawyer.",
    "addressLine1": "76 Church Street, Lancaster LA1 1ET",
    "yearsExperience": 9,
    "experienceNote": "9 (qualified 2017)",
    "profileUrl": "https://www.harrison-drury.com/our-people/rebecca-patience/"
  },
  {
    "id": "oxford-james-davies",
    "firmName": "Blake Morgan LLP",
    "lawyerName": "James Davies",
    "role": "Partner, Head of Family",
    "regulator": "SRA",
    "sraNumber": "613715",
    "registerUrl": "https://www.sra.org.uk/consumers/register/organisation/?sraNumber=613715",
    "citySlug": "oxford",
    "practiceAreaSlugs": [
      "family",
      "personal-injury",
      "employment",
      "property",
      "wills-probate"
    ],
    "primaryPracticeArea": "family",
    "bio": "Resolution-accredited family lawyer focusing on complex, high-value divorce, cohabitation disputes and cross-border cases; Legal 500 leading partner.",
    "addressLine1": "Seacourt Tower, West Way, Oxford OX2 0FB",
    "yearsExperience": 24,
    "experienceNote": "24 (qualified 2002)",
    "profileUrl": "https://www.blakemorgan.co.uk/people/james-davies/"
  },
  {
    "id": "newport-leah-thomas",
    "firmName": "Harding Evans LLP",
    "lawyerName": "Leah Thomas",
    "role": "Head of Family & Matrimonial",
    "regulator": "SRA",
    "sraNumber": "419663",
    "registerUrl": "https://www.sra.org.uk/consumers/register/organisation/?sraNumber=419663",
    "citySlug": "newport",
    "practiceAreaSlugs": [
      "family",
      "personal-injury",
      "employment",
      "property",
      "wills-probate"
    ],
    "primaryPracticeArea": "family",
    "bio": "Leads the family team on divorce, financial remedies, children proceedings, non-molestation orders and TOLATA claims.",
    "addressLine1": "Queens Chambers, 2 North Street, Newport NP20 1TE",
    "yearsExperience": 13,
    "experienceNote": "13 (qualified 2013)",
    "profileUrl": "https://newsfromwales.co.uk/new-head-of-family-law-at-harding-evans/"
  },
  {
    "id": "preston-rubina-vohra",
    "firmName": "Forbes Solicitors LLP",
    "lawyerName": "Rubina Vohra",
    "role": "Partner, Head of Family & Divorce",
    "regulator": "SRA",
    "sraNumber": "816356",
    "registerUrl": "https://www.sra.org.uk/consumers/register/organisation/?sraNumber=816356",
    "citySlug": "preston",
    "practiceAreaSlugs": [
      "family",
      "personal-injury",
      "employment",
      "property",
      "wills-probate"
    ],
    "primaryPracticeArea": "family",
    "bio": "Family Law Advanced Accreditation holder handling divorce and finances, complex children matters and domestic abuse cases; Legal 500 recommended.",
    "addressLine1": "Gordon House, Sceptre Way, Walton Summit, Preston PR5 6AW",
    "yearsExperience": 20,
    "experienceNote": "20+",
    "profileUrl": "https://www.forbessolicitors.co.uk/people/rubina-vohra"
  },
  {
    "id": "st-albans-alex-drake",
    "firmName": "Taylor Walton LLP",
    "lawyerName": "Alex Drake",
    "role": "Consultant, Private Client",
    "regulator": "SRA",
    "sraNumber": "465571",
    "registerUrl": "https://www.sra.org.uk/consumers/register/organisation/?sraNumber=465571",
    "citySlug": "st-albans",
    "practiceAreaSlugs": [
      "family",
      "employment",
      "property",
      "wills-probate"
    ],
    "primaryPracticeArea": "wills-probate",
    "bio": "Private client lawyer advising on wills, estate planning, inheritance tax, probate, trusts and powers of attorney.",
    "addressLine1": "Thornycroft House, 107 Holywell Hill, St Albans AL1 1HQ",
    "yearsExperience": 30,
    "experienceNote": "30+",
    "profileUrl": "https://taylorwalton.co.uk/our-people/alex-drake/"
  },
  {
    "id": "norwich-dan-chapman",
    "firmName": "Leathes Prior",
    "lawyerName": "Dan Chapman",
    "role": "Managing Partner, Head of Employment & Sports Law",
    "regulator": "SRA",
    "sraNumber": "53782",
    "registerUrl": "https://www.sra.org.uk/consumers/register/organisation/?sraNumber=53782",
    "citySlug": "norwich",
    "practiceAreaSlugs": [
      "family",
      "personal-injury",
      "employment",
      "property",
      "wills-probate"
    ],
    "primaryPracticeArea": "employment",
    "bio": "Leads the employment and sports law teams; one of two Norwich employment lawyers in the Legal 500 Hall of Fame.",
    "addressLine1": "74 The Close, Norwich NR1 4DR",
    "yearsExperience": 24,
    "experienceNote": "24 (qualified 2002)",
    "profileUrl": "https://www.keele.ac.uk/study/inspiring-alumni/danchapman/"
  },
  {
    "id": "chester-helen-watson",
    "firmName": "Aaron & Partners LLP",
    "lawyerName": "Helen Watson",
    "role": "Senior Partner, Head of Employment",
    "regulator": "SRA",
    "sraNumber": "401104",
    "registerUrl": "https://www.sra.org.uk/consumers/register/organisation/?sraNumber=401104",
    "citySlug": "chester",
    "practiceAreaSlugs": [
      "immigration",
      "family",
      "employment",
      "property",
      "wills-probate"
    ],
    "primaryPracticeArea": "employment",
    "bio": "Employment specialist and tribunal advocate handling discrimination, redundancy and workplace investigations; head of team for 19+ years.",
    "addressLine1": "5-7 Grosvenor Court, Foregate Street, Chester CH1 1HG",
    "yearsExperience": 25,
    "experienceNote": "25+",
    "profileUrl": "https://www.aaronandpartners.com/people/helen-watson/"
  },
  {
    "id": "cambridge-carmel-brown",
    "firmName": "Irwin Mitchell LLP",
    "lawyerName": "Carmel Brown",
    "role": "Partner, Family",
    "regulator": "SRA",
    "sraNumber": "570654",
    "registerUrl": "https://www.sra.org.uk/consumers/register/organisation/?sraNumber=570654",
    "citySlug": "cambridge",
    "practiceAreaSlugs": [
      "immigration",
      "family",
      "personal-injury",
      "employment",
      "property",
      "wills-probate"
    ],
    "primaryPracticeArea": "family",
    "bio": "Family partner advising on high-value financial remedies, pre/post-nuptial agreements and international cases including child relocation; Chambers-ranked (East Anglia).",
    "addressLine1": "20 Station Road, Cambridge CB1 2JD",
    "yearsExperience": null,
    "experienceNote": "Not published",
    "profileUrl": "https://chambers.com/lawyer/carmel-brown-uk-1:25820773"
  },
  {
    "id": "salisbury-jennifer-williamson",
    "firmName": "Wilsons Solicitors LLP",
    "lawyerName": "Jennifer Williamson",
    "role": "Partner, Family",
    "regulator": "SRA",
    "sraNumber": "466564",
    "registerUrl": "https://www.sra.org.uk/consumers/register/organisation/?sraNumber=466564",
    "citySlug": "salisbury",
    "practiceAreaSlugs": [
      "family",
      "employment",
      "property",
      "wills-probate"
    ],
    "primaryPracticeArea": "family",
    "bio": "Collaborative-trained family partner at Wilsons' Salisbury head office (joined December 2021).",
    "addressLine1": "Alexandra House, St Johns Street, Salisbury SP1 2SB",
    "yearsExperience": null,
    "experienceNote": "Not published",
    "profileUrl": "https://www.wilsonsllp.com/news/our-family-law-team-and-collaborative-practice"
  },
  {
    "id": "exeter-anna-garde-evans",
    "firmName": "Stephens Scown LLP",
    "lawyerName": "Anna Garde-Evans",
    "role": "Partner, Inheritance & Trust Disputes",
    "regulator": "SRA",
    "sraNumber": "551582",
    "registerUrl": "https://www.sra.org.uk/consumers/register/organisation/?sraNumber=551582",
    "citySlug": "exeter",
    "practiceAreaSlugs": [
      "immigration",
      "family",
      "employment",
      "property",
      "wills-probate"
    ],
    "primaryPracticeArea": "wills-probate",
    "bio": "Contentious probate partner handling will challenges, estate claims and trust disputes, with a farming and cohabitation focus.",
    "addressLine1": "Curzon House, Southernhay West, Exeter EX1 1RS",
    "yearsExperience": 15,
    "experienceNote": "15 (admitted 01/04/2011)",
    "profileUrl": "https://www.sra.org.uk/consumers/register/person/?sraNumber=460705"
  },
  {
    "id": "gloucester-andrew-ollerenshaw",
    "firmName": "Tayntons (LS) Limited",
    "lawyerName": "Andrew Ollerenshaw",
    "role": "Managing Partner, Personal Injury",
    "regulator": "SRA",
    "sraNumber": "449195",
    "registerUrl": "https://www.sra.org.uk/consumers/register/organisation/?sraNumber=449195",
    "citySlug": "gloucester",
    "practiceAreaSlugs": [
      "family",
      "personal-injury",
      "employment",
      "property",
      "wills-probate"
    ],
    "primaryPracticeArea": "personal-injury",
    "bio": "Personal injury solicitor who has handled thousands of claims, with particular focus on fatal accidents and head and spinal injuries.",
    "addressLine1": "5th Floor, Llanthony Warehouse, The Docks, Gloucester GL1 2EH",
    "yearsExperience": 33,
    "experienceNote": "33 (qualified 1993)",
    "profileUrl": "https://www.tayntons.co.uk/team/andrew-ollerenshaw/"
  },
  {
    "id": "lisburn-peter-graham",
    "firmName": "McFarland Graham McCombe",
    "lawyerName": "Peter Graham",
    "role": "Partner",
    "regulator": "LSNI",
    "sraNumber": null,
    "registerUrl": "https://lawsoc-ni.org/using-a-solicitor/finding-a-solicitor/mcfarland-graham-mccombe",
    "citySlug": "lisburn",
    "practiceAreaSlugs": [
      "family",
      "personal-injury",
      "employment",
      "property",
      "wills-probate"
    ],
    "primaryPracticeArea": "family",
    "bio": "Named partner of a long-established Lisburn practice covering family, personal injury, employment, property and wills & probate.",
    "addressLine1": "41-43 Bachelors Walk, Lisburn BT28 1XN",
    "yearsExperience": null,
    "experienceNote": "Not published (firm est. 1981)",
    "profileUrl": "https://lawsoc-ni.org/using-a-solicitor/finding-a-solicitor/mcfarland-graham-mccombe"
  },
  {
    "id": "chichester-paul-lewis",
    "firmName": "George Ide LLP",
    "lawyerName": "Paul Lewis",
    "role": "Partner, Head of Litigation, Claims & Complaints",
    "regulator": "SRA",
    "sraNumber": "488565",
    "registerUrl": "https://www.sra.org.uk/consumers/register/organisation/?sraNumber=488565",
    "citySlug": "chichester",
    "practiceAreaSlugs": [
      "family",
      "personal-injury",
      "property",
      "wills-probate"
    ],
    "primaryPracticeArea": "personal-injury",
    "bio": "Heads the personal injury and accident management department, handling road, workplace and everyday accident claims.",
    "addressLine1": "61a North Street, Chichester PO19 1NB",
    "yearsExperience": 30,
    "experienceNote": "30+ (joined firm 1989)",
    "profileUrl": "https://www.georgeide.co.uk/people/paul-lewis/"
  },
  {
    "id": "winchester-emma-wilders-pratt",
    "firmName": "Trethowans LLP",
    "lawyerName": "Emma Wilders-Pratt",
    "role": "Partner, Head of Family",
    "regulator": "SRA",
    "sraNumber": "508254",
    "registerUrl": "https://www.sra.org.uk/consumers/register/organisation/?sraNumber=508254",
    "citySlug": "winchester",
    "practiceAreaSlugs": [
      "family",
      "personal-injury",
      "employment",
      "property",
      "wills-probate"
    ],
    "primaryPracticeArea": "family",
    "bio": "Family partner handling divorce with complex assets (businesses, pensions, trusts, farms) and children matters; Chambers & Legal 500 ranked.",
    "addressLine1": "Wykeham Court, Victoria Road, Winchester SO23 7DU",
    "yearsExperience": null,
    "experienceNote": "Not published",
    "profileUrl": "https://www.trethowans.com/people/emma-wilders-pratt/"
  },
  {
    "id": "londonderry-robert-andrew-lyttle",
    "firmName": "Dickson & McNulty Solicitors",
    "lawyerName": "Robert Andrew Lyttle",
    "role": "Partner",
    "regulator": "LSNI",
    "sraNumber": null,
    "registerUrl": "https://lawsoc-ni.org/using-a-solicitor/finding-a-solicitor/dickson-mcnulty-solicitors",
    "citySlug": "londonderry",
    "practiceAreaSlugs": [
      "family",
      "personal-injury",
      "employment",
      "property",
      "wills-probate"
    ],
    "primaryPracticeArea": "property",
    "bio": "Partner handling residential conveyancing and probate; the firm also covers PI, family, employment and wills.",
    "addressLine1": "50 Spencer Road, Waterside, Londonderry BT47 6AA",
    "yearsExperience": 18,
    "experienceNote": "18 (admitted NI 2008)",
    "profileUrl": "https://lawsoc-ni.org/using-a-solicitor/finding-a-solicitor/dickson-mcnulty-solicitors"
  },
  {
    "id": "carlisle-jonathan-carroll",
    "firmName": "Cartmell Shepherd Limited",
    "lawyerName": "Jonathan Carroll",
    "role": "Director, Head of Agriculture",
    "regulator": "SRA",
    "sraNumber": "618960",
    "registerUrl": "https://www.sra.org.uk/consumers/register/organisation/?sraNumber=618960",
    "citySlug": "carlisle",
    "practiceAreaSlugs": [
      "family",
      "personal-injury",
      "employment",
      "property",
      "wills-probate"
    ],
    "primaryPracticeArea": "property",
    "bio": "Agricultural and rural property lawyer advising farmers and landowners on transactions, tenancies and succession; Legal 500 Leading Individual.",
    "addressLine1": "Montgomery Way, Rosehill, Carlisle CA1 2RW",
    "yearsExperience": 25,
    "experienceNote": "25 (qualified 2001)",
    "profileUrl": "https://www.cartmells.co.uk/cartmell-shepherd-team/60-jonathan-carroll/"
  },
  {
    "id": "worcester-laura-williams",
    "firmName": "HCR Legal LLP (HCR Law)",
    "lawyerName": "Laura Williams",
    "role": "Partner, Head of Family, Worcester",
    "regulator": "SRA",
    "sraNumber": "596261",
    "registerUrl": "https://www.sra.org.uk/consumers/register/organisation/?sraNumber=596261",
    "citySlug": "worcester",
    "practiceAreaSlugs": [
      "immigration",
      "family",
      "employment",
      "property",
      "wills-probate"
    ],
    "primaryPracticeArea": "family",
    "bio": "Partner and family mediator leading HCR's Worcester family team on divorce, finances and children matters.",
    "addressLine1": "105 High Street, Worcester WR1 2HW",
    "yearsExperience": null,
    "experienceNote": "Not published",
    "profileUrl": "https://www.hcrlaw.com/news-and-insights/spotlight-on-the-worcester-family-law-team/"
  },
];
