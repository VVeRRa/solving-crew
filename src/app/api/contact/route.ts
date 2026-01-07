import { NextResponse } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';
import { ZodError } from "zod";

export const runtime = 'nodejs';

const schema = z.object({
    company: z.string().max(120).optional().nullable().transform(v => v ?? ''),
    phone: z.string().max(50).optional().nullable().transform(v => v ?? ''),
    website: z.string().optional().nullable().transform(v => v ?? ''),
    locale: z.string().optional().nullable().transform(v => v ?? undefined),
    name: z.string().min(1).max(120),
    email: z.string().email(),
    message: z.string().min(5).max(5000),

    // anti-spam honeypot
});

const resend = new Resend(process.env.RESEND_API_KEY);
const to = process.env.CONTACT_TO;
const from = process.env.CONTACT_FROM;

export async function POST(req: Request) {
    try {
        const json = await req.json();
        const data = schema.parse(json);

        console.log(data);

        // honeypot filled -> bot
        if (data.website) {
            return NextResponse.json({ ok: true }, { status: 200 });
        }


        if (!to || !from) {
            return NextResponse.json(
                { ok: false, error: 'Missing CONTACT_TO or CONTACT_FROM' },
                { status: 500 }
            );
        }

        const subject = `Solving Crew — contact form: ${data.name}${data.company ? ` (${data.company})` : ''}`;

        const text =
            `Name: ${data.name}\n` +
            `Company: ${data.company || '-'}\n` +
            `Email: ${data.email}\n` +
            `Phone: ${data.phone || '-'}\n` +
            `Locale: ${data.locale || '-'}\n\n` +
            `${data.message}\n`;

        await resend.emails.send({
            from,
            to: [to],
            subject,
            text,
            replyTo: data.email,
        });

        return NextResponse.json({ ok: true }, { status: 200 });
    } catch (e: any) {
        // zod validation -> 400
        if (e instanceof ZodError) {
            return NextResponse.json(
                { ok: false, error: "Invalid payload", issues: e.flatten() },
                { status: 400 }
            );
        }
        if (e?.name === "ZodError") {
            return NextResponse.json(
                { ok: false, error: "Invalid payload", issues: e.flatten() },
                { status: 400 }
            );
        }
        return NextResponse.json({ ok: false, error: "Send failed", details: String(e) }, { status: 500 });
    }
}
