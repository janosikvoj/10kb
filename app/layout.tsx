import type { Metadata } from 'next';
import './globals.css';
import { Fira_Code } from 'next/font/google';
import Header from '@/components/navigation/Header';
import Footer from '@/components/navigation/Footer';
import LandingPageNav from '@/components/navigation/LandingPageNav';
import About from '@/components/sections/About';
import Projects from '@/components/sections/Projects';
import ScrollToTopButton from '@/components/navigation/ScrollToTopButton';

export const metadata: Metadata = {
  title: '10kb webs',
  description: 'Databáze webů vytvořených Ateliérem Digitální design.',
};

const firaCode = Fira_Code({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fira-code',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${firaCode.variable} antialiased overflow-x-hidden bg-black text-white`}
    >
      <body className="relative overflow-x-hidden">
        <div id="top" className="h-0 hidden" />
        <Header />
        <div className="fixed bottom-0 right-0 m-8 z-50">
          <ScrollToTopButton />
        </div>
        <LandingPageNav left={<About />} right={<Projects />}>
          {children}
        </LandingPageNav>
        <Footer />
      </body>
    </html>
  );
}
