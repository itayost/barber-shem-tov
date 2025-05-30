// src/app/academy/page.tsx - Interactive & Engaging Academy Page
import AcademyHeroInteractive from '@/components/academy/AcademyHeroInteractive';
import AcademyTabsSection from '@/components/academy/AcademyTabsSection';
import AcademyQuickActions from '@/components/academy/AcademyQuickActions';
import WhatsAppFloat from '@/components/common/WhatsAppFloat';

export default function AcademyPage() {
  return (
    <>
      {/* 1. Interactive Hero with Live Stats */}
      <AcademyHeroInteractive />
      
      {/* 2. Tabbed Content - Story, Results, Team */}
      <AcademyTabsSection />
      
      {/* 3. Quick Actions - Multiple ways to engage */}
      <AcademyQuickActions />
      
      {/* WhatsApp floating button */}
      <WhatsAppFloat />
    </>
  );
}