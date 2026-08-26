import type { Metadata } from 'next';
import PricingPage from '../../page-components/PricingPage/PricingPage';

export const metadata: Metadata = {
  title: 'Pricing — Simple, Transparent Plans',
  description: 'No hidden fees, no surprises. Transparent pricing for websites, business software, mobile apps and bundled packages from Shivansh Tech Lab.',
  alternates: { canonical: '/pricing' },
  openGraph: {
    title: 'Pricing | Shivansh Tech Lab',
    description: 'No hidden fees. No surprises. Choose the plan that fits your goals — from a single website to a complete digital ecosystem.',
    url: '/pricing',
  },
};

export default function Page() {
  return <PricingPage />;
}
