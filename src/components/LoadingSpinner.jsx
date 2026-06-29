export default function LoadingSpinner() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
      <div className="relative h-16 w-16">
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-keeper-green-pale border-t-keeper-green" />
      </div>
      <p className="text-lg font-medium text-keeper-green">Loading your friends...</p>
    </div>
  );
}

