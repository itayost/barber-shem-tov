import React from 'react';
import Button from '@/components/common/Button';

interface Pathway {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  href?: string;
  price?: number;
  duration?: string;
  duration_he?: string;
  category?: string;
}

interface PathwayCardProps {
  pathway: Pathway;
}

const PathwayCard: React.FC<PathwayCardProps> = ({ pathway }) => {
  const { title, description, icon, href, price, duration_he, category } = pathway;

  return (
    <div className="bg-gradient-to-br from-charcoal to-[#1a1a1a] border border-gold/30 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 p-8 flex flex-col text-right group max-w-sm w-full mx-auto text-lightgrey">
      <div className="text-4xl mb-3 text-gold">{icon}</div>
      <h3 className="text-2xl font-bold text-gold mb-1">{title}</h3>
      <p className="text-sm mb-4">{description}</p>
      
      {duration_he && (
        <p className="text-sm mb-1">
          <span className="font-semibold text-gold">משך:</span> {duration_he}
        </p>
      )}
      {price !== undefined && (
        <p className="text-sm mb-1">
          <span className="font-semibold text-gold">מחיר:</span> ₪{price.toLocaleString()}
        </p>
      )}
      <p className="text-sm mb-1 text-muted">אפשרות לתשלומים</p>
      <p className="text-sm mb-1 text-muted">📅 מחזור הבא: 15 בינואר</p>
      <p className="text-sm mb-3 text-gold font-semibold">📅 יש למהר!</p>

      <ul className="list-disc text-sm leading-relaxed pl-5 mb-4 text-lightgrey/90">
        <li>למידה מהבסיס ללא ניסיון קודם</li>
        <li>עבודה עם 20+ לקוחות אמיתיים</li>
        <li>ערכת כלים מקצועית כלולה</li>
        <li>תעודת הסמכה מוכרת</li>
        <li>ליווי בחיפוש עבודה</li>
        <li>גישה לקהילת בוגרים</li>
      </ul>

      <p className="text-sm text-muted mb-1">
        <span className="font-semibold text-gold">מדריך הקורס:</span> בר שם טוב
      </p>
      <p className="text-sm text-muted mb-4">
        <span className="font-semibold text-gold">דרישות קדם:</span> אין צורך בניסיון קודם
      </p>

      {href && (
        <Button href={href} variant="primary" size="medium">
          לפרטי הקורס
        </Button>
      )}
    </div>
  );
};

export default PathwayCard;