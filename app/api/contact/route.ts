import { access, appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

const recipient = "kowsalyab313@gmail.com";
const columns = ["Received at", "Name", "Phone", "Email", "Preferred dojo", "Student age", "Message"];

function safeCell(value: unknown) {
  let text = String(value ?? "").replace(/\r?\n/g, " ").trim();
  if (/^[=+\-@]/.test(text)) text = `'${text}`;
  return `"${text.replace(/"/g, '""')}"`;
}

function safeHtml(value: unknown) {
  return String(value ?? "").replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[character] ?? character);
}

export async function POST(request: Request) {
  const body = await request.json();
  if (body.website) return NextResponse.json({ ok: true });
  if (!body.name || !body.email || !body.phone || !body.dojo || !body.message) return NextResponse.json({ error: "Please complete all required fields." }, { status: 400 });
  if (!/^\S+@\S+\.\S+$/.test(String(body.email))) return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });

  const receivedAt = new Date().toISOString();
  const row = [receivedAt, body.name, body.phone, body.email, body.dojo, body.age, body.message].map(safeCell).join(",");
  const header = columns.map(safeCell).join(",");
  const attachment = `\uFEFF${header}\n${row}\n`;
  const smtpUser = process.env.GMAIL_SMTP_USER;
  const smtpPass = process.env.GMAIL_APP_PASSWORD;

  if (!smtpUser || !smtpPass) return NextResponse.json({ error: "Email setup is incomplete. Add the Gmail App Password and restart the website." }, { status: 503 });

  try {
    const transporter = nodemailer.createTransport({ service: "gmail", auth: { user: smtpUser, pass: smtpPass } });
    await transporter.sendMail({
      from: `Darkan Karate Website <${smtpUser}>`,
      to: recipient,
      replyTo: String(body.email),
      subject: `New class enquiry from ${String(body.name)}`,
      text: `A new class enquiry was submitted by ${String(body.name)}. The complete details are attached as an Excel-compatible CSV file.`,
      html: `<h2>New Darkan Karate enquiry</h2><p><strong>Name:</strong> ${safeHtml(body.name)}</p><p><strong>Phone:</strong> ${safeHtml(body.phone)}</p><p><strong>Email:</strong> ${safeHtml(body.email)}</p><p><strong>Preferred dojo:</strong> ${safeHtml(body.dojo)}</p><p><strong>Student age:</strong> ${safeHtml(body.age) || "Not provided"}</p><p><strong>Question:</strong> ${safeHtml(body.message)}</p>`,
      attachments: [{ filename: `darkan-enquiry-${receivedAt.slice(0, 10)}.csv`, content: Buffer.from(attachment, "utf8"), contentType: "text/csv; charset=utf-8" }],
    });
  } catch (error) {
    console.error("Contact email delivery failed", error);
    return NextResponse.json({ error: "Gmail rejected the message. Check the sender address and 16-character App Password." }, { status: 502 });
  }

  try {
    const directory = path.join(process.cwd(), "data", "enquiries");
    const file = path.join(directory, "contact-enquiries.csv");
    await mkdir(directory, { recursive: true });
    let needsHeader = false;
    try { await access(file); } catch { needsHeader = true; }
    await appendFile(file, `${needsHeader ? `${header}\n` : ""}${row}\n`, "utf8");
  } catch (error) {
    console.warn("Local enquiry register unavailable", error);
  }

  return NextResponse.json({ ok: true });
}
