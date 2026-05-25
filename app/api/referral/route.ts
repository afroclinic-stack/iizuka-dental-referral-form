import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { referralSchema } from "@/lib/schema";
import { buildNotificationHtml, buildConfirmationHtml } from "@/lib/email/buildHtml";

const resend = new Resend(process.env.RESEND_API_KEY);

// レート制限（簡易版 — インメモリ。Vercel Edge では Redis 推奨）
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 10;
const RATE_WINDOW_MS = 60 * 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: "リクエストが多すぎます。しばらく後にお試しください。" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "リクエスト形式が不正です。" }, { status: 400 });
  }

  const parsed = referralSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "入力内容に不備があります。", details: parsed.error.flatten() }, { status: 422 });
  }

  const data = parsed.data;

  // Honeypot チェック
  if (data._honeypot) {
    return NextResponse.json({ ok: true });
  }

  const urgencyPrefix =
    data.urgency === "緊急" ? "【緊急・患者紹介】" :
    data.urgency === "準緊急" ? "【準緊急・患者紹介】" : "【患者紹介】";

  try {
    await Promise.all([
      resend.emails.send({
        from: process.env.FROM_EMAIL!,
        to: process.env.DENTAL_CLINIC_EMAIL!,
        replyTo: data.email,
        subject: `${urgencyPrefix}${data.patientNameKanji} 様 – ${data.clinicName}`,
        html: buildNotificationHtml(data),
      }),
      resend.emails.send({
        from: process.env.FROM_EMAIL!,
        to: data.email,
        subject: `【送信控え】患者紹介フォーム – ${data.patientNameKanji} 様`,
        html: buildConfirmationHtml(data),
      }),
    ]);
  } catch (err) {
    console.error("Email send error:", err);
    return NextResponse.json({ error: "メール送信に失敗しました。しばらく後にお試しください。" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
