import type { Metadata } from 'next';
import Providers from './Providers';
import ClientShell from './ClientShell';
import '../styles/variables.css';
import '../styles/global.css';
import '../styles/animations.css';
import '../styles/theme-light.css';
import '../styles/index.css';
import './globals.css';

const SITE_URL = 'https://shivanshtechlab.com';
const SITE_NAME = 'Shivansh Tech Lab';
const DEFAULT_TITLE = 'Shivansh Tech Lab – We Build Digital Experiences That Define Tomorrow';
const DEFAULT_DESCRIPTION = 'Shivansh Tech Lab is a full-service digital agency offering web development, mobile apps, ERP/CRM, SaaS platforms, AI solutions, and cloud services.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: '%s | Shivansh Tech Lab',
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    'Shivansh Tech Lab',
    'web development company',
    'custom software development agency',
    'mobile app development company',
    'ERP software development',
    'CRM software development',
    'SaaS development company',
    'AI development services',
    'cloud services company',
    'website design and development',
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  alternateName: 'ST',
  url: SITE_URL,
  logo: `${SITE_URL}/icon.png`,
  image: `${SITE_URL}/opengraph-image.png`,
  description: DEFAULT_DESCRIPTION,
  email: 'hello@shivanshtechlab.com',
  telephone: '+91-79917-18363',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '34/1 Ravi Sudha Apartment, Near Post Office, Dum Dum',
    addressLocality: 'Kolkata',
    addressRegion: 'West Bengal',
    postalCode: '700030',
    addressCountry: 'IN',
  },
  sameAs: [
    'https://www.facebook.com/profile.php?id=61592396873683',
    'https://www.instagram.com/shivansh_tech_lab/?hl=en',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-79917-18363',
    contactType: 'customer service',
    email: 'hello@shivanshtechlab.com',
    areaServed: 'Worldwide',
    availableLanguage: ['English', 'Hindi'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Providers>
          <ClientShell>
            {children}
          </ClientShell>
        </Providers>
      </body>
    </html>
  );
}
