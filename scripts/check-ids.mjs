// Checks that every lawyer id is unique across the UK, Ireland and Canada
// data files, and that Canadian ids carry their province code
// (toronto-on-…, london-on-…) so they can never match a UK or Irish id.
//
//   npm run check:ids
//
// Exits with an error (and lists the problems) if anything is wrong.
import { readFileSync } from "node:fs";

const FILES = {
  uk: ["lib/data/static-lawyers.ts", "lib/data/uk-lawyers-extra.ts"],
  ie: ["lib/ie/lawyers.ts"],
  ca: ["lib/ca/lawyers.ts"],
  us: ["lib/us/lawyers.ts"],
};

// Matches both `id: "…"` and `"id": "…"` (the original UK file uses quoted keys).
const ID_LINE = /^\s*["']?id["']?:\s*["']([^"']+)["']/gm;
const CA_ID = /^[a-z0-9-]+-(on|bc|ab|sk|mb|ns|nb|nl|pe)-[a-z0-9-]+$/;
const US_ID = /^[a-z0-9-]+-(al)-[a-z0-9-]+$/;

const seen = new Map(); // id -> "country (file)"
const problems = [];
const counts = {};

for (const [country, files] of Object.entries(FILES)) {
  counts[country] = 0;
  for (const file of files) {
    const text = readFileSync(new URL(`../${file}`, import.meta.url), "utf8");
    for (const match of text.matchAll(ID_LINE)) {
      const id = match[1];
      counts[country] += 1;
      if (seen.has(id)) problems.push(`Duplicate id "${id}": ${seen.get(id)} and ${country} (${file})`);
      else seen.set(id, `${country} (${file})`);
      if (country === "us" && !US_ID.test(id)) {
        problems.push(`US id "${id}" must look like <city>-<state code>-<name>, e.g. birmingham-al-jane-smith`);
      }
      if (country === "ca" && !CA_ID.test(id)) {
        problems.push(`Canadian id "${id}" must look like <city>-<province code>-<name>, e.g. toronto-on-jane-smith`);
      }
    }
  }
}

console.log(`Lawyer ids — UK: ${counts.uk}, Ireland: ${counts.ie}, Canada: ${counts.ca}, US: ${counts.us}, total: ${seen.size}`);
if (problems.length > 0) {
  console.error(problems.join("\n"));
  process.exit(1);
}
console.log("All ids are unique.");
