// src/components/luxury/index.ts
// Central export file for all luxury components

// Default exports
export { default as LuxurySection } from './LuxurySection';
export { default as LuxuryButton } from './LuxuryButton';
export { default as EditorialCard } from './EditorialCard';
export { default as EditorialGrid, MasonryGrid } from './EditorialGrid';
export { default as LuxuryCourseCard } from './LuxuryCourseCard';

// Named exports from Typography
export { LuxuryHeading, LuxuryLabel, LuxuryParagraph, VerticalText } from './Typography';

// Also export the default if Typography.tsx has one
export { default as TypographyDemo } from './Typography';

// Re-export types if needed
//export type { LuxurySectionProps } from './LuxurySection';
//export type { LuxuryButtonProps } from './LuxuryButton';
//export type { EditorialCardProps } from './EditorialCard';
//export type { EditorialGridProps } from './EditorialGrid';
