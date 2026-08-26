import type { Metadata } from 'next';
import Providers from './Providers';
import ClientShell from './ClientShell';
import '../styles/variables.css';
import '../styles/global.css';
import '../styles/animations.css';
import '../styles/theme-light.css';
import '../styles/index.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'Shivansh Tech Lab – We Build Digital Experiences That Define Tomorrow',
  description: 'Shivansh Tech Lab is a full-service digital agency offering web development, mobile apps, ERP/CRM, SaaS platforms, AI solutions, and cloud services.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body suppressHydrationWarning>
        <Providers>
          <ClientShell>
            {children}
          </ClientShell>
        </Providers>
      </body>
    </html>
  );
}
