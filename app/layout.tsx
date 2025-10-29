import './globals.css';
import { Inter, Poppins } from 'next/font/google';
import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const poppins = Poppins({ subsets: ['latin'], weight: ['500','600','700'], variable: '--font-poppins' });

export const metadata: Metadata = {
  title: 'Grace Xu — builder at the intersection of tech and impact',
  description: 'Engineer | Entrepreneur | Community Builder',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} min-h-dvh bg-background text-foreground antialiased`}>
        {children}
      </body>
    </html>
  );
}


