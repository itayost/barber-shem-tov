import { Service } from '@/lib/data';
import Link from 'next/link';

type ServiceCardProps = {
  service: Service;
  showDetails?: boolean;
};

const ServiceCard = ({ service, showDetails = false }: ServiceCardProps) => {
  const { id, name, name_he, description, description_he, price, duration, duration_he, category, featured } = service;
  
  // Smart text truncation that doesn't cut words in the middle
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    
    // Find the last space before maxLength
    const lastSpace = text.substring(0, maxLength).lastIndexOf(' ');
    return text.substring(0, lastSpace > 0 ? lastSpace : maxLength) + '...';
  };
  
  const displayDescription = showDetails ? description_he : truncateText(description_he, 100);
  
  // Category translation map
  const categoryTranslations: Record<string, string> = {
    'haircut': 'תספורות',
    'beard': 'זקן',
    'shave': 'גילוח',
    'package': 'חבילות',
    'special': 'שירותים מיוחדים',
    'color': 'צבע'
  };
  
  return (
    <div 
      className={`bg-charcoal border border-lightgrey border-opacity-10 hover:border-gold hover:border-opacity-30 transition-all duration-300 p-6 group ${featured ? 'relative' : ''}`}
      dir="rtl"
    >
      {/* Featured badge */}
      {featured && (
        <div className="absolute -top-3 -right-3 bg-gold text-charcoal text-xs py-1 px-3 font-medium">
          מומלץ
        </div>
      )}
      
      {/* Service category tag */}
      <div className="mb-4">
        <span className="inline-block text-small tracking-wider text-lightgrey">
          {categoryTranslations[category] || category}
        </span>
      </div>
      
      {/* Service name */}
      <h3 className="font-heebo text-h4 mb-3 group-hover:text-gold transition-colors duration-200">
        {name_he}
      </h3>
      
      {/* Description */}
      <p className="text-lightgrey mb-6 min-h-[80px]">
        {displayDescription}
      </p>
      
      {/* Price and duration */}
      <div className="flex items-center justify-between pt-4 border-t border-lightgrey border-opacity-20">
        <span className="font-heebo text-gold text-h4">{price}₪</span>
        <span className="text-lightgrey text-small">{duration_he}</span>
      </div>
      
      {/* Book link - with improved animation */}
      <div className="mt-4 text-left">
        <Link 
          href={`/contact?service=${encodeURIComponent(name_he)}`}
          className="text-gold text-small group-hover:underline transition-all duration-200 inline-flex items-center"
        >
          <span className="ml-2 relative">
            הזמן שירות זה
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold group-hover:w-full transition-all duration-300"></span>
          </span>
          <svg 
            className="w-4 h-4 transform rotate-180 group-hover:translate-x-1 transition-transform duration-300" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;