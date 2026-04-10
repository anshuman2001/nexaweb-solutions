import type { ReactNode } from 'react';

/**
 * EduAccess AI uses its own full-screen split layout.
 * This layout intentionally omits the main site Navbar and Footer
 * so they don't overlap the product's built-in header.
 */
export default function EduAccessLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
