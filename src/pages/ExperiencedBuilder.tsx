import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { ExperiencedResumeForm } from "@/components/resume/ExperiencedResumeForm";
import { CustomizableResumePreview } from "@/components/resume/CustomizableResumePreview";
import { TemplateCustomizer, TemplateCustomization } from "@/components/resume/TemplateCustomizer";
import { Button } from "@/components/ui/button";
import { Download, BarChart3, ArrowLeft, Palette } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { generatePDF } from "@/utils/pdfGenerator";
import { ATSScore } from "@/components/resume/ATSScore";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface ExperiencedResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    portfolio: string;
  };
  summary: string;
  experience: {
    company: string;
    position: string;
    duration: string;
    location: string;
    description: string[];
  }[];
  skills: {
    technical: string[];
    soft: string[];
  };
  education: {
    degree: string;
    institution: string;
    year: string;
    gpa?: string;
  }[];
  achievements: string[];
  certifications: {
    name: string;
    issuer: string;
    date: string;
  }[];
  awards: string[];
  publications: string[];
}

const ExperiencedBuilder = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showATSScore, setShowATSScore] = useState(false);
  const [resumeData, setResumeData] = useState<ExperiencedResumeData>({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      portfolio: "",
    },
    summary: "",
    experience: [],
    skills: {
      technical: [],
      soft: [],
    },
    education: [],
    achievements: [],
    certifications: [],
    awards: [],
    publications: [],
  });

  const [customization, setCustomization] = useState<TemplateCustomization>({
    style: "modern",
    font: "inter",
    sectionOrder: ["personalInfo", "summary", "experience", "education", "skills", "achievements", "certifications", "awards", "publications"],
    accentColor: "#2563eb",
  });

  const availableSections = ["personalInfo", "summary", "experience", "education", "skills", "achievements", "certifications", "awards", "publications"];

  const handleDownload = async () => {
    try {
      await generatePDF(resumeData, "experienced");
      toast({
        title: "Download Started",
        description: "Your resume PDF is being generated!",
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "There was an error generating your PDF.",
        variant: "destructive",
      });
    }
  };

  const switchToFresher = () => {
    navigate("/fresher");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Professional Resume Builder</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Showcase your experience with ATS-optimized templates
          </p>
        </div>

        <div className="flex justify-center mb-6 space-x-4 flex-wrap gap-2">
          <Button onClick={switchToFresher} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Switch to Fresher
          </Button>
          <Button onClick={() => setShowATSScore(!showATSScore)} variant="outline">
            <BarChart3 className="mr-2 h-4 w-4" />
            ATS Score
          </Button>
          <Button onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </div>

        {showATSScore && (
          <div className="mb-6">
            <ATSScore resumeData={resumeData} />
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <Tabs defaultValue="content" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="design">
                  <Palette className="w-4 h-4 mr-1" />
                  Design
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="content" className="space-y-6">
                <ExperiencedResumeForm 
                  resumeData={resumeData} 
                  setResumeData={setResumeData}
                />
              </TabsContent>
              
              <TabsContent value="design">
                <TemplateCustomizer
                  customization={customization}
                  onChange={setCustomization}
                  availableSections={availableSections}
                />
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="lg:col-span-2 lg:sticky lg:top-24 h-fit">
            <CustomizableResumePreview 
              resumeData={resumeData} 
              type="experienced" 
              customization={customization}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperiencedBuilder;
