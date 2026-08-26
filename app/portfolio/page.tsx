import type { Metadata } from 'next';
import PortfolioPage from '../../page-components/PortfolioPage/PortfolioPage';

export const metadata: Metadata = {
  title: 'Portfolio — Projects That Define Excellence',
  description: '100+ world-class digital products delivered across industries — e-commerce websites, mobile apps, enterprise dashboards, CRM, ERP and SaaS platforms.',
  alternates: { canonical: '/portfolio' },
  openGraph: {
    title: 'Portfolio | Shivansh Tech Lab',
    description: '100+ world-class digital products delivered across industries — from e-commerce websites and mobile apps to enterprise dashboards, CRM, ERP and SaaS platforms.',
    url: '/portfolio',
  },
};

export default function Page() {
  return <PortfolioPage />;
}
