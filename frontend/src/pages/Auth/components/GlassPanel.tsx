/**
 * ============================================
 * 📄 WHAT : The frosted-glass card that wraps each auth form.
 * 🎯 WHY  : Reusable presentational component — it renders whatever children
 *           it's given and knows nothing about forms or Redux.
 * 🔁 FLOW : AuthPage.tsx ➜ THIS FILE (wraps the active form)
 * ============================================
 */
import type { ReactNode } from 'react';
import './GlassPanel.scss';

interface Props {
  children: ReactNode;
}

export default function GlassPanel({ children }: Props) {
  return <div className="glass-panel">{children}</div>;
}
