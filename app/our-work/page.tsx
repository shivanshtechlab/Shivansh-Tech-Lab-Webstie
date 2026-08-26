import type { Metadata } from 'next';
import OurWorkPage from '../../page-components/OurWorkPage/OurWorkPage';

export const metadata: Metadata = {
  title: 'Our Work — Portfolio of Digital Products',
  description: 'Over 100 world-class digital products delivered — websites, mobile apps, enterprise dashboards, CRM, ERP and SaaS platforms built by Shivansh Tech Lab.',
  alternates: { canonical: '/our-work' },
  openGraph: {
    title: 'Our Work | Shivansh Tech Lab',
    description: 'Over 100 world-class digital products delivered. Here are some of our most impactful projects.',
    url: '/our-work',
  },
};

export default function Page() {
  return <OurWorkPage />;
}
