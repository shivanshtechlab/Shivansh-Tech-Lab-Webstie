import type { Metadata } from 'next';
import ServicesPage from '../../page-components/ServicesPage/ServicesPage';

export const metadata: Metadata = {
  title: 'Services — Complete Digital Solutions',
  description: 'Web development, mobile apps, ERP/CRM software, SaaS platforms, AI solutions and cloud services — from concept to launch, delivered by Shivansh Tech Lab.',
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'Services | Shivansh Tech Lab',
    description: 'From concept to launch — we deliver every layer of your digital ecosystem with precision, speed, and mastery.',
    url: '/services',
  },
};

export default function Page() {
  return <ServicesPage />;
}
