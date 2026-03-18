import { Injectable } from '@angular/core';
import { ResumeData } from './resume.model';

const STORAGE_KEY = 'resume_maker_data';

@Injectable({ providedIn: 'root' })
export class ResumeService {

private defaultData: ResumeData = {
  personalInfo: {
    fullName: '', jobTitle: 'Software Developer', email: '',
    phone: '', location: 'Kochi, India', website: '', summary: ''
  },
  experiences: [],
  education: [],
  skills: [],
  projects: [],
  languages: [],
  softSkills: [],
  styleConfig: {
    accentColor: '#4f46e5',
    headingFontSize: 28,
    sectionTitleSize: 12,
    bodyFontSize: 13,
    headingFontWeight: '700',
    sectionTitleWeight: '700',
    fontFamily: "'Georgia', serif",
  }
};

load(): ResumeData {
  try {
    const stored = localStorage.getItem('resume_maker_data');
    if (!stored) return this.getDefault();
    const parsed = JSON.parse(stored) as ResumeData;
    if (!parsed.languages)   parsed.languages = [];
    if (!parsed.softSkills)  parsed.softSkills = [];
    if (!parsed.styleConfig) parsed.styleConfig = this.defaultData.styleConfig;
    return parsed;
  } catch { return this.getDefault(); }
}

  save(data: ResumeData): void {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch {}
  }

  clear(): void { localStorage.removeItem(STORAGE_KEY); }

  getDefault(): ResumeData {
    return JSON.parse(JSON.stringify(this.defaultData));
  }
}