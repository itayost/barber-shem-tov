'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Instagram,
  Facebook,
  MessageCircle,
  Calendar,
} from 'lucide-react';
import LuxuryButton from '@/components/luxury/LuxuryButton';

// Simple label component
const ContactLabel: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => <p className={`text-xs uppercase tracking-[0.3em] text-gold ${className}`}>{children}</p>;

interface ContactMethod {
  icon: React.ElementType;
  label: string;
  value: string;
  href?: string;
  isExternal?: boolean;
}

const contactMethods: ContactMethod[] = [
  {
    icon: Phone,
    label: 'טלפון',
    value: '050-123-4567',
    href: 'tel:+972501234567',
  },
  {
    icon: Mail,
    label: 'אימייל',
    value: 'info@thefader.co.il',
    href: 'mailto:info@thefader.co.il',
  },
  {
    icon: MapPin,
    label: 'כתובת',
    value: 'רחוב הגפן 32, טירת כרמל',
  },
];

const businessHours = [
  { day: 'ראשון - חמישי', hours: '09:00 - 20:00' },
  { day: 'שישי', hours: '09:00 - 14:00' },
  { day: 'שבת', hours: 'סגור' },
];

const socialLinks = [
  {
    icon: Instagram,
    label: 'Instagram',
    href: 'https://instagram.com/thefaderacademy',
    username: '@thefaderacademy',
  },
  {
    icon: Facebook,
    label: 'Facebook',
    href: 'https://facebook.com/thefaderacademy',
    username: 'The Fader Academy',
  },
];

const ContactInfo: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
      {/* Left Column - Contact Details */}
      <div className="space-y-12">
        {/* Contact Methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <ContactLabel className="mb-8">דרכי יצירת קשר</ContactLabel>

          <div className="space-y-6">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              const content = (
                <>
                  <div className="w-12 h-12 border border-gold/30 flex items-center justify-center group-hover:border-gold group-hover:bg-gold group-hover:text-black transition-all duration-500">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-right">
                    <p className="text-xs uppercase tracking-wider text-gold mb-1">
                      {method.label}
                    </p>
                    <p className="text-lg font-light text-offwhite group-hover:text-gold transition-colors duration-300">
                      {method.value}
                    </p>
                  </div>
                </>
              );

              return (
                <motion.div
                  key={method.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  {method.href ? (
                    <a
                      href={method.href}
                      className="flex items-center gap-4 group"
                      target={method.isExternal ? '_blank' : undefined}
                      rel={method.isExternal ? 'noopener noreferrer' : undefined}
                    >
                      {content}
                    </a>
                  ) : (
                    <div className="flex items-center gap-4">{content}</div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Business Hours */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Clock className="w-5 h-5 text-gold" />
            <ContactLabel>שעות פעילות</ContactLabel>
          </div>

          <div className="space-y-3">
            {businessHours.map((schedule, index) => (
              <motion.div
                key={schedule.day}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="flex justify-between items-center py-3 border-b border-gold/10"
              >
                <span className="text-lightgrey">{schedule.day}</span>
                <span className="text-offwhite font-light">{schedule.hours}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <ContactLabel className="mb-6">עקבו אחרינו</ContactLabel>

          <div className="space-y-4">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 border border-gold/30 flex items-center justify-center group-hover:border-gold group-hover:bg-gold group-hover:text-black transition-all duration-500">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm text-offwhite group-hover:text-gold transition-colors duration-300">
                      {social.username}
                    </p>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Right Column - Quick Actions & Map */}
      <div className="space-y-8">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="border border-gold/20 p-8"
        >
          <h3 className="text-2xl font-light text-offwhite mb-6">פעולות מהירות</h3>

          <div className="space-y-4">
            <LuxuryButton
              variant="primary"
              fullWidth
              href="/apply"
              icon={<Calendar className="w-4 h-4" />}
            >
              הרשמה לקורס
            </LuxuryButton>

            <LuxuryButton
              variant="outline"
              fullWidth
              href="https://wa.me/972501234567"
              target="_blank"
              icon={<MessageCircle className="w-4 h-4" />}
            >
              שיחת ווטסאפ
            </LuxuryButton>

            <LuxuryButton
              variant="ghost"
              fullWidth
              href="tel:+972501234567"
              icon={<Phone className="w-4 h-4" />}
            >
              חייגו עכשיו
            </LuxuryButton>
          </div>
        </motion.div>

        {/* Visit Us Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center p-8 bg-charcoal"
        >
          <h4 className="text-xl font-light text-gold mb-4">בואו לבקר אותנו</h4>
          <p className="text-lightgrey mb-6">
            הכי טוב להכיר את האקדמיה שלנו מקרוב. קבעו פגישת היכרות וסיור באקדמיה.
          </p>
          <a
            href="https://maps.google.com/?q=רחוב+הגפן+32+טירת+כרמל"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold hover:text-gold-light transition-colors inline-flex items-center gap-2"
          >
            <span>נווטו אלינו</span>
            <span>←</span>
          </a>
        </motion.div>

        {/* Map Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative aspect-[4/3] overflow-hidden group cursor-pointer"
        >
          <div className="absolute inset-0 bg-charcoal flex items-center justify-center">
            <p className="text-lightgrey">מפה אינטראקטיבית</p>
          </div>
          <div className="absolute inset-0 border border-gold/20 group-hover:border-gold/40 transition-all duration-500" />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-500 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0 }}
              whileHover={{ scale: 1 }}
              className="bg-gold text-black px-6 py-3 text-sm uppercase tracking-wider"
            >
              פתח במפות
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactInfo;
