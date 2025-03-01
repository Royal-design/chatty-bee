import { Link } from "react-router-dom";

export const ErrorPage = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold text-red-500">404 - Page Not Found</h1>
      <p className="text-lg mt-2">The page you're looking for doesn't exist.</p>
      <Link to="/" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        Go Home
      </Link>
    </div>
  );
};
