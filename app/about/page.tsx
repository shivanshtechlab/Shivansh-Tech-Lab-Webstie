import type { Metadata } from 'next';
import AboutPage from '../../page-components/AboutPage/AboutPage';

const SITE_URL = 'https://shivanshtechlabs.com';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'We are Shivansh Tech Lab, founded by Mukesh Tieary — a team of passionate builders, designers, and strategists on a mission to create digital experiences that define tomorrow.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Shivansh Tech Lab',
    description: 'We are Shivansh Tech Lab, founded by Mukesh Tieary — a team of passionate builders, designers, and strategists on a mission to create digital experiences that define tomorrow.',
    url: '/about',
  },
};

const founderJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${SITE_URL}/about#founder`,
  name: 'Mukesh Tieary',
  jobTitle: 'Founder',
  description: 'Founder of Shivansh Tech Lab. Full-stack and mobile app developer (Android & iOS) with hands-on DevOps expertise.',
  image: `${SITE_URL}/founder.jpg`,
  url: `${SITE_URL}/about`,
  worksFor: {
    '@type': 'Organization',
    name: 'Shivansh Tech Lab',
    url: SITE_URL,
  },
  knowsAbout: ['Full-Stack Development', 'Mobile App Development', 'Android Development', 'iOS Development', 'DevOps'],
};

const aboutPageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  url: `${SITE_URL}/about`,
  name: 'About Shivansh Tech Lab',
  mainEntity: { '@id': `${SITE_URL}/about#founder` },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(founderJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageJsonLd) }}
      />
      <AboutPage />
    </>
  );
}
