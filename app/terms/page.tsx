import type { Metadata } from 'next';
import LegalPage from '../../page-components/LegalPage/LegalPage';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Read the terms and conditions governing your use of the Shivansh Tech Lab website and services.',
  alternates: { canonical: '/terms' },
};

export default function Page() {
  return (
    <LegalPage badge="LEGAL" title="Terms of Service" breadcrumb="Terms of Service" updated="August 26, 2026">
      <h2>1. Acceptance of Terms</h2>
      <p>
        By accessing shivanshtechlabs.com or engaging Shivansh Tech Lab (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;)
        for services, you agree to be bound by these Terms of Service. If you do not agree, please do not use our website
        or services.
      </p>

      <h2>2. Our Services</h2>
      <p>
        Shivansh Tech Lab provides web development, mobile app development, ERP/CRM software, SaaS platforms, AI
        solutions, and cloud services. The specific scope, deliverables, timeline, and pricing for any engagement are
        agreed separately in a project proposal, statement of work, or contract signed by both parties.
      </p>

      <h2>3. Use of This Website</h2>
      <p>
        You agree to use this website only for lawful purposes and in a way that does not infringe the rights of, or
        restrict or inhibit the use and enjoyment of, this site by anyone else. You may not attempt to gain unauthorised
        access to any part of this website or any systems connected to it.
      </p>

      <h2>4. Intellectual Property</h2>
      <p>
        Unless otherwise agreed in writing as part of a client project, all content on this website — including text,
        graphics, logos, and code — is the property of Shivansh Tech Lab and is protected by applicable intellectual
        property laws. Deliverables produced for a paying client under a signed agreement are governed by the terms of
        that agreement.
      </p>

      <h2>5. Project Engagements &amp; Payment</h2>
      <p>
        Where you engage us for a project, payment terms, milestones, and deliverables will be set out in a separate
        proposal or contract. Quotes shown on this website (including on the Pricing page) are indicative starting
        estimates and are confirmed only once a formal proposal is agreed.
      </p>

      <h2>6. Limitation of Liability</h2>
      <p>
        To the maximum extent permitted by law, Shivansh Tech Lab shall not be liable for any indirect, incidental, or
        consequential damages arising from your use of this website or our services, except as otherwise agreed in a
        signed project contract.
      </p>

      <h2>7. Third-Party Links</h2>
      <p>
        Our website may contain links to third-party websites. We are not responsible for the content or privacy
        practices of those sites.
      </p>

      <h2>8. Termination</h2>
      <p>
        We reserve the right to suspend or terminate access to this website for any user who violates these Terms of
        Service.
      </p>

      <h2>9. Governing Law</h2>
      <p>
        These Terms are governed by the laws of India, and any disputes will be subject to the exclusive jurisdiction of
        the courts of Kolkata, West Bengal.
      </p>

      <h2>10. Changes to These Terms</h2>
      <p>
        We may update these Terms of Service from time to time. Continued use of this website after changes are posted
        constitutes acceptance of the revised terms.
      </p>

      <h2>11. Contact Us</h2>
      <p>
        Questions about these Terms can be sent to{' '}
        <a href="mailto:hello@shivanshtechlabs.com">hello@shivanshtechlabs.com</a> or to 34/1 Ravi Sudha Apartment, Near
        Post Office, Dum Dum, Kolkata 700030, West Bengal, India.
      </p>
    </LegalPage>
  );
}
