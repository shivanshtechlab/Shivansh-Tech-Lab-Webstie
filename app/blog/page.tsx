import type { Metadata } from 'next';
import BlogPage from '../../page-components/BlogPage/BlogPage';

export const metadata: Metadata = {
  title: 'Blog — Insights & Innovation',
  description: 'Thoughts, tutorials, and perspectives on technology, design, and digital business from the Shivansh Tech Lab team.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Insights & Innovation | Shivansh Tech Lab Blog',
    description: 'Thoughts, tutorials, and perspectives on technology, design, and digital business from the Shivansh Tech Lab team.',
    url: '/blog',
  },
};

export default function Page() {
  return <BlogPage />;
}
