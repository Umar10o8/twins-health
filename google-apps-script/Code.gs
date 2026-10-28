/* Twins Health website: demo request form.
   Paste into Extensions > Apps Script of the Google Sheet, then Deploy > Web app.
   The site (src/pages/Contact.jsx, SHEET_URL) posts each request here as JSON. */

const SHEET_NAME = 'Demo requests';
const NOTIFY_EMAIL = 'sales@twinshealth.sa'; // leave '' to skip the email
const HEADERS = ['Timestamp', 'Name', 'Organization', 'Email', 'Phone', 'Solution', 'Message', 'Language', 'Page'];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const d = JSON.parse(e.postData.contents);
    if (!d.name || !d.email) return json({ result: 'error', error: 'Missing name or email' });

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);
    sheet.appendRow([new Date()].concat(
      [d.name, d.org, d.email, d.phone, d.solution, d.message, d.lang, d.page].map(clean)));

    if (NOTIFY_EMAIL) {
      MailApp.sendEmail({
        to: NOTIFY_EMAIL,
        replyTo: d.email,
        subject: 'New demo request: ' + d.name + (d.org ? ' (' + d.org + ')' : ''),
        body: HEADERS.slice(1).map((h, i) =>
          h + ': ' + ([d.name, d.org, d.email, d.phone, d.solution, d.message, d.lang, d.page][i] || '-')).join('\n'),
      });
    }
    return json({ result: 'success' });
  } catch (err) {
    return json({ result: 'error', error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

/* Opening the /exec link in a browser shows this, to confirm the deployment works */
function doGet() {
  return json({ result: 'ok', message: 'Twins Health form endpoint is running' });
}

/* Stops text such as =HYPERLINK(...) from running as a formula in the sheet */
function clean(v) {
  const s = String(v == null ? '' : v).slice(0, 5000);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
