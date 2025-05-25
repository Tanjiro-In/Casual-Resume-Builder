
import { Button } from "@/components/ui/button";
import { Moon, Sun, FileText } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { Link } from "react-router-dom";

export function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <FileText className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ResumeBuilder
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/templates" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors">
              Templates
            </Link>
            <Link to="/fresher" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors">
              Fresher
            </Link>
            <Link to="/experienced" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors">
              Professional
            </Link>
          </nav>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
