'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Phone, Mail, MapPin } from 'lucide-react';
import { LuxuryButton, LuxuryHeading, LuxuryLabel } from '@/components/luxury';

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const footerSections: FooterSection[] = [
  {
    title: 'האקדמיה',
    links: [
      { label: 'אודות', href: '/about' },
      { label: 'הצוות שלנו', href: '/academy#staff' },
      { label: 'החזון שלנו', href: '/academy#vision' },
      { label: 'הישגים', href: '/academy#achievements' },
    ],
  },
  {
    title: 'קורסים',
    links: [
      { label: 'קורס בסיסי', href: '/courses/basic' },
      { label: 'קורס מתקדם', href: '/courses/advanced' },
      { label: 'השתלמויות', href: '/courses/workshops' },
      { label: 'תעודות', href: '/courses#certificates' },
    ],
  },
  {
    title: 'מידע',
    links: [
      { label: 'תנאי שימוש', href: '/terms' },
      { label: 'מדיניות פרטיות', href: '/privacy' },
      { label: 'שאלות נפוצות', href: '/faq' },
      { label: 'צור קשר', href: '/contact' },
    ],
  },
];

const socialLinks = [
  { icon: Instagram, href: 'https://instagram.com/thefader', label: 'Instagram' },
  { icon: Facebook, href: 'https://facebook.com/thefader', label: 'Facebook' },
];

const LuxuryFooter: React.FC = () => {
  return (
    <footer className="bg-charcoal-dark border-t border-gold/10" dir="rtl">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand Column */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Link href="/" className="inline-block mb-6">
              <span className="text-3xl font-thin text-offwhite tracking-wider">
                THE <span className="text-gold">FADER</span>
              </span>
            </Link>

            <p className="text-lightgrey font-light mb-8 max-w-sm">
              האקדמיה המובילה לספרות מקצועית בצפון. מאז 2018, אנו מכשירים את הדור הבא של אמני
              הספרות.
            </p>

            {/* Contact Info */}
            <div className="space-y-4 mb-8">
              <a
                href="tel:+972501234567"
                className="flex items-center gap-3 text-lightgrey hover:text-gold transition-colors duration-300"
              >
                <Phone className="w-4 h-4" />
                <span className="font-light">050-123-4567</span>
              </a>

              <a
                href="mailto:info@thefader.co.il"
                className="flex items-center gap-3 text-lightgrey hover:text-gold transition-colors duration-300"
              >
                <Mail className="w-4 h-4" />
                <span className="font-light">info@thefader.co.il</span>
              </a>

              <div className="flex items-start gap-3 text-lightgrey">
                <MapPin className="w-4 h-4 mt-1" />
                <span className="font-light">
                  רחוב הגפן 32
                  <br />
                  טירת כרמל
                </span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-8">
              <LuxuryLabel size="xs">הירשמו לניוזלטר</LuxuryLabel>
              <div className="mt-4 flex gap-2">
                <input
                  type="email"
                  placeholder="כתובת אימייל"
                  className="
                    flex-1 bg-transparent border border-gold/20
                    px-4 py-3 text-sm font-light text-offwhite
                    placeholder:text-darkgrey
                    focus:border-gold/50 focus:outline-none
                    transition-colors duration-300
                  "
                />
                <LuxuryButton variant="outline" size="small">
                  הרשמה
                </LuxuryButton>
              </div>
            </div>
          </motion.div>

          {/* Links Columns */}
          {footerSections.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 * (sectionIndex + 1) }}
            >
              <h3 className="text-sm font-light uppercase tracking-[0.2em] text-gold mb-6">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map(link => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="
                        text-lightgrey hover:text-offwhite font-light
                        transition-colors duration-300
                        inline-block relative group
                      "
                    >
                      {link.label}
                      <span
                        className="
                        absolute bottom-0 left-0 right-0 h-px
                        bg-gold transform scale-x-0 group-hover:scale-x-100
                        transition-transform duration-500 origin-right
                      "
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gold/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Copyright */}
            <motion.p
              className="text-xs font-light text-darkgrey tracking-wider order-2 md:order-1"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              © 2024 THE FADER ACADEMY. כל הזכויות שמורות.
            </motion.p>

            {/* Social Links */}
            <motion.div
              className="flex items-center gap-6 order-1 md:order-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {socialLinks.map(social => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="
                      w-10 h-10 border border-gold/20
                      flex items-center justify-center
                      hover:border-gold hover:bg-gold hover:text-black
                      transition-all duration-500
                      group
                    "
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LuxuryFooter;
