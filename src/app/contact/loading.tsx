// src/app/contact/loading.tsx
import LoadingLogo from '@/components/common/LoadingLogo';

export default function ContactLoading() {
  return (
    <div className="min-h-screen bg-charcoal flex items-center justify-center">
      <div className="text-center">
        <LoadingLogo size="medium" showText={false} />
        <p className="mt-4 text-lightgrey">טוען פרטי יצירת קשר...</p>
      </div>
    </div>
  );
}