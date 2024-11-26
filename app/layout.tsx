import type { Metadata } from 'next';
import './globals.css';
import { Fira_Code } from 'next/font/google';
import Header from '@/components/navigation/Header';
import Footer from '@/components/navigation/Footer';

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
        {children}
        <Footer />
      </body>
    </html>
  );
}
