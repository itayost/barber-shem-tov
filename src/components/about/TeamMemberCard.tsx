// File: src/components/about/TeamMemberCard.tsx
import React from 'react';
import Button from '@/components/common/Button';

interface TeamMember {
  id: string;
  name: string;
  title: string;
  bio: string;
  image?: string;
}

interface TeamMemberCardProps {
  member: TeamMember;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member }) => {
  return (
    <div className="bg-charcoal border border-lightgrey border-opacity-10 p-6" dir="rtl">
      {/* Member image */}
      {member.image ? (
        <img 
          src={member.image} 
          alt={`${member.name} - ${member.title}`}
          className="aspect-[4/5] w-full object-cover mb-6" 
        />
      ) : (
        <div className="aspect-[4/5] bg-brown bg-opacity-20 mb-6 flex items-center justify-center">
          <p className="text-lightgrey">{member.name} Photo</p>
        </div>
      )}
      
      <h3 className="font-playfair text-h4 mb-2">{member.name}</h3>
      <p className="text-gold mb-4">{member.title}</p>
      <p className="text-lightgrey mb-6">{member.bio}</p>
      
      <Button 
        href={`/contact?barber=${encodeURIComponent(member.name)}`} 
        variant="tertiary"
      >
        הזמן תור עם {member.name.split(' ')[0]}
      </Button>
    </div>
  );
};

export default TeamMemberCard;