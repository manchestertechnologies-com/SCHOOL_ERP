import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import 'katex/dist/katex.min.css';
import './globals.css';
import { CurriculumProvider } from '@/lib/curriculumContext';
import { AppLayout } from '@/components/layout/AppLayout';
import { OnboardingModal } from '@/components/onboarding/OnboardingModal';
import { SearchModal } from '@/components/search/SearchModal';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: 'Bridge Learn — Free Curriculum-Aware Learning Platform',
  description: 'Serious, lightweight educational platform for Classes 9–12 supporting CBSE, ICSE, Karnataka State Board & PYQ mock tests.',
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  themeColor: '#0f172a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark bg-mt-bg text-mt-text antialiased selection:bg-mt-gold/35 selection:text-white">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${inter.className} min-h-screen bg-mt-bg text-mt-text antialiased`}>
        <CurriculumProvider>
          <AppLayout>
            {children}
          </AppLayout>
          <OnboardingModal />
          <SearchModal />
        </CurriculumProvider>
      </body>
    </html>
  );
}
