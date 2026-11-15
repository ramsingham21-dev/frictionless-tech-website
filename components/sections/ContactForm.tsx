"use client";

import { useState } from "react";
import { contact, site } from "@/lib/content";
import { validateEnquiry, type Enquiry, type EnquiryErrors } from "@/lib/enquiry";
import { Fill } from "../Fill";
import { Button } from "../Button";

type State = "idle" | "prepared";

export function ContactForm() {
  const [state, setState] = useState<State>("idle");
  const [errors, setErrors] = useState<EnquiryErrors>({});

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Partial<Enquiry> & { website?: string };
    const found = validateEnquiry(data, contact.errors, contact.enquiryTypes);
    setErrors(found);
    if (Object.keys(found).length) {
      const first = Object.keys(found)[0];
      (form.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }
    // This site does not store or submit enquiry data to its own server.
    // It opens the visitor's email application with a pre-filled draft instead.
    if (data.website?.trim()) return;

    const subject = `Website enquiry from ${data.name?.trim() || "a visitor"}`;
    const body = [
      "Website enquiry — Frictionless Tech",
      "",
      `Name: ${data.name ?? ""}`,
      `Organization: ${data.organization || "Not provided"}`,
      `Email: ${data.email ?? ""}`,
      `Phone: ${data.phone || "Not provided"}`,
      `Enquiry type: ${data.type ?? ""}`,
      "",
      "Message:",
      data.message ?? "",
    ].join("\n");

    const mailto = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setState("prepared");
  }

  const field = (name: keyof Enquiry) => ({
    id: `f-${name}`,
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `e-${name}` : undefined,
  });
  const err = (name: keyof Enquiry) =>
    errors[name] ? <p id={`e-${name}`} className="field__err">{errors[name]}</p> : null;

  return (
    <form className="form paper tape" onSubmit={onSubmit} noValidate aria-label="Enquiry form">
      <div className="form__row">
        <div className="field">
          <label htmlFor="f-name">Full Name</label>
          <input {...field("name")} type="text" autoComplete="name" placeholder="Your full name" required />
          {err("name")}
        </div>
        <div className="field">
          <label htmlFor="f-organization">Business / Organization Name<span className="opt">Optional</span></label>
          <input {...field("organization")} type="text" autoComplete="organization" placeholder="Store, company or institution" />
        </div>
      </div>
      <div className="form__row">
        <div className="field">
          <label htmlFor="f-email">Email Address</label>
          <input {...field("email")} type="email" autoComplete="email" inputMode="email" placeholder="you@company.com" required />
          {err("email")}
        </div>
        <div className="field">
          <label htmlFor="f-phone">Phone Number<span className="opt">Optional</span></label>
          <input {...field("phone")} type="tel" autoComplete="tel" inputMode="tel" placeholder="+91" />
        </div>
      </div>
      <div className="field">
        <label htmlFor="f-type">Enquiry Type</label>
        <select {...field("type")} defaultValue="" required>
          <option value="" disabled>Choose one</option>
          {contact.enquiryTypes.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        {err("type")}
      </div>
      <div className="field">
        <label htmlFor="f-message">Message</label>
        <textarea {...field("message")} placeholder="What would you like to talk about?" maxLength={4000} required />
        {err("message")}
      </div>
      <div className="hp" aria-hidden="true">
        <label htmlFor="f-website">Website</label>
        <input id="f-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div aria-live="polite">
        {state === "prepared" && <p className="form__status form__status--ok"><Fill text={contact.success} /></p>}
      </div>

      <div className="form__foot">
        <Button type="submit" label={contact.submit} />
        <p className="form__privacy">
          {contact.privacy} Read our <a href="/privacy">Privacy Policy</a>.
        </p>
      </div>
    </form>
  );
}
