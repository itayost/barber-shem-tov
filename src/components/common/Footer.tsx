// File: src/components/common/Footer.tsx
import Link from 'next/link';
import { businessInfo } from '@/lib/data';

const Footer = () => {
  return (
    <footer className="bg-charcoal border-t border-lightgrey border-opacity-20 pt-16 pb-8" dir="rtl">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Contact Information */}
          <div>
            <h3 className="font-heebo text-h4 mb-4 text-gold">צור קשר</h3>
            <p className="mb-2">{businessInfo.address}</p>
            <p className="mb-4">
              <a 
                href={`tel:${businessInfo.phone}`} 
                className="text-gold hover:underline transition-all duration-200"
              >
                הזמן תור בטלפון
              </a>
            </p>
          </div>
          
          {/* Business Hours */}
          <div>
            <h3 className="font-heebo text-h4 mb-4 text-gold">שעות פעילות</h3>
            <ul>
              {businessInfo.hours.map((schedule, index) => (
                <li key={index} className="mb-2">
                  <span className="inline-block ml-2">{schedule.days}:</span>
                  <span>{schedule.hours}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Social & Book Now */}
          <div>
            <h3 className="font-heebo text-h4 mb-4 text-gold">עקבו אחרינו</h3>
            <p className="mb-4">להשראה וחדשות בנושא סטיילינג:</p>
            <div className="flex space-x-reverse space-x-4 mb-6">
              {businessInfo.social && (
                <>
                  {businessInfo.social.instagram && (
                    <a 
                      href={businessInfo.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-offwhite hover:text-gold transition-colors duration-200"
                    >
                      אינסטגרם
                    </a>
                  )}
                  {businessInfo.social.tiktok && (
                    <a 
                      href={businessInfo.social.tiktok}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-offwhite hover:text-gold transition-colors duration-200"
                    >
                      טיקטוק
                    </a>
                  )}
                </>
              )}
            </div>
            <Link
              href="/contact"
              className="inline-block px-6 py-3 bg-gold text-charcoal font-medium hover:bg-opacity-90 transition-colors duration-200 mt-4"
            >
              הזמן תור
            </Link>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="pt-8 border-t border-lightgrey border-opacity-10 text-small text-lightgrey text-opacity-70">
          <p>&copy; {new Date().getFullYear()} {businessInfo.name}. כל הזכויות שמורות.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;