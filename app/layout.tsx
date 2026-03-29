import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';

const geist = Geist({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'VizPort',
  description: 'A minimalist viewer for PNG, SVG, Mermaid diagrams, and Markdown',
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={geist.className}>
      <body className="bg-zinc-950 text-zinc-100">
        {children}
      </body>
    </html>
  );
}
