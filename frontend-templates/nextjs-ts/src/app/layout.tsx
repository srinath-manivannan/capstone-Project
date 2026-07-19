/**
 * ============================================
 * 📄 WHAT : The ROOT LAYOUT — Next.js's equivalent of index.html + main.tsx.
 * 🎯 WHY  : Wraps every page: the <html>/<body> shell, global styles, and
 *           (in bigger apps) providers. File-based routing starts here.
 * 🔁 FLOW : any URL ➜ THIS FILE ➜ the matching page.tsx under app/
 * ============================================
 */
import type { Metadata } from 'next';
import './globals.scss';

// Next.js reads this for the <head> — per-page metadata beats SPA <title> hacks.
export const metadata: Metadata = {
  title: 'Next.js + TS Template',
  description: 'A clean reference template — App Router, server + client components',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
