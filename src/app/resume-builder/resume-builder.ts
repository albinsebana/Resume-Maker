import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ResumeData } from '../resume.model';

@Component({
  selector: 'app-resume-builder',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './resume-builder.html',
  styleUrl: './resume-builder.scss'
})
export class ResumeBuilder implements OnInit, OnDestroy {

  activeSection = 'personal';
  activeTemplate: 'classic' | 'modern' = 'classic';
  saveStatus: 'idle' | 'saving' | 'saved' = 'idle';

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

  templates: { id: 'classic' | 'modern', label: string, desc: string }[] = [
    { id: 'classic', label: 'Classic', desc: 'Clean serif layout' },
    { id: 'modern',  label: 'Modern',  desc: 'Two-column with sidebar' },
  ];

  fontFamilies = [
    { value: "'Georgia', serif",              label: 'Georgia (Serif)'     },
    { value: "'Helvetica Neue', sans-serif",  label: 'Helvetica (Sans)'    },
    { value: "'Times New Roman', serif",      label: 'Times New Roman'     },
    { value: "'Arial', sans-serif",           label: 'Arial (Sans)'        },
    { value: "'Garamond', serif",             label: 'Garamond (Elegant)'  },
  ];

  allCategories = [
    'Frontend', 'UI Frameworks & Libraries', 'State Management',
    'Backend & APIs', 'Databases', 'Tools', 'Soft Skills', 'Other'
  ];

  resumeData!: ResumeData;
  private autoSaveTimer: any;

  ngOnInit() { this.resumeData = this.load(); }
  ngOnDestroy() { if (this.autoSaveTimer) clearTimeout(this.autoSaveTimer); }

  defaultStyleConfig = {
    accentColor: "#4f46e5", headingFontSize: 28, sectionTitleSize: 12,
    bodyFontSize: 13, headingFontWeight: "700", sectionTitleWeight: "700",
    fontFamily: "'Georgia', serif"
  };

  load(): ResumeData {
    try {
      const stored = localStorage.getItem('resume_maker_data');
      if (!stored) return this.getDefault();
      const parsed = JSON.parse(stored) as ResumeData;
      // Migrate old saved data — patch missing fields so preview never crashes
      if (!parsed.languages)   parsed.languages = [];
      if (!parsed.softSkills)  parsed.softSkills = [];
      if (!parsed.styleConfig) parsed.styleConfig = { ...this.defaultStyleConfig };
      if (parsed.skills?.length && !(parsed.skills[0] as any).category) {
        parsed.skills = parsed.skills.map((s: any) => ({ ...s, category: s.category || 'Other' }));
      }
      return parsed;
    } catch { return this.getDefault(); }
  }

  getDefault(): ResumeData {
    return {
      personalInfo: {
        fullName: '',
        jobTitle: 'Software Developer',
        email: '',
        phone: '',
        location: 'Kochi, India',
        website: '',
        summary: ''
      },
      experiences: [
        {
          id: '1', company: 'Aurionpro Solutions Ltd', position: 'Software Developer',
          startDate: '2023-07', endDate: '', isCurrent: true,
          description: `Developed 40+ responsive UI screens across 8 core modules using Angular 18 for a large enterprise financial platform.\nImplemented modern Angular features including Standalone Components and @defer to improve application performance.\nBuilt a configurable quote engine interface enabling real-time comparison of multiple finance products.\nCreated a reusable UI component system using PrimeNG wrappers, improving UI consistency and development speed.\nImplemented role-based access control (RBAC) including field visibility, form locking, and workflow-based UI states.\nImproved frontend architecture using Angular Signals for efficient state sharing in nested forms.`
        },
        {
          id: '2', company: 'Tecacs IT Group', position: 'Software Developer Intern',
          startDate: '2022-09', endDate: '2023-03', isCurrent: false,
          description: `Assisted in developing frontend modules using Angular, HTML, CSS, and TypeScript.\nImplemented responsive UI components and integrated them with backend APIs.\nFixed UI bugs and optimized page performance.`
        }
      ],
      education: [
        {
          id: '1', institution: 'Federal Institute of Science and Technology (FISAT), Kochi',
          degree: 'Master of Computer Applications', field: 'MCA',
          startDate: '2021-01', endDate: '2023-01', grade: ''
        },
        {
          id: '2', institution: 'Mary Matha Arts & Science College, Kannur',
          degree: 'Bachelor of Commerce', field: 'Computer Applications',
          startDate: '2016-01', endDate: '2020-01', grade: ''
        }
      ],
      skills: [
        { id: '1',  name: 'Angular (v16–18)',       level: 5, category: 'Frontend' },
        { id: '2',  name: 'TypeScript',              level: 5, category: 'Frontend' },
        { id: '3',  name: 'JavaScript (ES6+)',       level: 5, category: 'Frontend' },
        { id: '4',  name: 'HTML5 & CSS3',            level: 5, category: 'Frontend' },
        { id: '5',  name: 'React',                   level: 3, category: 'Frontend' },
        { id: '6',  name: 'PrimeNG',                 level: 5, category: 'UI Frameworks & Libraries' },
        { id: '7',  name: 'Angular Material',        level: 4, category: 'UI Frameworks & Libraries' },
        { id: '8',  name: 'Responsive Design',       level: 5, category: 'UI Frameworks & Libraries' },
        { id: '9',  name: 'Angular Signals',         level: 4, category: 'State Management' },
        { id: '10', name: 'Redux',                   level: 3, category: 'State Management' },
        { id: '11', name: 'REST API Integration',    level: 4, category: 'Backend & APIs' },
        { id: '12', name: 'JSON',                    level: 5, category: 'Backend & APIs' },
        { id: '13', name: 'MySQL',                   level: 3, category: 'Databases' },
        { id: '14', name: 'MongoDB',                 level: 3, category: 'Databases' },
        { id: '15', name: 'Git & SVN',               level: 4, category: 'Tools' },
        { id: '16', name: 'Jira',                    level: 4, category: 'Tools' },
        { id: '17', name: 'Postman',                 level: 4, category: 'Tools' },
        { id: '18', name: 'Visual Studio Code',      level: 5, category: 'Tools' },
      ],
      projects: [
        {
          id: '1', name: 'IFIN Dealer Portal – Loan Origination Platform',
          description: `Enterprise financial platform used by dealers to manage loan quotes, asset financing, customer onboarding, and finance contracts.\nBuilt UI modules for loan quotation and finance calculation workflows.\nImplemented dynamic forms handling complex financial inputs and validation rules.\nDeveloped reusable UI components for tables, modals, and forms using PrimeNG.\nEnabled seamless user workflows for customer onboarding and asset management.`,
          technologies: 'Angular 18, PrimeNG, Angular Signals, TypeScript, REST APIs', link: ''
        }
      ],
      languages: [
        { id: '1', name: 'English',   proficiency: 'Professional' },
        { id: '2', name: 'Malayalam', proficiency: 'Native'       },
        { id: '3', name: 'Tamil',     proficiency: 'Conversational'},
        { id: '4', name: 'Hindi',     proficiency: 'Conversational'},
        { id: '5', name: 'Telugu',    proficiency: 'Basic'        },
      ],
      softSkills: [
        { id: '1', name: 'Problem Solving'    },
        { id: '2', name: 'Communication'      },
        { id: '3', name: 'Team Collaboration' },
        { id: '4', name: 'Critical Thinking'  },
        { id: '5', name: 'Adaptability'       },
      ],
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
  }

  onDataChange() {
    this.saveStatus = 'saving';
    clearTimeout(this.autoSaveTimer);
    this.autoSaveTimer = setTimeout(() => {
      localStorage.setItem('resume_maker_data', JSON.stringify(this.resumeData));
      this.saveStatus = 'saved';
      setTimeout(() => (this.saveStatus = 'idle'), 2000);
    }, 800);
  }

  clearAll() {
    if (confirm('Clear all data and reset to default?')) {
      this.resumeData = this.getDefault();
      localStorage.removeItem('resume_maker_data');
    }
  }

  setActiveSection(id: string) { this.activeSection = id; }
  setTemplate(id: 'classic' | 'modern') { this.activeTemplate = id; }

  // Experience
  addExperience() {
    this.resumeData.experiences.push({ id: Date.now().toString(), company: '', position: '', startDate: '', endDate: '', isCurrent: false, description: '' });
    this.onDataChange();
  }
  removeExperience(id: string) { this.resumeData.experiences = this.resumeData.experiences.filter(e => e.id !== id); this.onDataChange(); }

  // Education
  addEducation() {
    this.resumeData.education.push({ id: Date.now().toString(), institution: '', degree: '', field: '', startDate: '', endDate: '', grade: '' });
    this.onDataChange();
  }
  removeEducation(id: string) { this.resumeData.education = this.resumeData.education.filter(e => e.id !== id); this.onDataChange(); }

  // Skills
  addSkill() { this.resumeData.skills.push({ id: Date.now().toString(), name: '', level: 3, category: 'Frontend', customCategory: '' }); this.onDataChange(); }
  removeSkill(id: string) { this.resumeData.skills = this.resumeData.skills.filter(s => s.id !== id); this.onDataChange(); }

  // Projects
  addProject() { this.resumeData.projects.push({ id: Date.now().toString(), name: '', description: '', technologies: '', link: '' }); this.onDataChange(); }
  removeProject(id: string) { this.resumeData.projects = this.resumeData.projects.filter(p => p.id !== id); this.onDataChange(); }

  // Languages
  addLanguage() { this.resumeData.languages.push({ id: Date.now().toString(), name: '', proficiency: 'Conversational' }); this.onDataChange(); }
  removeLanguage(id: string) { this.resumeData.languages = this.resumeData.languages.filter(l => l.id !== id); this.onDataChange(); }

  // Soft Skills
  addSoftSkill() { this.resumeData.softSkills.push({ id: Date.now().toString(), name: '' }); this.onDataChange(); }
  removeSoftSkill(id: string) { this.resumeData.softSkills = this.resumeData.softSkills.filter(s => s.id !== id); this.onDataChange(); }

  // Grouped skills by category — uses customCategory when category is 'Other'
  get skillCategories(): string[] {
    const cats = this.resumeData.skills.map(s =>
      s.category === 'Other' ? (s.customCategory?.trim() || 'Other') : s.category
    );
    return [...new Set(cats)].filter(c => c.length > 0);
  }

  getSkillsByCategory(cat: string) {
    return this.resumeData.skills.filter(s => {
      const resolved = s.category === 'Other' ? (s.customCategory?.trim() || 'Other') : s.category;
      return resolved === cat;
    });
  }

  getSkillLevelLabel(level: number): string {
    return ['', 'Beginner', 'Elementary', 'Intermediate', 'Advanced', 'Expert'][level] ?? '';
  }

  getSkillDots(): number[] { return [1, 2, 3, 4, 5]; }

  formatDate(dateStr: string): string {
    if (!dateStr) return '';
    const [year, month] = dateStr.split('-');
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return `${months[parseInt(month, 10) - 1]} ${year}`;
  }

  formatYear(dateStr: string): string { return dateStr ? dateStr.split('-')[0] : ''; }

  printResume() { window.print(); }

  get isResumeEmpty(): boolean {
    return !this.resumeData.personalInfo.fullName && this.resumeData.experiences.length === 0;
  }

  // Style helpers for template binding
  get resumeStyles(): any {
    const s = this.resumeData.styleConfig;
    return {
      '--accent':           s.accentColor,
      '--heading-size':     s.headingFontSize + 'px',
      '--section-title-sz': s.sectionTitleSize + 'px',
      '--body-size':        s.bodyFontSize + 'px',
      '--heading-weight':   s.headingFontWeight,
      '--section-title-wt': s.sectionTitleWeight,
      '--font-family':      s.fontFamily,
    };
  }
}