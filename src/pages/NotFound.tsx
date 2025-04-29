
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FileQuestion } from "lucide-react";

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4 text-center">
      <div className="rounded-full bg-insura-50 p-6 mb-6">
        <FileQuestion className="h-16 w-16 text-insura-500" />
      </div>
      <h1 className="text-4xl font-bold text-gray-800">Page Not Found</h1>
      <p className="mt-4 mb-8 max-w-md text-gray-600">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Button asChild>
        <Link to="/">Return to Dashboard</Link>
      </Button>
    </div>
  );
};

export default NotFound;
