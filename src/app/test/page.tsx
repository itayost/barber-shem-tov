// src/app/test/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Test Page - Metadata Working',
  description: 'This is a test page to verify metadata is working correctly',
};

export default function TestPage() {
  return (
    <div className="min-h-screen bg-charcoal text-offwhite p-8">
      <h1 className="text-4xl font-bold mb-4">Test Page</h1>
      <p>This page is created to test if metadata is working.</p>
      <p className="mt-4">Check the page source or browser tab to see if the title shows: "Test Page - Metadata Working"</p>
    </div>
  );
}