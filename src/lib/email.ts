export const EMAIL_SUBJECT = 'An idea for Karan';

export function emailLinks(email: string, body = '', subject = EMAIL_SUBJECT) {
  const gmail = new URL('https://mail.google.com/mail/');
  gmail.search = new URLSearchParams({ view: 'cm', fs: '1', to: email, su: subject, body }).toString();
  const outlook = new URL('https://outlook.live.com/mail/0/deeplink/compose');
  outlook.search = new URLSearchParams({ to: email, subject, body }).toString();
  // mailto uses percent-encoded spaces rather than form encoding's literal plus signs.
  const app = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body.replace(/\r?\n/g, '\r\n'))}`;
  return { gmail: gmail.href, outlook: outlook.href, app };
}
