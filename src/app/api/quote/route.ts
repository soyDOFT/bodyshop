// next
import { NextResponse } from 'next/server';

// helpers
import nodemailer from 'nodemailer';
import { quoteSchema } from 'src/components/form/quoteSchema';

// data
import { SITE_META } from 'src/data/siteMeta';

export const runtime = 'nodejs';

type EnvConfig = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  password: string;
  to: string;
  from: string;
};

function readEnv(): EnvConfig | null {
  const user = process.env.SMTP_USER;
  const password = process.env.SMTP_PASSWORD;
  if (!user || !password) return null;

  const port = Number(process.env.SMTP_PORT ?? 465);
  return {
    host: process.env.SMTP_HOST ?? 'smtp.gmail.com',
    port: Number.isFinite(port) ? port : 465,
    secure: (process.env.SMTP_SECURE ?? 'true').toLowerCase() !== 'false',
    user,
    password,
    to: process.env.QUOTE_TO ?? user,
    from: process.env.QUOTE_FROM ?? user,
  };
}

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON body.' }, { status: 400 });
  }

  const parsed = quoteSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: 'Validation failed.',
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const { hp_url, name, phone, email, address, request: requestBody } = parsed.data;

  if (hp_url && hp_url.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const env = readEnv();
  if (!env) {
    console.warn(
      '[api/quote] SMTP_USER/SMTP_PASSWORD not set — running in simulated mode. ' +
        'Set the env vars to actually send email.',
    );
    return NextResponse.json({ ok: true, simulated: true });
  }

  const transport = nodemailer.createTransport({
    host: env.host,
    port: env.port,
    secure: env.secure,
    auth: { user: env.user, pass: env.password },
  });

  const subject = `New quote request — ${name}`;
  const textLines = [
    `New quote request from the ${SITE_META.name} website.`,
    '',
    `Name:    ${name}`,
    `Phone:   ${phone}`,
    `Email:   ${email}`,
    address ? `Address: ${address}` : null,
    '',
    'Request:',
    requestBody && requestBody.length > 0 ? requestBody : '(no message)',
  ].filter(Boolean);
  const text = textLines.join('\n');

  const escape = (s: string) =>
    s.replace(/[&<>"']/g, (ch) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch]!,
    );

  const html = `
    <h2 style="margin:0 0 12px;font-family:system-ui,sans-serif">New quote request</h2>
    <p style="margin:0 0 16px;font-family:system-ui,sans-serif;color:#444">From the ${escape(SITE_META.name)} website.</p>
    <table style="border-collapse:collapse;font-family:system-ui,sans-serif;font-size:14px">
      <tr><td style="padding:4px 12px 4px 0;color:#666">Name</td><td>${escape(name)}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;color:#666">Phone</td><td>${escape(phone)}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;color:#666">Email</td><td><a href="mailto:${escape(email)}">${escape(email)}</a></td></tr>
      ${address ? `<tr><td style="padding:4px 12px 4px 0;color:#666">Address</td><td>${escape(address)}</td></tr>` : ''}
    </table>
    <h3 style="margin:24px 0 8px;font-family:system-ui,sans-serif">Request</h3>
    <p style="white-space:pre-wrap;font-family:system-ui,sans-serif;line-height:1.55;color:#222">${escape(requestBody && requestBody.length > 0 ? requestBody : '(no message)')}</p>
  `.trim();

  try {
    await transport.sendMail({
      from: env.from,
      to: env.to,
      replyTo: email,
      subject,
      text,
      html,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[api/quote] sendMail failed', err);
    return NextResponse.json(
      { ok: false, error: 'We could not send your request right now. Please call us instead.' },
      { status: 502 },
    );
  }
}
