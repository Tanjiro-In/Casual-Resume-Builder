
import { FresherResumeData } from "@/pages/FresherBuilder";
import { ExperiencedResumeData } from "@/pages/ExperiencedBuilder";

export const generatePDF = async (resumeData: FresherResumeData | ExperiencedResumeData, type: "fresher" | "experienced") => {
  try {
    // Get the resume preview element
    const element = document.getElementById('resume-preview');
    
    if (!element) {
      throw new Error('Resume preview element not found');
    }

    // Use dynamic import for html2canvas and jsPDF to reduce bundle size
    const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
      import('html2canvas'),
      import('jspdf')
    ]);

    // Generate canvas from the resume preview
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    });

    const imgData = canvas.toDataURL('image/png');
    
    // Create PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const imgWidth = 210; // A4 width in mm
    const pageHeight = 295; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    let position = 0;

    // Add first page
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Add additional pages if needed
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Generate filename
    const fullName = resumeData.personalInfo.fullName || 'Resume';
    const filename = `${fullName.replace(/\s+/g, '_')}_Resume.pdf`;

    // Download the PDF
    pdf.save(filename);

    console.log('PDF generated successfully');
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};
