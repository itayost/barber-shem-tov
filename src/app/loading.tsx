// src/app/loading.tsx
import LoadingLogo from '@/components/common/LoadingLogo';

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-charcoal z-50 flex items-center justify-center">
      <LoadingLogo size="large" showText={true} />
    </div>
  );
}