import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "Terms governing use of the Frictionless Tech website.",
};

export default function Terms() {
  return (
    <LegalPage title="Terms and Conditions">
      <p><strong>Last updated: 15 November 2026</strong></p>
      <p>
        These Terms and Conditions ("Terms") apply to your use of the Frictionless Tech website. By
        accessing or using this website, you agree to these Terms. If you do not agree, please do not use
        the website. "Frictionless Tech", "we", "us" and "our" refer to the early-stage retail technology
        venture operating from Bengaluru, Karnataka, India, under that name.
      </p>

      <h2>1. Website information</h2>
      <p>
        This website provides general information about Frictionless Tech, our team and the RFID-based
        retail checkout solution we are developing. The content is for general information and discussion
        only. It is not an offer to sell a product or service, a binding proposal, professional advice or a
        guarantee that any feature, integration, deployment or commercial service is available.
      </p>
      <p>
        Our solution is under development. Descriptions of intended capabilities, benefits, hardware,
        software, integrations, performance and future plans are forward-looking descriptions of our
        objectives and design direction. Actual capabilities and results may differ as development and
        testing progress. No particular performance, availability, accuracy, savings or business outcome is
        promised by this website.
      </p>

      <h2>2. Acceptable use</h2>
      <p>You agree not to:</p>
      <ul>
        <li>use the website for an unlawful, fraudulent or misleading purpose;</li>
        <li>attempt to gain unauthorised access to the website, its hosting environment or related systems;</li>
        <li>interfere with, disrupt or impair the website or its security; or</li>
        <li>copy, scrape, republish or exploit website content in a way that infringes applicable law or another person's rights.</li>
      </ul>

      <h2>3. Intellectual property</h2>
      <p>
        Unless stated otherwise, website text, visual design, logos, graphics and other materials are owned
        by Frictionless Tech or used with permission, and are protected by applicable intellectual property
        laws. You may view and share links to public pages for personal or business reference. You must
        obtain prior written permission before reproducing, adapting or commercially using our materials,
        except where applicable law permits otherwise.
      </p>

      <h2>4. Enquiries and email communication</h2>
      <p>
        When you use the enquiry form, the website prepares an email draft addressed to {site.email} in your
        configured email application. You must review and send that email yourself. The website does not
        automatically transmit, receive or store the draft. Your email application and email service
        provider may apply their own terms, privacy policies and security practices. Sending an enquiry
        does not create a partnership, client, employment, investment or other contractual relationship.
      </p>
      <p>
        Please provide accurate information and do not send confidential, sensitive or restricted material
        unless we have separately agreed an appropriate process for receiving it.
      </p>

      <h2>5. Third-party services and links</h2>
      <p>
        The website may link to third-party websites or services for convenience or additional information.
        We do not control those services and are not responsible for their content, availability, security,
        terms or privacy practices. A link does not necessarily imply endorsement.
      </p>

      <h2>6. Availability and changes</h2>
      <p>
        We may update, suspend or remove website content or features at any time. We do not guarantee that
        the website will always be available, uninterrupted, error-free or free from harmful components.
        We may revise these Terms by publishing an updated version on this page.
      </p>

      <h2>7. Disclaimers and limitation of liability</h2>
      <p>
        To the extent permitted by applicable law, the website and its content are provided on an "as is"
        and "as available" basis, without warranties of any kind, whether express or implied. To the extent
        permitted by law, Frictionless Tech will not be liable for indirect, incidental, special, punitive or
        consequential loss, loss of profits, loss of data or business interruption arising from use of, or
        inability to use, this website. Nothing in these Terms excludes liability that cannot lawfully be
        excluded or limits rights that cannot lawfully be limited.
      </p>

      <h2>8. Governing law</h2>
      <p>
        These Terms are governed by the laws of India. Subject to mandatory applicable law and the
        jurisdiction of courts or forums that cannot lawfully be excluded, disputes relating to these Terms
        or this website will be subject to the courts of Bengaluru, Karnataka, India.
      </p>

      <h2>9. Contact</h2>
      <p>
        Questions about these Terms may be sent to <a href={`mailto:${site.email}`}>{site.email}</a>.
        Public business location: {site.location}.
      </p>
    </LegalPage>
  );
}
