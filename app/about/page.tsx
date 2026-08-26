import type { Metadata } from 'next';
import AboutPage from '../../page-components/AboutPage/AboutPage';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'We are Shivansh Tech Lab — a team of passionate builders, designers, and strategists on a mission to create digital experiences that define tomorrow.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Shivansh Tech Lab',
    description: 'We are Shivansh Tech Lab — a team of passionate builders, designers, and strategists on a mission to create digital experiences that define tomorrow.',
    url: '/about',
  },
};

export default function Page() {
  return <AboutPage />;
}
