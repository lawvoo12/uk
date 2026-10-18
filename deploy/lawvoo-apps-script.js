// Lawvoo — Google Sheet Apps Script (UK + Ireland + Canada + US). Updated 17 Oct 2026.
// Paste this over the whole script in Extensions -> Apps Script, put your own
// SECRET back in, then: Deploy -> Manage deployments -> Edit (pencil) ->
// Version: New version -> Deploy. The web app URL stays the same.
// What changed for the US (17 Oct 2026): "US" is now accepted as a country, and
// US leads show "ZIP code" in the email. Without this, US clicks would be
// recorded as "UK".
// What changed for Canada: "CA" is now accepted as a country (it used to be
// saved as "UK"), and Canadian lead emails say "Postal code".

var SECRET = "PASTE-YOUR-SECRET-HERE";      // same as GOOGLE_SHEETS_WEBHOOK_SECRET
var NOTIFY_EMAIL = "lawvoo12@gmail.com";     // gets an email for every lead + the click alert
var CLICK_ALERT_AT = 15;                     // email me when clicks reach this number
var LEAD_ALERT = true;                       // false = no email per lead

function doPost(e) {
  var data = JSON.parse(e.postData.contents);
  if (data.secret !== SECRET) return reply({ status: "forbidden" });

  var country = data.country === "IE" ? "IE" : data.country === "CA" ? "CA" : data.country === "US" ? "US" : "UK";
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();

    // Anonymous "wanted to enquire" clicks while the form is off.
    if (data.type === "click") {
      var clicks = ss.getSheetByName("Clicks") || ss.insertSheet("Clicks");
      if (clicks.getLastRow() === 0) clicks.appendRow(["Clicked At", "Source", "Solicitor", "City", "Country"]);
      clicks.appendRow([data.clickedAt, data.source, data.solicitor || "", data.citySlug || "", country]);
      var total = clicks.getLastRow() - 1;
      if (total === CLICK_ALERT_AT) {
        MailApp.sendEmail(
          NOTIFY_EMAIL,
          "Lawvoo: " + total + " people tried to enquire",
          total + " visitors have clicked 'Request a callback' or 'Find a solicitor / lawyer'.\n\n" +
            "(Clicks are only counted while the form is switched off.)\n\n" + ss.getUrl()
        );
      }
      return reply({ status: "success" });
    }

    // A real enquiry from the form (UK, Ireland or Canada).
    ss.getSheetByName("Sheet1").appendRow([
      data.leadId,
      data.submittedAt,
      data.practiceArea,
      data.subCategory,
      data.caseTitle,
      data.description,
      data.urgency,
      data.postcode,
      data.city,
      data.fullName,
      data.email,
      data.phone,
      data.requestedSolicitor || "",
      country,
    ]);

    // Email alert for every lead. A mail problem never loses the lead —
    // the row above is already saved.
    if (LEAD_ALERT) {
      try {
        MailApp.sendEmail({
          to: NOTIFY_EMAIL,
          replyTo: data.email,
          subject: "[" + country + "] New Lawvoo lead: " + data.practiceArea + " — " + data.city,
          body: [
            "Country: " + country,
            "Practice area: " + data.practiceArea + " (" + data.subCategory + ")",
            "Urgency: " + data.urgency,
            (country === "IE" ? "Eircode: " : country === "CA" ? "Postal code: " : country === "US" ? "ZIP code: " : "Postcode: ") + (data.postcode || "-") + "   Town: " + data.city,
            data.requestedSolicitor ? "Requested solicitor: " + data.requestedSolicitor : "Requested solicitor: none",
            "",
            "Name: " + data.fullName,
            "Email: " + data.email,
            "Phone: " + data.phone,
            "",
            "Case: " + data.caseTitle,
            data.description,
            "",
            "Lead ID: " + data.leadId,
            ss.getUrl(),
          ].join("\n"),
        });
      } catch (err) {
        console.error("Lead alert email failed: " + err);
      }
    }
    return reply({ status: "success" });
  } finally {
    lock.releaseLock();
  }
}

function reply(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
