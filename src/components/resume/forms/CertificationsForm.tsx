
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";

interface Certification {
  name: string;
  issuer: string;
  date: string;
}

interface CertificationsFormProps {
  certifications: Certification[];
  onChange: (certifications: Certification[]) => void;
}

export function CertificationsForm({ certifications, onChange }: CertificationsFormProps) {
  const addCertification = () => {
    onChange([...certifications, { name: "", issuer: "", date: "" }]);
  };

  const removeCertification = (index: number) => {
    onChange(certifications.filter((_, i) => i !== index));
  };

  const updateCertification = (index: number, field: keyof Certification, value: string) => {
    const updated = certifications.map((cert, i) => 
      i === index ? { ...cert, [field]: value } : cert
    );
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      {certifications.map((cert, index) => (
        <Card key={index}>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <Label htmlFor={`cert-name-${index}`}>Certification Name *</Label>
                <Input
                  id={`cert-name-${index}`}
                  value={cert.name}
                  onChange={(e) => updateCertification(index, "name", e.target.value)}
                  placeholder="AWS Certified Solutions Architect"
                />
              </div>
              <div>
                <Label htmlFor={`cert-issuer-${index}`}>Issuing Organization *</Label>
                <Input
                  id={`cert-issuer-${index}`}
                  value={cert.issuer}
                  onChange={(e) => updateCertification(index, "issuer", e.target.value)}
                  placeholder="Amazon Web Services"
                />
              </div>
              <div>
                <Label htmlFor={`cert-date-${index}`}>Date Obtained *</Label>
                <Input
                  id={`cert-date-${index}`}
                  value={cert.date}
                  onChange={(e) => updateCertification(index, "date", e.target.value)}
                  placeholder="March 2024"
                />
              </div>
            </div>
            <Button 
              onClick={() => removeCertification(index)} 
              variant="destructive" 
              size="sm"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Remove
            </Button>
          </CardContent>
        </Card>
      ))}
      
      <Button onClick={addCertification} variant="outline" className="w-full">
        <Plus className="mr-2 h-4 w-4" />
        Add Certification
      </Button>
    </div>
  );
}
