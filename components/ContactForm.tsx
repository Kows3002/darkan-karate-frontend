"use client";

import { useState } from "react";

type Errors = Partial<Record<"name" | "phone" | "email" | "dojo" | "message", string>>;

const contactApiUrl = process.env.NEXT_PUBLIC_CONTACT_API_URL;

function getContactEndpoint() {
  if (!contactApiUrl) {
    throw new Error("The contact form is not configured. Please contact us by phone or email.");
  }

  return `${contactApiUrl.replace(/\/$/, "")}/api/contact`;
}

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Errors>({});

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const next: Errors = {};
    if (!data.name) next.name = "Please enter your name.";
    if (!data.phone) next.phone = "Please enter a phone number.";
    if (!data.email || !/^\S+@\S+\.\S+$/.test(String(data.email))) next.email = "Enter a valid email address.";
    if (!data.dojo) next.dojo = "Please select a dojo.";
    if (!data.message) next.message = "Please enter your question.";
    setErrors(next);
    if (Object.keys(next).length) return;
    setStatus("loading");
    try {
      const response = await fetch(getContactEndpoint(), { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const responseText = await response.text();
      let result: { success?: boolean; message?: string; error?: string } = {};
      try { result = responseText ? JSON.parse(responseText) : {}; } catch { result = {}; }
      if (!response.ok || result.success === false) throw new Error(result.message || result.error || "The enquiry could not be sent.");
      setErrors({});
      setStatus("success");
      form.reset();
    } catch (error) {
      const message = error instanceof TypeError
        ? "The contact server is unavailable. Please try again later or contact us by phone or email."
        : error instanceof Error ? error.message : "The enquiry could not be sent.";
      setErrors({ message });
      setStatus("error");
    }
  }

  return <form onSubmit={submit} noValidate className="contact-form">
    <div className="contact-form__trap"><label>Website<input name="website" tabIndex={-1} autoComplete="off"/></label></div>
    <div className="contact-form__row"><label><span>Your name *</span><input name="name" autoComplete="name"/>{errors.name && <small>{errors.name}</small>}</label><label><span>Phone number *</span><input name="phone" inputMode="tel" autoComplete="tel"/>{errors.phone && <small>{errors.phone}</small>}</label></div>
    <label><span>Email address *</span><input name="email" type="email" autoComplete="email"/>{errors.email && <small>{errors.email}</small>}</label>
    <div className="contact-form__row"><label><span>Preferred dojo *</span><select name="dojo" defaultValue=""><option value="" disabled>Select a dojo</option><option>Thiruverkadu Dojo</option><option>Ayyapanthangal Dojo — Kannan</option><option>Ayyapanthangal Dojo — Kowsalya</option><option>Thundalam Dojo</option></select>{errors.dojo && <small>{errors.dojo}</small>}</label><label><span>Student age</span><input name="age" inputMode="numeric"/></label></div>
    <label><span>Your question *</span><textarea name="message" rows={5}/>{status !== "error" && errors.message && <small>{errors.message}</small>}</label>
    <div className="contact-form__submit"><button disabled={status === "loading"}>{status === "loading" ? "Sending…" : "Send enquiry"}</button><div aria-live="polite">{status === "success" && <p>Thank you. Your enquiry has been emailed.</p>}{status === "error" && <p className="contact-form__error">{errors.message}</p>}</div></div>
  </form>;
}
