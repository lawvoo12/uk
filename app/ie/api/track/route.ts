import { handleTrack } from "@/lib/track/handle-track";

// Anonymous "wanted to enquire" counter for the Ireland pages — see lib/track/handle-track.ts.
export async function POST(request: Request) {
  return handleTrack(request, "ie");
}
