import { ResumeData } from '../types/resume';

export async function parseResume(file: File): Promise<Partial<ResumeData>> {
  // Read file content
  const text = await file.text();
  
  // Basic parsing logic (this should be replaced with actual AI parsing)
  const sections = text.split('\n\n');
  
  // Extract basic information (this is a simplified example)
  const parsedData: Partial<ResumeData> = {
    full_name: extractName(text),
    email: extractEmail(text),
    phone: extractPhone(text),
    summary: extractSummary(sections),
    skills: extractSkills(text),
    education: extractEducation(text),
    experience: extractExperience(text),
    parsed_data: { raw: text }
  };

  return parsedData;
}

// Helper functions for parsing (these should be enhanced with AI/ML)
function extractName(text: string): string {
  // Basic name extraction logic
  const firstLine = text.split('\n')[0];
  return firstLine.trim();
}

function extractEmail(text: string): string {
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
  const match = text.match(emailRegex);
  return match ? match[0] : '';
}

function extractPhone(text: string): string {
  const phoneRegex = /(\+\d{1,3}[-.]?)?\(?\d{3}\)?[-.]?\d{3}[-.]?\d{4}/;
  const match = text.match(phoneRegex);
  return match ? match[0] : '';
}

function extractSummary(sections: string[]): string {
  // Look for summary section
  const summarySection = sections.find(section => 
    section.toLowerCase().includes('summary') || 
    section.toLowerCase().includes('objective')
  );
  return summarySection?.split('\n').slice(1).join(' ').trim() || '';
}

function extractSkills(text: string): string[] {
  // Basic skills extraction
  const skillsSection = text.match(/Skills[\s\S]*?(?=\n\n|$)/i);
  if (!skillsSection) return [];
  
  return skillsSection[0]
    .split('\n')
    .slice(1)
    .join(' ')
    .split(',')
    .map(skill => skill.trim())
    .filter(Boolean);
}

function extractEducation(text: string): any[] {
  // Basic education extraction
  const educationSection = text.match(/Education[\s\S]*?(?=\n\n|$)/i);
  if (!educationSection) return [];

  // This is a simplified version - should be enhanced with AI
  return [{
    institution: "Example University",
    degree: "Bachelor's",
    field: "Computer Science",
    start_date: "2020",
    end_date: "2024"
  }];
}

function extractExperience(text: string): any[] {
  // Basic experience extraction
  const experienceSection = text.match(/Experience[\s\S]*?(?=\n\n|$)/i);
  if (!experienceSection) return [];

  // This is a simplified version - should be enhanced with AI
  return [{
    company: "Example Company",
    position: "Software Developer",
    start_date: "2023",
    end_date: "Present",
    description: ["Developed web applications", "Worked with React and Node.js"]
  }];
}