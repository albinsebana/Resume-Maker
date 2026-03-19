import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassicTemplateComponent } from '../Components/classic-template/classic-template';
import { CreativeTemplateComponent } from '../Components/creative-template/creative-template';
import { DownloadToolbarComponent } from '../Components/download-toolbar/download-toolbar';
import { EducationFormComponent } from '../Components/education-form/education-form';
import { ExecutiveTemplateComponent } from '../Components/executive-template/executive-template';
import { ExperienceFormComponent } from '../Components/experience-form/experience-form';
import { LanguagesFormComponent } from '../Components/languages-form/languages-form';
import { MinimalTemplateComponent } from '../Components/minimal-template/minimal-template';
import { ModernTemplateComponent } from '../Components/modern-template/modern-template';
import { NavService } from '../Components/nav';
import { PersonalFormComponent } from '../Components/personal-form/personal-form';
import { ProjectsFormComponent } from '../Components/projects-form/projects-form';
import { SkillsFormComponent } from '../Components/skills-form/skills-form';
import { SoftskillsFormComponent } from '../Components/softskills-form/softskills-form';
import { StyleConfigComponent } from '../Components/style-config/style-config';
import { ResumeData, StyleConfig } from '../resume.model';

type TemplateId = 'classic'|'modern'|'minimal'|'executive'|'creative';

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
  saveStatus: 'idle'|'saving'|'saved' = 'idle';
  previewOpen = false;
  private autoSaveTimer: any;

  constructor(private navService: NavService) {}

  sections = [
    { id: 'personal',   label: 'Personal'   },
    { id: 'experience', label: 'Experience' },
    { id: 'education',  label: 'Education'  },
    { id: 'skills',     label: 'Skills'     },
    { id: 'projects',   label: 'Projects'   },
    { id: 'languages',  label: 'Languages'  },
    { id: 'softskills', label: 'Soft Skills'},
    { id: 'style',      label: '🎨 Style'   },
  ];

  templates: { id: TemplateId; label: string }[] = [
    { id: 'classic',   label: 'Classic'   },
    { id: 'modern',    label: 'Modern'    },
    { id: 'minimal',   label: 'Minimal'   },
    { id: 'executive', label: 'Executive' },
    { id: 'creative',  label: 'Creative'  },
  ];

  resumeData!: ResumeData;

  ngOnInit()    { this.resumeData = this.load(); }
  ngOnDestroy() {
    if (this.autoSaveTimer) clearTimeout(this.autoSaveTimer);
    document.body.style.overflow = '';
  }

  openNav()      { this.navService.toggle(); }
  openPreview()  { this.previewOpen = true;  document.body.style.overflow = 'hidden'; }
  closePreview() { this.previewOpen = false; document.body.style.overflow = ''; }

  private defaultStyle: StyleConfig = {
    accentColor: '#4f46e5', fontFamily: "'Georgia', serif",
    pagePadding: 14, pageTopPadding: 6, sectionSpacing: 18,
    sectionTitleSize: 12, sectionTitleWeight: '700',
    headingFontSize: 28, bodyFontSize: 13, headingFontWeight: '700',
    lineHeight: 1.7, langTagBordered: false, softSkillTagBordered: false,
    personal: {
      nameFontSize: 28, nameFontWeight: '700', jobTitleFontSize: 14,
      jobTitleColor: 'accent', contactFontSize: 11, summaryFontSize: 13,
      summaryLineHeight: 1.7, summaryTopGap: 18, summaryPadding: 0,
    },
    experience: {
      titleFontSize: 14, titleFontWeight: '700', companyFontSize: 12,
      companyColor: 'accent', dateFontSize: 11, bulletChar: '•',
      bulletFontSize: 13, bulletLineHeight: 1.65, entrySpacing: 12,
    },
    education: {
      titleFontSize: 14, titleFontWeight: '700', institutionFontSize: 12,
      institutionColor: 'accent', dateFontSize: 11, entrySpacing: 10,
    },
    skills: {
      categoryFontSize: 11, categoryFontWeight: '700', skillFontSize: 12,
      showSkillBars: true, tagBordered: false, rowGap: 6, headerSkillGap: 8, tagPaddingH: 8,
    },
    projects: {
      titleFontSize: 14, titleFontWeight: '700', techFontSize: 11, bulletChar: '•',
      bulletFontSize: 13, bulletLineHeight: 1.65, cardBackground: true,
    },
    languages:  { tagBordered: false, fontSize: 12, tagPaddingH: 10, tagPaddingV: 3, tagGap: 5 },
    softSkills: { tagBordered: false, fontSize: 12, tagPaddingH: 10, tagPaddingV: 3, tagGap: 5 },
  };

  load(): ResumeData {
    try {
      const s = localStorage.getItem('resume_maker_data');
      if (!s) return this.getDefault();
      const p = JSON.parse(s) as ResumeData;
      if (!p.languages)   p.languages   = [];
      if (!p.softSkills)  p.softSkills  = [];
      if (!p.styleConfig) p.styleConfig = { ...this.defaultStyle };
      if (!p.personalInfo.linkedin)             p.personalInfo.linkedin       = '';
      if (!p.personalInfo.portfolio)            p.personalInfo.portfolio      = '';
      if (p.personalInfo.linkedinMask   == null) p.personalInfo.linkedinMask   = false;
      if (p.personalInfo.linkedinLabel  == null) p.personalInfo.linkedinLabel  = '';
      if (p.personalInfo.portfolioMask  == null) p.personalInfo.portfolioMask  = false;
      if (p.personalInfo.portfolioLabel == null) p.personalInfo.portfolioLabel = '';
      if (p.personalInfo.websiteMask    == null) p.personalInfo.websiteMask    = false;
      if (p.personalInfo.websiteLabel   == null) p.personalInfo.websiteLabel   = '';
      return p;
    } catch { return this.getDefault(); }
  }

  getDefault(): ResumeData {
    return {
      personalInfo: {
        fullName: '', jobTitle: '', email: '', phone: '',
        location: '', website: '', linkedin: '', portfolio: '', summary: '',
        linkedinMask: false, linkedinLabel: '', portfolioMask: false,
        portfolioLabel: '', websiteMask: false, websiteLabel: '',
      },
      experiences: [], education: [], skills: [], projects: [],
      languages: [], softSkills: [], styleConfig: { ...this.defaultStyle },
    };
  }

  onDataChange(d: ResumeData) {
    this.resumeData = { ...d };
    this.saveStatus = 'saving';
    clearTimeout(this.autoSaveTimer);
    this.autoSaveTimer = setTimeout(() => {
      localStorage.setItem('resume_maker_data', JSON.stringify(this.resumeData));
      this.saveStatus = 'saved';
      setTimeout(() => (this.saveStatus = 'idle'), 2000);
    }, 800);
  }

  clearAll() {
    if (confirm('Reset all data?')) {
      this.resumeData = this.getDefault();
      localStorage.removeItem('resume_maker_data');
    }
  }

  setSection(id: string)      { this.activeSection  = id; }
  setTemplate(id: TemplateId) { this.activeTemplate = id; }
}