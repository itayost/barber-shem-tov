// Quick debug script to test metadata export
import { metadata } from './src/app/metadata';
import { generatePageMetadata } from './src/components/SEO/generatePageMetadata';

console.log('Testing metadata generation...');

// Test the generatePageMetadata function
const testMetadata = generatePageMetadata({
  title: 'Test Title',
  description: 'Test Description',
  keywords: ['test', 'keywords'],
  canonical: 'https://thefader.co.il/test',
  pageName: 'test',
});

console.log('Generated metadata:', JSON.stringify(testMetadata, null, 2));
console.log('\nHome page metadata:', JSON.stringify(metadata, null, 2));