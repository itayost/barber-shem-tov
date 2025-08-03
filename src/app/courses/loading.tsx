import LoadingLogo from '@/components/common/LoadingLogo';

export default function CoursesLoading() {
  return (
    <div className="min-h-screen bg-charcoal flex items-center justify-center">
      <div className="text-center">
        <LoadingLogo size="medium" showText={false} />
        <p className="mt-4 text-lightgrey">טוען קורסים...</p>
      </div>
    </div>
  );
}