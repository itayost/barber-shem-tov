// File: src/components/about/TeamSection.tsx
import React from 'react';
import TeamMemberCard from './TeamMemberCard';

interface TeamMember {
  id: string;
  name: string;
  title: string;
  bio: string;
  image?: string;
}

interface TeamSectionProps {
  teamMembers: TeamMember[];
}

const TeamSection: React.FC<TeamSectionProps> = ({ teamMembers }) => {
  return (
    <section className="py-section-mobile md:py-section bg-charcoal" dir="rtl">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-heebo text-h3 mb-6">הצוות שלנו</h2>
          <p className="max-w-2xl mx-auto text-lightgrey">
            הצוות שלנו מאגד אנשי מקצוע מנוסים המאוחדים בתשוקה לדיוק ושירות.
            כל ספר נבחר בקפידה בזכות המצוינות הטכנית, תשומת הלב לפרטים, 
            והמחויבות למלאכה.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;