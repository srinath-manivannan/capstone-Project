/**
 * ============================================
 * 📄 WHAT : The home page — app/page.tsx answers the URL "/".
 * 🎯 WHY  : FILE-BASED ROUTING: no route table. A folder = a URL segment,
 *           its page.tsx = the page. app/todos/page.tsx ⇒ "/todos".
 * 🔁 FLOW : "/" ➜ layout.tsx ➜ THIS FILE
 * ============================================
 */
import Link from 'next/link';

export default function HomePage() {
  return (
    <main style={{ maxWidth: 560, margin: '0 auto', padding: '48px 16px' }}>
      <h1>Next.js + TS Template</h1>
      <p>
        This template shows the two halves of Next.js working together: a{' '}
        <strong>server component</strong> fetches data before the page reaches the browser, and a{' '}
        <strong>client component</strong> handles all interactivity.
      </p>
      {/* <Link> = client-side navigation (no full page reload) */}
      <Link href="/todos">Open the Todos example →</Link>
    </main>
  );
}
