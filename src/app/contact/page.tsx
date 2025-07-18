// src/app/contact/page.tsx
import React from 'react';
import { metadata as pageMetadata } from './metadata';
import ContactPageClient from './ContactPageClient';

// Export metadata for Next.js (this must be in a Server Component)
export const metadata = pageMetadata;

// Server Component wrapper
export default function ContactPage() {
  return <ContactPageClient />;
}