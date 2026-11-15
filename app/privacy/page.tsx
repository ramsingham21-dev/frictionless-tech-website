import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Frictionless Tech handles information when you visit our website or contact us.",
};

export default function Privacy() {
  return (
    <LegalPage title="Privacy Policy">
      <p><strong>Last updated: 15 November 2026</strong></p>
      <p>
        Frictionless Tech ("we", "us" or "our") is an early-stage retail technology venture based in
        Bengaluru, Karnataka, India. This Privacy Policy explains how information may be handled when
        you visit this website or contact us. Our contact email is <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>

      <h2>1. Information you choose to provide</h2>
      <p>
        Our enquiry form runs in your browser and prepares a draft email addressed to {site.email} in
        your device's or browser's configured email application. The draft may contain the details you
        enter, such as your name, organisation, email address, phone number, enquiry category and message.
        The website does not send that draft for you. You must review it and press Send in your email
        application before we receive it.
      </p>
      <p>
        If you do not send the draft, the enquiry details are not submitted to or stored by this website.
        You can also contact us directly by email. Please do not include passwords, payment-card details,
        government identity numbers or other sensitive information in an enquiry.
      </p>

      <h2>2. Technical information and hosting</h2>
      <p>
        The website is hosted using Vercel. Like other website hosting providers, Vercel may process
        technical request information needed to deliver, maintain and secure the website, such as IP
        address, browser or device information, requested pages, timestamps and security logs. Such
        processing is subject to the hosting provider's terms and privacy information.
      </p>

      <h2>3. Cookies and analytics</h2>
      <p>
        As of the date above, we have not configured Google Analytics, advertising pixels or optional
        visitor-tracking analytics on this website. The website does not intentionally use analytics or
        advertising cookies. The hosting provider may use technical mechanisms necessary for website
        delivery, security or reliability; those are governed by the provider's own documentation and
        policies.
      </p>

      <h2>4. How we use information</h2>
      <p>If you send us an email, we may use the information in it to:</p>
      <ul>
        <li>read and respond to your question or enquiry;</li>
        <li>discuss retail partnerships, demonstrations, investment, mentoring or technology collaboration;</li>
        <li>maintain relevant business correspondence and follow up where appropriate; and</li>
        <li>meet legal obligations or protect our legitimate business and security interests.</li>
      </ul>

      <h2>5. Email providers and sharing</h2>
      <p>
        When you send an enquiry, it travels through the email application and email service providers
        involved in sending and receiving it. Our contact mailbox is provided through Gmail. Those
        providers may process and store the message under their own terms and privacy policies, and may
        process information in locations outside your home jurisdiction. We do not sell personal
        information. We do not share enquiry content with unrelated third parties except where needed to
        operate our communications, comply with law, or protect our rights and users.
      </p>

      <h2>6. Retention and security</h2>
      <p>
        We keep email correspondence for as long as reasonably necessary to respond, manage the
        relationship, maintain appropriate business records and meet legal requirements. Retention may
        vary depending on the nature of the enquiry. We take reasonable care when handling correspondence,
        but no internet transmission or electronic storage method can be guaranteed to be completely secure.
      </p>

      <h2>7. Your choices and requests</h2>
      <p>
        You can choose not to send an enquiry. You may also contact us at {site.email} to ask a question
        about personal information included in correspondence, or to request correction or deletion where
        applicable. We will consider and respond to requests in accordance with applicable law and any
        records we are required to retain.
      </p>

      <h2>8. Children</h2>
      <p>
        This website is intended for businesses, retailers, investors, mentors and technology partners. It
        is not directed at children, and we do not knowingly seek to collect personal information from
        children through this website.
      </p>

      <h2>9. Changes to this policy</h2>
      <p>
        We may update this policy when our website, contact process or legal obligations change. The
        latest version will be published on this page with a revised update date. This notice is intended
        to describe our current practices and should be read together with applicable Indian data
        protection law, including the Digital Personal Data Protection Act, 2023 and the rules made under it,
        as and when the relevant provisions apply.
      </p>

      <h2>10. Contact</h2>
      <p>
        For privacy questions or requests, contact Frictionless Tech at <a href={`mailto:${site.email}`}>{site.email}</a>.
        Public business location: {site.location}.
      </p>
    </LegalPage>
  );
}
