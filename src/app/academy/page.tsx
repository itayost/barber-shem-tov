// File: src/app/academy/page.tsx
'use client';

import AcademyPageHeader from '@/components/academy/AcademyPageHeader';
import CoursesList from '@/components/academy/CoursesList';
import InstructorsSection from '@/components/academy/InstructorsSection';
import AcademyFAQ from '@/components/academy/AcademyFAQ';
import AcademyCtaSection from '@/components/academy/AcademyCtaSection';
import { services, teamMembers } from '@/lib/data';

export default function AcademyPage() {
  // Filter only academy courses
  const academyCourses = services.filter(service => service.category === 'academy');
  
  // Filter team members who are instructors (mentioned in bio or title)
  const instructors = teamMembers.filter(
    member => member.title.includes('מדריך') || member.bio.includes('מדריך') || member.bio.includes('אקדמיה')
  );

  return (
    <>
      <AcademyPageHeader />
      
      <CoursesList courses={academyCourses} />
      
      <InstructorsSection instructors={instructors} />
      
      <AcademyFAQ />
      
      <AcademyCtaSection />
    </>
  );
}