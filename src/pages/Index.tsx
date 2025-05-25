
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { GraduationCap, Briefcase, FileText, Sparkles, Download, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Build Your Perfect Resume
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Create professional, ATS-friendly resumes with AI-powered suggestions and real-time preview
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/fresher">
              <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                <GraduationCap className="mr-2 h-5 w-5" />
                I'm a Fresher
              </Button>
            </Link>
            <Link to="/experienced">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 py-6 border-2">
                <Briefcase className="mr-2 h-5 w-5" />
                I'm Experienced
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Choose Our Resume Builder?</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <Sparkles className="h-12 w-12 text-blue-600 mb-4" />
              <CardTitle>AI-Powered Suggestions</CardTitle>
              <CardDescription>
                Get intelligent content recommendations and optimize your resume for ATS systems
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <FileText className="h-12 w-12 text-green-600 mb-4" />
              <CardTitle>Real-time Preview</CardTitle>
              <CardDescription>
                See your changes instantly with our live preview feature and professional templates
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <Download className="h-12 w-12 text-purple-600 mb-4" />
              <CardTitle>Easy Export</CardTitle>
              <CardDescription>
                Download your resume as PDF or share it directly via email with one click
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="container mx-auto px-4 py-16 bg-white dark:bg-gray-800 rounded-3xl mx-4 mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Choose Your Path</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="border-2 border-blue-200 hover:border-blue-400 transition-colors">
            <CardHeader>
              <div className="flex items-center justify-between">
                <GraduationCap className="h-8 w-8 text-blue-600" />
                <Badge variant="secondary">Fresher</Badge>
              </div>
              <CardTitle className="text-2xl">For New Graduates</CardTitle>
              <CardDescription className="text-base">
                Perfect for students and recent graduates looking to showcase their potential
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <Zap className="h-4 w-4 text-green-500 mr-2" />
                  Simple, clean templates
                </li>
                <li className="flex items-center">
                  <Zap className="h-4 w-4 text-green-500 mr-2" />
                  Focus on education & skills
                </li>
                <li className="flex items-center">
                  <Zap className="h-4 w-4 text-green-500 mr-2" />
                  Project showcase section
                </li>
                <li className="flex items-center">
                  <Zap className="h-4 w-4 text-green-500 mr-2" />
                  Guided content suggestions
                </li>
              </ul>
              <Link to="/fresher">
                <Button className="w-full">Start Building</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-200 hover:border-purple-400 transition-colors">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Briefcase className="h-8 w-8 text-purple-600" />
                <Badge variant="secondary">Professional</Badge>
              </div>
              <CardTitle className="text-2xl">For Professionals</CardTitle>
              <CardDescription className="text-base">
                Advanced features for experienced professionals and career changers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <Zap className="h-4 w-4 text-green-500 mr-2" />
                  Advanced templates
                </li>
                <li className="flex items-center">
                  <Zap className="h-4 w-4 text-green-500 mr-2" />
                  Work experience focus
                </li>
                <li className="flex items-center">
                  <Zap className="h-4 w-4 text-green-500 mr-2" />
                  ATS compatibility score
                </li>
                <li className="flex items-center">
                  <Zap className="h-4 w-4 text-green-500 mr-2" />
                  Resume duplication
                </li>
              </ul>
              <Link to="/experienced">
                <Button className="w-full" variant="outline">Start Building</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
