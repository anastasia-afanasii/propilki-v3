import { Link } from "react-router-dom";
import useDocumentTitle from "@/hooks/useDocumentTitle";

const NotFound = () => {
  useDocumentTitle("Page Not Found");

  return (
    <main className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-light text-neutral-900 mb-4">404</h1>
        <p className="text-xl text-neutral-600 mb-8">
          The page you're looking for doesn't exist.
        </p>
        <nav className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="px-6 py-3 bg-neutral-900 text-white text-sm font-medium tracking-wide hover:bg-neutral-800 transition"
          >
            Online Courses
          </Link>
          <Link
            to="/solo"
            className="px-6 py-3 border border-neutral-300 text-neutral-700 text-sm font-medium tracking-wide hover:border-neutral-900 hover:text-neutral-900 transition"
          >
            Press-On Nails
          </Link>
        </nav>
      </div>
    </main>
  );
};

export default NotFound;
