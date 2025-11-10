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
  description: 'Student technologist leading projects across robotics, education, and social impact. Co-Founder & CEO/CTO at StudyAP; Lead & CTO at LightAid; Software Lead at FRC 3256.',
  keywords: ['Grace Xu', 'Software Engineer', 'Full Stack Developer', 'Portfolio', 'React', 'Next.js', 'TypeScript', 'FRC 3256', 'DECA', 'StudyAP', 'LightAid', 'USACO'],
  authors: [{ name: 'Grace Xu' }],
  creator: 'Grace Xu',
  publisher: 'Grace Xu',
  metadataBase: new URL('https://gxu0904.github.io'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Grace Xu — Designing logic, systems, and stories',
    description: 'Student technologist leading projects across robotics, education, and social impact. Co-Founder & CEO/CTO at StudyAP; Lead & CTO at LightAid; Software Lead at FRC 3256.',
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
    description: 'Student technologist leading projects across robotics, education, and social impact. Co-Founder & CEO/CTO at StudyAP; Lead & CTO at LightAid; Software Lead at FRC 3256.',
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
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Grace Xu',
    jobTitle: 'Student technologist; Co-Founder & CEO/CTO, StudyAP; Lead & CTO, LightAid',
    email: 'gx0794@gmail.com',
    url: 'https://gxu0904.github.io',
    sameAs: [
      'https://github.com/gxu0904',
      'https://linkedin.com/in/grace-xu-',
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'San Jose',
      addressRegion: 'CA',
    },
  };

  const projectsSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: [
      {
        '@type': 'CreativeWork',
        name: 'StudyAP',
        description: 'AI-powered AP/SAT prep: 10K+ practice questions, analytics, and adaptive resources; Co-Founder & CEO/CTO.',
        url: 'https://studyap.org',
      },
      {
        '@type': 'CreativeWork',
        name: 'FRC 3256 Robotics Software',
        description: 'Autonomous control, vision, and data systems; team earned Engineering Inspiration & Creativity awards at regionals and Worlds.',
      },
      {
        '@type': 'CreativeWork',
        name: 'DECA Automation Suite',
        description: 'Event scheduler, score tabulator, and roommate matcher for a 200+ member chapter; reduced scheduling from 20 hours to 2 minutes.',
      },
      {
        '@type': 'CreativeWork',
        name: 'LightAid',
        description: '501(c)(3) nonprofit tech + ops: 750+ volunteers, 17K+ donations delivered; built automation and impact dashboards as Lead & CTO.',
        url: 'https://lightaid.net',
      },
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${playfair.variable} ${inter.variable} ${ibmPlexMono.variable} font-sans min-h-dvh bg-background text-foreground antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
