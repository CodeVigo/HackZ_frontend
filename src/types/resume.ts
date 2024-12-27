export type ResumeStatus = 'pending' | 'processed' | 'failed';

export interface Resume {
  id: string;
  user_id: string;
  file_name: string;
  original_name: string;
  status: ResumeStatus;
  created_at: string;
  updated_at: string;
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  start_date: string;
  end_date?: string;
  gpa?: number;
}

export interface Experience {
  company: string;
  position: string;
  start_date: string;
  end_date?: string;
  description: string[];
}

export interface ResumeData {
  id: string;
  resume_id: string;
  full_name: string;
  email: string;
  phone: string;
  summary: string;
  skills: string[];
  education: Education[];
  experience: Experience[];
  parsed_data: Record<string, any>;
  created_at: string;
  updated_at: string;
}