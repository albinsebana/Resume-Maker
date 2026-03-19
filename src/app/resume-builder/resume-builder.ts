import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Navbar } from '../navbar/navbar';
import { ClassicTemplateComponent } from '../Components/classic-template/classic-template';
import { CreativeTemplateComponent } from '../Components/creative-template/creative-template';
import { DownloadToolbarComponent } from '../Components/download-toolbar/download-toolbar';
import { EducationFormComponent } from '../Components/education-form/education-form';
import { ExecutiveTemplateComponent } from '../Components/executive-template/executive-template';
import { ExperienceFormComponent } from '../Components/experience-form/experience-form';
import { LanguagesFormComponent } from '../Components/languages-form/languages-form';
import { MinimalTemplateComponent } from '../Components/minimal-template/minimal-template';
import { ModernTemplateComponent } from '../Components/modern-template/modern-template';
import { PersonalFormComponent } from '../Components/personal-form/personal-form';
import { ProjectsFormComponent } from '../Components/projects-form/projects-form';
import { SkillsFormComponent } from '../Components/skills-form/skills-form';
import { SoftskillsFormComponent } from '../Components/softskills-form/softskills-form';
import { StyleConfigComponent } from '../Components/style-config/style-config';
import { ResumeData, StyleConfig } from '../resume.model';

type TemplateId = 'classic' | 'modern' | 'minimal' | 'executive' | 'creative';

@Component({
  selector: 'app-resume-builder',
  standalone: true,
  imports: [
    CommonModule,
    PersonalFormComponent, ExperienceFormComponent, EducationFormComponent,
    SkillsFormComponent, ProjectsFormComponent, LanguagesFormComponent,
    SoftskillsFormComponent, StyleConfigComponent,
    ClassicTemplateComponent, ModernTemplateComponent, MinimalTemplateComponent,
    ExecutiveTemplateComponent, CreativeTemplateComponent,
    DownloadToolbarComponent,
  ],
  templateUrl: './resume-builder.html',
  styleUrl: './resume-builder.scss'
})
export class ResumeBuilder implements OnInit, OnDestroy {

  activeSection: string      = 'personal';
  activeTemplate: TemplateId = 'classic';
  saveStatus: 'idle' | 'saving' | 'saved' = 'idle';
  previewOpen = false;
  private autoSaveTimer: any;

  sections = [
    { id: 'personal',   label: 'Personal'    },
    { id: 'experience', label: 'Experience'  },
    { id: 'education',  label: 'Education'   },
    { id: 'skills',     label: 'Skills'      },
    { id: 'projects',   label: 'Projects'    },
    { id: 'languages',  label: 'Languages'   },
    { id: 'softskills', label: 'Soft Skills' },
    { id: 'style',      label: '🎨 Style'    },
  ];

  templates: { id: TemplateId; label: string; desc: string }[] = [
    { id: 'classic',   label: 'Classic',   desc: 'Clean serif'    },
    { id: 'modern',    label: 'Modern',    desc: 'Dark sidebar'   },
    { id: 'minimal',   label: 'Minimal',   desc: 'Ultra clean'    },
    { id: 'executive', label: 'Executive', desc: 'Formal'         },
    { id: 'creative',  label: 'Creative',  desc: 'Bold & vibrant' },
  ];

  resumeData!: ResumeData;

  ngOnInit()    { this.resumeData = this.load(); }
  ngOnDestroy() {
    if (this.autoSaveTimer) clearTimeout(this.autoSaveTimer);
    document.body.style.overflow = '';
  }

  // Opens the sidenav via the Navbar singleton
  openNav() {
    if (Navbar.instance) Navbar.instance.open();
  }

  openPreview() {
    this.previewOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closePreview() {
    this.previewOpen = false;
    document.body.style.overflow = '';
  }

// Replace defaultStyleConfig in resume-builder.ts with this:

private defaultStyleConfig: StyleConfig = {
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
};

// Also add these lines inside load() after existing null checks:
// if (!parsed.styleConfig.personal)   parsed.styleConfig.personal   = this.defaultStyleConfig.personal;
// if (!parsed.styleConfig.experience) parsed.styleConfig.experience = this.defaultStyleConfig.experience;
// if (!parsed.styleConfig.education)  parsed.styleConfig.education  = this.defaultStyleConfig.education;
// if (!parsed.styleConfig.skills)     parsed.styleConfig.skills     = this.defaultStyleConfig.skills;
// if (!parsed.styleConfig.projects)   parsed.styleConfig.projects   = this.defaultStyleConfig.projects;
// if (!parsed.styleConfig.languages)  parsed.styleConfig.languages  = this.defaultStyleConfig.languages;
// if (!parsed.styleConfig.softSkills) parsed.styleConfig.softSkills = this.defaultStyleConfig.softSkills;

// And wherever you have a hardcoded StyleConfig object (resume-service.ts etc)
// just add all the same fields above.
load(): ResumeData {
  
  try {
    const stored = localStorage.getItem('resume_maker_data');
    if (!stored) return this.getDefault();
    const parsed = JSON.parse(stored) as ResumeData;
    if (parsed.styleConfig.langTagBordered      == null) parsed.styleConfig.langTagBordered      = false;
    if (parsed.styleConfig.softSkillTagBordered == null) parsed.styleConfig.softSkillTagBordered = false;

    if (!parsed.languages)   parsed.languages  = [];
    if (!parsed.softSkills)  parsed.softSkills  = [];
    if (!parsed.styleConfig) parsed.styleConfig = { ...this.defaultStyleConfig };
    // Patch missing spacing fields for existing saved data
    if (parsed.styleConfig.pagePadding    == null) parsed.styleConfig.pagePadding    = 14;
    if (parsed.styleConfig.sectionSpacing == null) parsed.styleConfig.sectionSpacing = 18;
    if (parsed.styleConfig.lineHeight     == null) parsed.styleConfig.lineHeight     = 1.7;
    return parsed;
  } catch { return this.getDefault(); }
}

  getDefault(): ResumeData {
    return {
      personalInfo: { fullName: '', jobTitle: '', email: '', phone: '',
        location: '', website: '' , linkedin:'', portfolio:'', summary: '' ,
        linkedinMask: false,  linkedinLabel: '',
        portfolioMask: false, portfolioLabel: '',
        websiteMask: false,   websiteLabel: '', },
      experiences: [], education: [], skills: [], projects: [],
      languages: [], softSkills: [], styleConfig: { ...this.defaultStyleConfig },
    };
  }

  onDataChange(updated: ResumeData) {
    this.resumeData = { ...updated };
    this.saveStatus = 'saving';
    clearTimeout(this.autoSaveTimer);
    this.autoSaveTimer = setTimeout(() => {
      localStorage.setItem('resume_maker_data', JSON.stringify(this.resumeData));
      this.saveStatus = 'saved';
      setTimeout(() => (this.saveStatus = 'idle'), 2000);
    }, 800);
  }

  clearAll() {
    if (confirm('Clear all data and reset?')) {
      this.resumeData = this.getDefault();
      localStorage.removeItem('resume_maker_data');
    }
  }

  setSection(id: string)      { this.activeSection  = id; }
  setTemplate(id: TemplateId) { this.activeTemplate = id; }
}