import type { Metadata } from 'next';
import LegalPage from '../../page-components/LegalPage/LegalPage';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Read the Shivansh Tech Lab privacy policy to learn how we collect, use, and protect your personal information.',
  alternates: { canonical: '/privacy' },
};

export default function Page() {
  return (
    <LegalPage badge="LEGAL" title="Privacy Policy" breadcrumb="Privacy Policy" updated="August 26, 2026">
      <h2>1. Introduction</h2>
      <p>
        Shivansh Tech Lab (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) respects your privacy and is committed to
        protecting the personal information you share with us. This Privacy Policy explains what information we collect,
        how we use it, and the choices you have, when you visit shivanshtechlabs.com or engage us for web development,
        mobile app, ERP/CRM, SaaS, AI, or cloud services.
      </p>

      <h2>2. Information We Collect</h2>
      <p>We may collect the following types of information:</p>
      <ul>
        <li><strong>Contact details</strong> you submit through our contact or quote forms, such as your name, email address, phone number, and company name.</li>
        <li><strong>Project details</strong> you share with us to scope or discuss a potential engagement.</li>
        <li><strong>Usage data</strong> such as pages visited, device and browser type, and referring pages, collected automatically via cookies and similar technologies.</li>
      </ul>

      <h2>3. How We Use Your Information</h2>
      <p>We use the information we collect to:</p>
      <ul>
        <li>Respond to your enquiries and provide project quotes.</li>
        <li>Deliver, maintain, and improve our services.</li>
        <li>Send updates related to a project or engagement you have with us.</li>
        <li>Understand how visitors use our website so we can improve it.</li>
      </ul>

      <h2>4. Cookies</h2>
      <p>
        Our website may use cookies and similar technologies to remember your preferences and analyse site traffic. You can
        control or disable cookies through your browser settings; disabling them may affect some site functionality.
      </p>

      <h2>5. Sharing Your Information</h2>
      <p>
        We do not sell your personal information. We may share information with trusted third-party service providers
        (for example, hosting, analytics, or email delivery providers) solely to help us operate our website and deliver
        our services, and only to the extent necessary for them to perform those services.
      </p>

      <h2>6. Data Security</h2>
      <p>
        We take reasonable technical and organisational measures to protect the information we hold from unauthorised
        access, alteration, disclosure, or destruction. No method of transmission or storage is completely secure, and we
        cannot guarantee absolute security.
      </p>

      <h2>7. Your Rights</h2>
      <p>
        You may request access to, correction of, or deletion of the personal information we hold about you by contacting
        us using the details below.
      </p>

      <h2>8. Children&rsquo;s Privacy</h2>
      <p>
        Our services are intended for businesses and professionals. We do not knowingly collect personal information from
        children under 13.
      </p>

      <h2>9. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated
        &ldquo;Last updated&rdquo; date.
      </p>

      <h2>10. Contact Us</h2>
      <p>
        If you have questions about this Privacy Policy, contact us at{' '}
        <a href="mailto:hello@shivanshtechlabs.com">hello@shivanshtechlabs.com</a> or write to us at 34/1 Ravi Sudha
        Apartment, Near Post Office, Dum Dum, Kolkata 700030, West Bengal, India.
      </p>
    </LegalPage>
  );
}
