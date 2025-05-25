
import { FileText } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <FileText className="h-6 w-6" />
            <span className="text-xl font-bold">ResumeBuilder</span>
          </div>
          <p className="text-gray-400 text-center md:text-right">
            © 2024 ResumeBuilder. Build your future with confidence.
          </p>
        </div>
      </div>
    </footer>
  );
}
