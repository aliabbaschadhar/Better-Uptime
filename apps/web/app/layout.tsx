import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NODE_ENV === 'production'
    ? 'https://better-uptime.com'
    : 'http://localhost:3002'),
  title: 'Better-Uptime | Always Up. Globally.',
  description: 'Real-time website monitoring from every corner of the world. Track uptime performance with clean, simple graphs and instant alerts.',
  keywords: 'website monitoring, uptime monitoring, global monitoring, real-time monitoring, website performance',
  authors: [{ name: 'Better-Uptime' }],
  openGraph: {
    title: 'Better-Uptime | Always Up. Globally.',
    description: 'Real-time website monitoring from every corner of the world.',
    url: 'https://better-uptime.com',
    siteName: 'Better-Uptime',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Better-Uptime - Global Website Monitoring',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Better-Uptime | Always Up. Globally.',
    description: 'Real-time website monitoring from every corner of the world.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'verification-token',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased bg-background text-white selection:bg-primary selection:text-white`}>
        {children}
      </body>
    </html>
  );
}