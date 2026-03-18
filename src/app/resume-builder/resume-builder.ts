import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassicTemplateComponent } from '../Components/classic-template/classic-template';
import { CreativeTemplateComponent } from '../Components/creative-template/creative-template';
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
import { DownloadToolbarComponent } from '../Components/download-toolbar/download-toolbar';

// Download toolbar

type TemplateId = 'classic' | 'modern' | 'minimal' | 'executive' | 'creative';

@Component({
  selector: 'app-resume-builder',
  standalone: true,
  imports: [
    CommonModule,
    // Section forms
    PersonalFormComponent,
    ExperienceFormComponent,
    EducationFormComponent,
    SkillsFormComponent,
    ProjectsFormComponent,
    LanguagesFormComponent,
    SoftskillsFormComponent,
    StyleConfigComponent,
    // Templates
    ClassicTemplateComponent,
    ModernTemplateComponent,
    MinimalTemplateComponent,
    ExecutiveTemplateComponent,
    CreativeTemplateComponent,
    // Toolbar
    DownloadToolbarComponent,
  ],
  templateUrl: './resume-builder.html',
  styleUrl: './resume-builder.scss'
})
export class ResumeBuilder implements OnInit, OnDestroy {

  activeSection: string  = 'personal';
  activeTemplate: TemplateId = 'classic';
  saveStatus: 'idle' | 'saving' | 'saved' = 'idle';
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
    { id: 'classic',   label: 'Classic',   desc: 'Clean serif'      },
    { id: 'modern',    label: 'Modern',    desc: 'Dark sidebar'      },
    { id: 'minimal',   label: 'Minimal',   desc: 'Ultra clean'       },
    { id: 'executive', label: 'Executive', desc: 'Two-col formal'    },
    { id: 'creative',  label: 'Creative',  desc: 'Bold & colorful'   },
  ];

  resumeData!: ResumeData;

  ngOnInit()    { this.resumeData = this.load(); }
  ngOnDestroy() { if (this.autoSaveTimer) clearTimeout(this.autoSaveTimer); }

  private defaultStyleConfig: StyleConfig = {
    accentColor: '#4f46e5',
    headingFontSize: 28,
    sectionTitleSize: 12,
    bodyFontSize: 13,
    headingFontWeight: '700',
    sectionTitleWeight: '700',
    fontFamily: "'Georgia', serif",
  };

  load(): ResumeData {
    try {
      const stored = localStorage.getItem('resume_maker_data');
      if (!stored) return this.getDefault();
      const parsed = JSON.parse(stored) as ResumeData;
      if (!parsed.languages)   parsed.languages  = [];
      if (!parsed.softSkills)  parsed.softSkills  = [];
      if (!parsed.styleConfig) parsed.styleConfig = { ...this.defaultStyleConfig };
      if (parsed.skills?.length && !(parsed.skills[0] as any).category) {
        parsed.skills = parsed.skills.map((s: any) => ({ ...s, category: s.category || 'Other' }));
      }
      return parsed;
    } catch { return this.getDefault(); }
  }

  getDefault(): ResumeData {
    return {
      personalInfo: { fullName: '', jobTitle: '', email: '', phone: '', location: '', website: '', summary: '' },
      experiences: [], education: [], skills: [], projects: [],
      languages: [], softSkills: [],
      styleConfig: { ...this.defaultStyleConfig },
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
    if (confirm('Clear all data and reset to defaults?')) {
      this.resumeData = this.getDefault();
      localStorage.removeItem('resume_maker_data');
    }
  }

  setSection(id: string)      { this.activeSection  = id; }
  setTemplate(id: TemplateId) { this.activeTemplate = id; }
}