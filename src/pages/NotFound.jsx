import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center bg-page-bg px-4 text-center">
      <h1 className="text-8xl font-bold text-keeper-green">404</h1>
      <h2 className="mt-4 text-2xl font-semibold text-gray-900">Page Not Found</h2>
      <p className="mt-2 max-w-md text-gray-500">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-6 rounded-lg bg-keeper-green px-6 py-3 font-semibold text-white transition-colors hover:bg-keeper-green-light"
      >
        Back to Home
      </Link>
    </div>
  );
}
