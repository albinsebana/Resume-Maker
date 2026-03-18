export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  summary: string;
  photo?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  grade: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number;
  category: string;
  customCategory?: string;  // used when category === 'Other'
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string;
  link: string;
}

export interface Language {  // ← NEW
  id: string;
  name: string;
  proficiency: string;
}

export interface SoftSkill {  // ← NEW
  id: string;
  name: string;
}

export interface StyleConfig {  // ← NEW
  accentColor: string;
  headingFontSize: number;
  sectionTitleSize: number;
  bodyFontSize: number;
  headingFontWeight: string;
  sectionTitleWeight: string;
  fontFamily: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  languages: Language[];      // ← NEW
  softSkills: SoftSkill[];    // ← NEW
  styleConfig: StyleConfig;   // ← NEW
}