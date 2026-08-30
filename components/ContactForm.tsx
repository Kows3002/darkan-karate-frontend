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
    if (Object.keys(next).length) {
      requestAnimationFrame(() => form.querySelector<HTMLElement>("[aria-invalid='true']")?.focus());
      return;
    }
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

  return <form onSubmit={submit} noValidate className="contact-form" aria-describedby="required-fields-note">
    <p id="required-fields-note" className="sr-only">Fields marked with an asterisk are required.</p>
    <div className="contact-form__trap" aria-hidden="true"><label htmlFor="website">Website</label><input id="website" name="website" tabIndex={-1} autoComplete="off"/></div>
    <div className="contact-form__row">
      <label htmlFor="name"><span>Your name *</span><input id="name" name="name" autoComplete="name" required aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined}/>{errors.name && <small id="name-error" role="alert">{errors.name}</small>}</label>
      <label htmlFor="phone"><span>Phone number *</span><input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "phone-error" : undefined}/>{errors.phone && <small id="phone-error" role="alert">{errors.phone}</small>}</label>
    </div>
    <label htmlFor="email"><span>Email address *</span><input id="email" name="email" type="email" autoComplete="email" required aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined}/>{errors.email && <small id="email-error" role="alert">{errors.email}</small>}</label>
    <div className="contact-form__row">
      <label htmlFor="dojo"><span>Preferred dojo *</span><select id="dojo" name="dojo" defaultValue="" required aria-invalid={Boolean(errors.dojo)} aria-describedby={errors.dojo ? "dojo-error" : undefined}><option value="" disabled>Select a dojo</option><option>Thiruverkadu Dojo</option><option>Ayyapanthangal Dojo — Kannan</option><option>Ayyapanthangal Dojo — Kowsalya</option><option>Thundalam Dojo</option></select>{errors.dojo && <small id="dojo-error" role="alert">{errors.dojo}</small>}</label>
      <label htmlFor="age"><span>Student age</span><input id="age" name="age" type="number" inputMode="numeric" min="3" max="100"/></label>
    </div>
    <label htmlFor="message"><span>Your question *</span><textarea id="message" name="message" rows={5} required aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "message-error" : undefined}/>{status !== "error" && errors.message && <small id="message-error" role="alert">{errors.message}</small>}</label>
    <div className="contact-form__submit"><button type="submit" disabled={status === "loading"} aria-disabled={status === "loading"}>{status === "loading" ? "Sending…" : "Send enquiry"}</button><div aria-live="polite" aria-atomic="true">{status === "success" && <p role="status">Thank you. Your enquiry has been emailed.</p>}{status === "error" && <p id="message-error" role="alert" className="contact-form__error">{errors.message}</p>}</div></div>
  </form>;
}
