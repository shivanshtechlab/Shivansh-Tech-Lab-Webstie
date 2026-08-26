import type { Metadata } from 'next';
import IndustriesPage from '../../page-components/IndustriesPage/IndustriesPage';

export const metadata: Metadata = {
  title: 'Industries We Serve',
  description: "Deep domain expertise across 10+ verticals. Shivansh Tech Lab doesn't just build software — we understand your industry.",
  alternates: { canonical: '/industries' },
  openGraph: {
    title: 'Industries We Serve | Shivansh Tech Lab',
    description: "Deep domain expertise across 10+ verticals. We don't just build software — we understand your world.",
    url: '/industries',
  },
};

export default function Page() {
  return <IndustriesPage />;
}
