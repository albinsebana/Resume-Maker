import { Injectable } from '@angular/core';
import { ResumeData } from './resume.model';

const STORAGE_KEY = 'resume_maker_data';

@Injectable({ providedIn: 'root' })
export class ResumeService {

private defaultData: ResumeData = {
  personalInfo: {
    fullName: '', jobTitle: 'Software Developer', email: '',
    phone: '', location: 'Kochi, India', website: '', linkedin:'', portfolio:'', summary: '', 
    linkedinMask: false,  linkedinLabel: '',
    portfolioMask: false, portfolioLabel: '',
    websiteMask: false,   websiteLabel: '',
  },
  experiences: [],
  education: [],
  skills: [],
  projects: [],
  languages: [],
  softSkills: [],
styleConfig: {
 accentColor:           '#4f46e5',
  fontFamily:            "'Georgia', serif",
  pagePadding:           14,
  sectionSpacing:        18,
  sectionTitleSize:      12,
  sectionTitleWeight:    '700',
  headingFontSize:       28,
  bodyFontSize:          13,
  headingFontWeight:     '700',
  lineHeight:            1.7,
  pageTopPadding:       6,  
  langTagBordered:       false,
  softSkillTagBordered:  false,
 personal: {
  nameFontSize:      28,
  nameFontWeight:    '700',
  jobTitleFontSize:  14,
  jobTitleColor:     'accent',
  contactFontSize:   11,
  summaryFontSize:   13,
  summaryLineHeight: 1.7,
  summaryTopGap:     18,  
  summaryPadding:    0,    
},
  experience: {
    titleFontSize: 14, titleFontWeight: '700',
    companyFontSize: 12, companyColor: 'accent',
    dateFontSize: 11, bulletChar: '•',
    bulletFontSize: 13, bulletLineHeight: 1.65, entrySpacing: 12,
  },
  education: {
    titleFontSize: 14, titleFontWeight: '700',
    institutionFontSize: 12, institutionColor: 'accent',
    dateFontSize: 11, entrySpacing: 10,
  },
skills: {
  categoryFontSize:   11,
  categoryFontWeight: '700',
  skillFontSize:      12,
  showSkillBars:      true,
  tagBordered:        false,
  rowGap:             6,       
  headerSkillGap:     8,      
  tagPaddingH:        8,   
},
  projects: {
    titleFontSize: 14, titleFontWeight: '700',
    techFontSize: 11, bulletChar: '•',
    bulletFontSize: 13, bulletLineHeight: 1.65, cardBackground: true,
  },
  languages: {
  tagBordered: false,
  fontSize:    12,
  tagPaddingH: 10,   // ← ADD
  tagPaddingV: 3,    // ← ADD
  tagGap:      5,    // ← ADD
},
softSkills: {
  tagBordered: false,
  fontSize:    12,
  tagPaddingH: 10,   // ← ADD
  tagPaddingV: 3,    // ← ADD
  tagGap:      5,    // ← ADD
},
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