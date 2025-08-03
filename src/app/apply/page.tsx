// src/app/apply/page.tsx
import React from 'react';
import { metadata as pageMetadata } from './metadata';
import ApplyPageClient from './ApplyPageClient';

// Export metadata for Next.js (this must be in a Server Component)
export const metadata = pageMetadata;

// Server Component wrapper
export default function ApplyPage() {
  return <ApplyPageClient />;
}