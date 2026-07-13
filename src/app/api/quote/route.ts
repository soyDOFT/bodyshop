// next
import { NextResponse } from 'next/server';

// helpers
import { quoteSchema } from 'src/components/form/quoteSchema';

// data
import { SITE_META } from 'src/data/siteMeta';

export const runtime = 'nodejs';

type EnvConfig = {
  botToken: string;
  chatId: string;
};

/** Read the Telegram credentials, returning null unless both are set. */
function readEnv(): EnvConfig | null {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!botToken || !chatId) return null;
  return { botToken, chatId };
}

/** Validate a quote request and relay it to Telegram. */
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
      '[api/quote] TELEGRAM_BOT_TOKEN/TELEGRAM_CHAT_ID not set, running in simulated mode. ' +
        'Set the env vars to actually send Telegram notifications.',
    );
    return NextResponse.json({ ok: true, simulated: true });
  }

  const escape = (value: string) =>
    value.replace(/[&<>"']/g, (char) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]!,
    );

  const phoneHref = phone.replace(/[^\d+]/g, '');
  const messageBody = requestBody && requestBody.length > 0 ? requestBody : '(no message)';

  const lines = [
    `<b>New quote request</b>`,
    `From the ${escape(SITE_META.name)} website.`,
    ``,
    `<b>Name:</b> ${escape(name)}`,
    `<b>Phone:</b> <a href="tel:${escape(phoneHref)}">${escape(phone)}</a>`,
    `<b>Email:</b> <a href="mailto:${escape(email)}">${escape(email)}</a>`,
    address ? `<b>Address:</b> ${escape(address)}` : null,
    ``,
    `<b>Request:</b>`,
    escape(messageBody),
  ].filter((line): line is string => line !== null);

  const text = lines.join('\n');

  try {
    const res = await fetch(`https://api.telegram.org/bot${env.botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        chat_id: env.chatId,
        text,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => '');
      console.error('[api/quote] telegram sendMessage failed', res.status, body);
      return NextResponse.json(
        { ok: false, error: 'We could not send your request right now. Please call us instead.' },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[api/quote] telegram sendMessage failed', err);
    return NextResponse.json(
      { ok: false, error: 'We could not send your request right now. Please call us instead.' },
      { status: 502 },
    );
  }
}
