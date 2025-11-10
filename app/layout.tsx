import './globals.css';
import { Playfair_Display, Inter, IBM_Plex_Mono } from 'next/font/google';
import type { Metadata } from 'next';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  weight: ['400', '600', '700', '900'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500', '600'],
});

export const metadata: Metadata = {
  title: 'Grace Xu',
  description: 'Engineer. Researcher. Builder. Exploring the intersection of technology, design, and meaningful impact.',
  keywords: ['Grace Xu', 'Software Engineer', 'Full Stack Developer', 'Portfolio', 'React', 'Next.js', 'TypeScript'],
  authors: [{ name: 'Grace Xu' }],
  creator: 'Grace Xu',
  publisher: 'Grace Xu',
  metadataBase: new URL('https://gxu0904.github.io'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Grace Xu — Designing logic, systems, and stories',
    description: 'Engineer. Researcher. Builder. Exploring the intersection of technology, design, and meaningful impact.',
    url: 'https://gxu0904.github.io',
    siteName: 'Grace Xu Portfolio',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Grace Xu Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Grace Xu — Designing logic, systems, and stories',
    description: 'Engineer. Researcher. Builder. Exploring the intersection of technology, design, and meaningful impact.',
    creator: '@gracexu',
    images: ['/og-image.png'],
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
    google: 'your-google-verification-code', // TODO: Add verification code
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${playfair.variable} ${inter.variable} ${ibmPlexMono.variable} font-sans min-h-dvh bg-background text-foreground antialiased`}>
        {children}
      </body>
    </html>
  );
}


