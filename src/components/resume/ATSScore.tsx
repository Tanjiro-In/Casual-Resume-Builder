
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { ExperiencedResumeData } from "@/pages/ExperiencedBuilder";

interface ATSScoreProps {
  resumeData: ExperiencedResumeData;
}

export function ATSScore({ resumeData }: ATSScoreProps) {
  // Calculate ATS score based on various factors
  const calculateATSScore = () => {
    let score = 0;
    const issues: string[] = [];
    const recommendations: string[] = [];

    // Check contact information (20 points)
    if (resumeData.personalInfo.fullName) score += 5;
    if (resumeData.personalInfo.email) score += 5;
    if (resumeData.personalInfo.phone) score += 5;
    if (resumeData.personalInfo.location) score += 5;
    else recommendations.push("Add your location for better local job matching");

    // Check summary (15 points)
    if (resumeData.summary) {
      score += 15;
      if (resumeData.summary.length < 100) {
        recommendations.push("Expand your professional summary to 100+ characters");
      }
    } else {
      issues.push("Missing professional summary");
    }

    // Check work experience (25 points)
    if (resumeData.experience.length > 0) {
      score += 15;
      let hasQuantifiedResults = false;
      resumeData.experience.forEach(exp => {
        exp.description.forEach(desc => {
          if (/\d+%|\$\d+|\d+\+/.test(desc)) {
            hasQuantifiedResults = true;
          }
        });
      });
      if (hasQuantifiedResults) {
        score += 10;
      } else {
        recommendations.push("Add quantified results (numbers, percentages, dollar amounts) to your experience");
      }
    } else {
      issues.push("Missing work experience");
    }

    // Check skills (15 points)
    if (resumeData.skills.technical.length > 0 || resumeData.skills.soft.length > 0) {
      score += 10;
      if (resumeData.skills.technical.length >= 5) {
        score += 5;
      } else {
        recommendations.push("Add more technical skills (aim for 5+)");
      }
    } else {
      issues.push("Missing skills section");
    }

    // Check education (10 points)
    if (resumeData.education.length > 0) {
      score += 10;
    } else {
      recommendations.push("Add your education background");
    }

    // Check achievements (10 points)
    if (resumeData.achievements.length > 0) {
      score += 10;
    } else {
      recommendations.push("Add key achievements to showcase your impact");
    }

    // Check certifications (5 points)
    if (resumeData.certifications.length > 0) {
      score += 5;
    } else {
      recommendations.push("Add relevant certifications to boost credibility");
    }

    return { score, issues, recommendations };
  };

  const { score, issues, recommendations } = calculateATSScore();
  const percentage = Math.min(score, 100);

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 dark:text-green-400";
    if (score >= 60) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Fair";
    return "Needs Improvement";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          ATS Compatibility Score
          <Badge variant={score >= 80 ? "default" : score >= 60 ? "secondary" : "destructive"}>
            {getScoreLabel(score)}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <div className={`text-4xl font-bold ${getScoreColor(score)}`}>
            {percentage}%
          </div>
          <Progress value={percentage} className="mt-4" />
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
            ATS systems will likely parse your resume {score >= 80 ? "perfectly" : score >= 60 ? "well" : "with some difficulty"}
          </p>
        </div>

        {issues.length > 0 && (
          <div>
            <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2 flex items-center gap-1">
              <XCircle className="h-4 w-4" />
              Critical Issues
            </h4>
            <ul className="space-y-1">
              {issues.map((issue, index) => (
                <li key={index} className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  {issue}
                </li>
              ))}
            </ul>
          </div>
        )}

        {recommendations.length > 0 && (
          <div>
            <h4 className="font-semibold text-yellow-600 dark:text-yellow-400 mb-2 flex items-center gap-1">
              <AlertTriangle className="h-4 w-4" />
              Recommendations
            </h4>
            <ul className="space-y-1">
              {recommendations.slice(0, 5).map((rec, index) => (
                <li key={index} className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
                  <span className="text-yellow-500 mt-1">•</span>
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div>
          <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2 flex items-center gap-1">
            <CheckCircle className="h-4 w-4" />
            ATS Best Practices
          </h4>
          <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">•</span>
              Use standard section headings (Experience, Education, Skills)
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">•</span>
              Include relevant keywords from job descriptions
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">•</span>
              Use simple, clean formatting without complex layouts
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">•</span>
              Save as PDF to preserve formatting
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
