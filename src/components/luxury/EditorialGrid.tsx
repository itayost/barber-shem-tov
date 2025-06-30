import React from 'react';
import { motion } from 'framer-motion';

interface EditorialGridProps {
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4 | 6 | 12;
  gap?: 'none' | 'tight' | 'small' | 'default' | 'large' | 'xl';
  className?: string;
  animate?: boolean;
  stagger?: boolean;
  mobileColumns?: 1 | 2;
  tabletColumns?: 2 | 3 | 4;
  variant?: 'default' | 'masonry' | 'asymmetric';
}

const EditorialGrid: React.FC<EditorialGridProps> = ({
  children,
  columns = 3,
  gap = 'default',
  className = '',
  animate = true,
  stagger = true,
  mobileColumns = 1,
  tabletColumns = 2,
  variant = 'default',
}) => {
  const gapSizes = {
    none: 'gap-0',
    tight: 'gap-px',
    small: 'gap-4',
    default: 'gap-6 md:gap-8',
    large: 'gap-8 md:gap-12',
    xl: 'gap-12 md:gap-16',
  };

  const columnClasses = {
    1: 'lg:grid-cols-1',
    2: 'lg:grid-cols-2',
    3: 'lg:grid-cols-3',
    4: 'lg:grid-cols-4',
    6: 'lg:grid-cols-6',
    12: 'lg:grid-cols-12',
  };

  const mobileColumnClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
  };

  const tabletColumnClasses = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
  };

  // For asymmetric layouts
  const asymmetricClasses = variant === 'asymmetric' ? 'auto-rows-auto' : '';

  const gridClasses = `
    grid
    ${mobileColumnClasses[mobileColumns]}
    ${tabletColumnClasses[tabletColumns]}
    ${columnClasses[columns]}
    ${gapSizes[gap]}
    ${asymmetricClasses}
    ${className}
  `;

  const items = React.Children.toArray(children);

  if (!animate) {
    return (
      <div className={gridClasses} dir="rtl">
        {children}
      </div>
    );
  }

  return (
    <div className={gridClasses} dir="rtl">
      {items.map((child, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{
            duration: 0.8,
            delay: stagger ? index * 0.1 : 0,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
};

// Specialized Masonry Grid Component
export const MasonryGrid: React.FC<EditorialGridProps> = ({
  children,
  gap = 'default',
  className = '',
  animate = true,
}) => {
  const gapSizes = {
    none: '0',
    tight: '1px',
    small: '1rem',
    default: '1.5rem',
    large: '2rem',
    xl: '3rem',
  };

  const items = React.Children.toArray(children);

  return (
    <div
      className={`columns-1 md:columns-2 lg:columns-3 ${className}`}
      style={{ columnGap: gapSizes[gap] }}
      dir="rtl"
    >
      {items.map((child, index) => (
        <motion.div
          key={index}
          className="break-inside-avoid"
          style={{ marginBottom: gapSizes[gap] }}
          initial={animate ? { opacity: 0, y: 30 } : {}}
          whileInView={animate ? { opacity: 1, y: 0 } : {}}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: index * 0.05,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
};

// Demo component showcasing grid variations
const EditorialGridDemo = () => {
  // Sample card component for demo
  const DemoCard = ({ height = 'h-64' }: { height?: string }) => (
    <div className={`${height} bg-charcoal border border-gold/20 flex items-center justify-center`}>
      <span className="text-gold text-sm tracking-wider uppercase">תוכן</span>
    </div>
  );

  return (
    <div className="bg-black py-16 space-y-16" dir="rtl">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Default Grid */}
        <div className="mb-16">
          <h3 className="text-2xl text-offwhite font-thin mb-8">רשת רגילה - 3 עמודות</h3>
          <EditorialGrid columns={3} gap="default">
            <DemoCard />
            <DemoCard />
            <DemoCard />
            <DemoCard />
            <DemoCard />
            <DemoCard />
          </EditorialGrid>
        </div>

        {/* Masonry Grid */}
        <div className="mb-16">
          <h3 className="text-2xl text-offwhite font-thin mb-8">רשת מייסונרי</h3>
          <MasonryGrid gap="default">
            <DemoCard height="h-48" />
            <DemoCard height="h-64" />
            <DemoCard height="h-52" />
            <DemoCard height="h-72" />
            <DemoCard height="h-56" />
            <DemoCard height="h-60" />
          </MasonryGrid>
        </div>

        {/* Different Gap Sizes */}
        <div className="mb-16">
          <h3 className="text-2xl text-offwhite font-thin mb-8">גדלי רווחים שונים</h3>
          <div className="space-y-8">
            <EditorialGrid columns={4} gap="tight">
              <DemoCard height="h-32" />
              <DemoCard height="h-32" />
              <DemoCard height="h-32" />
              <DemoCard height="h-32" />
            </EditorialGrid>

            <EditorialGrid columns={4} gap="large">
              <DemoCard height="h-32" />
              <DemoCard height="h-32" />
              <DemoCard height="h-32" />
              <DemoCard height="h-32" />
            </EditorialGrid>
          </div>
        </div>

        {/* Responsive Columns */}
        <div>
          <h3 className="text-2xl text-offwhite font-thin mb-8">עמודות רספונסיביות</h3>
          <EditorialGrid columns={4} mobileColumns={1} tabletColumns={2} gap="default">
            <DemoCard />
            <DemoCard />
            <DemoCard />
            <DemoCard />
          </EditorialGrid>
        </div>
      </div>
    </div>
  );
};

export default EditorialGrid;
