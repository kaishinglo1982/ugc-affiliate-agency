import './globals.css';
import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'UGC Affiliate Agency — Performance UGC Content',
  description:
    'Scale your brand with performance-driven UGC content. Creator management, video production, affiliate campaigns — built on Carry OS.',
  openGraph: {
    title: 'UGC Affiliate Agency — Performance UGC Content',
    description:
      'Scale your brand with performance-driven UGC content. Creator management, video production, affiliate campaigns.',
    type: 'website',
  },
};

export const viewport = {
  themeColor: '#0a0a0f',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`bg-ink ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
