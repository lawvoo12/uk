import { redirect } from "next/navigation";

// This whole app lives under /uk/* — it's built to be mounted at
// lawvoo.com/uk/* alongside the separate US Lawvoo app at the domain root
// (see README's "Multi-zone deploy" section). The bare "/" route only gets
// hit when this app is opened directly on its own preview/staging URL
// instead of through the lawvoo.com/uk rewrite, so it just forwards to the
// real homepage at /uk.
export default function RootRedirect() {
  redirect("/uk");
}
