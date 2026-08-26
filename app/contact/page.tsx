import type { Metadata } from 'next';
import ContactPage from '../../page-components/ContactPage/ContactPage';

export const metadata: Metadata = {
  title: "Contact Us — Let's Build Something Amazing",
  description: "Ready to transform your idea into reality? Contact Shivansh Tech Lab — tell us about your project and we'll get back to you within 2 hours.",
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact Shivansh Tech Lab',
    description: "Ready to transform your idea into reality? Tell us about your project and we'll get back to you within 2 hours.",
    url: '/contact',
  },
};

export default function Page() {
  return <ContactPage />;
}
