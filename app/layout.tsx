import './globals.css';
import { JetBrains_Mono } from 'next/font/google';
import type { Metadata } from 'next';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Grace Xu — Engineer • Builder • Operator',
  description: 'Software engineer passionate about building products that create meaningful impact. Explore my projects and experience through an interactive terminal interface.',
  keywords: ['Grace Xu', 'Software Engineer', 'Full Stack Developer', 'Portfolio', 'React', 'Next.js', 'TypeScript'],
  authors: [{ name: 'Grace Xu' }],
  creator: 'Grace Xu',
  publisher: 'Grace Xu',
  metadataBase: new URL('https://gxu0904.github.io'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Grace Xu — Engineer • Builder • Operator',
    description: 'Software engineer passionate about building products that create meaningful impact. Explore my projects through an interactive terminal.',
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
    title: 'Grace Xu — Engineer • Builder • Operator',
    description: 'Software engineer passionate about building products that create meaningful impact.',
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
      <body className={`${jetbrainsMono.variable} font-mono min-h-dvh bg-background text-foreground antialiased`}>
        {children}
      </body>
    </html>
  );
}


