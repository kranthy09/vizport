import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';

const geist = Geist({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'VizPort',
  description: 'High-performance diagram & image explorer with smooth pan/zoom',
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={geist.className}>
      <body className="antialiased" style={{ backgroundColor: '#08080f', color: '#e2e8f0' }}>
        {children}
      </body>
    </html>
  );
}
