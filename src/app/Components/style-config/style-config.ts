import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ResumeData, StyleConfig } from '../../resume.model';

@Component({
  selector: 'app-style-config',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './style-config.html',
  styleUrl: './style-config.scss'
})
export class StyleConfigComponent implements OnInit {
  @Input()  resumeData!: ResumeData;
  @Output() dataChange = new EventEmitter<ResumeData>();

  openSection: string | null = 'global';

  toggle(id: string) {
    this.openSection = this.openSection === id ? null : id;
  }
  isOpen(id: string) { return this.openSection === id; }

  colorPresets = ['#4f46e5','#0ea5e9','#10b981','#ef4444','#f59e0b','#8b5cf6','#000000'];

  fontFamilies = [
    { value: "'Georgia', serif",             label: 'Georgia'        },
    { value: "'Helvetica Neue', sans-serif", label: 'Helvetica'      },
    { value: "'Times New Roman', serif",     label: 'Times New Roman'},
    { value: "'Arial', sans-serif",          label: 'Arial'          },
    { value: "'Garamond', serif",            label: 'Garamond'       },
  ];

  fontWeights = [
    { value: '400', label: 'Regular'    },
    { value: '600', label: 'Semi Bold'  },
    { value: '700', label: 'Bold'       },
    { value: '800', label: 'Extra Bold' },
  ];

  bulletOptions = [
    { value: '•', label: '• Bullet' },
    { value: '–', label: '– Dash'   },
    { value: '▸', label: '▸ Arrow'  },
    { value: '◦', label: '◦ Circle' },
    { value: '▪', label: '▪ Square' },
    { value: '→', label: '→ Right'  },
  ];

  static defaultConfig(): StyleConfig {
    return {
      accentColor:          '#4f46e5',
      fontFamily:           "'Georgia', serif",
      pagePadding:          14,
      pageTopPadding:       6,
      sectionSpacing:       18,
      sectionTitleSize:     12,
      sectionTitleWeight:   '700',
      headingFontSize:      28,
      bodyFontSize:         13,
      headingFontWeight:    '700',
      lineHeight:           1.7,
      langTagBordered:      false,
      softSkillTagBordered: false,

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
        titleFontSize:    14,
        titleFontWeight:  '700',
        companyFontSize:  12,
        companyColor:     'accent',
        dateFontSize:     11,
        bulletChar:       '•',
        bulletFontSize:   13,
        bulletLineHeight: 1.65,
        entrySpacing:     12,
      },
      education: {
        titleFontSize:       14,
        titleFontWeight:     '700',
        institutionFontSize: 12,
        institutionColor:    'accent',
        dateFontSize:        11,
        entrySpacing:        10,
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
        titleFontSize:    14,
        titleFontWeight:  '700',
        techFontSize:     11,
        bulletChar:       '•',
        bulletFontSize:   13,
        bulletLineHeight: 1.65,
        cardBackground:   true,
      },
      languages: {
        tagBordered: false,
        fontSize:    12,
        tagPaddingH: 10,
        tagPaddingV: 3,
        tagGap:      5,
      },
      softSkills: {
        tagBordered: false,
        fontSize:    12,
        tagPaddingH: 10,
        tagPaddingV: 3,
        tagGap:      5,
      },
    };
  }

  ngOnInit() { this.patchMissingFields(); }

  patchMissingFields() {
    const def = StyleConfigComponent.defaultConfig();
    const s   = this.resumeData.styleConfig;

    if (!s.personal)   s.personal   = def.personal;
    if (!s.experience) s.experience = def.experience;
    if (!s.education)  s.education  = def.education;
    if (!s.skills)     s.skills     = def.skills;
    if (!s.projects)   s.projects   = def.projects;
    if (!s.languages)  s.languages  = def.languages;
    if (!s.softSkills) s.softSkills = def.softSkills;

    // Global
    if (s.pagePadding          == null) s.pagePadding          = 14;
    if (s.pageTopPadding       == null) s.pageTopPadding       = 6;
    if (s.sectionSpacing       == null) s.sectionSpacing       = 18;
    if (s.lineHeight           == null) s.lineHeight           = 1.7;
    if (s.bodyFontSize         == null) s.bodyFontSize         = 13;
    if (s.langTagBordered      == null) s.langTagBordered      = false;
    if (s.softSkillTagBordered == null) s.softSkillTagBordered = false;

    // Personal
    if (s.personal.summaryTopGap  == null) s.personal.summaryTopGap  = 18;
    if (s.personal.summaryPadding == null) s.personal.summaryPadding = 0;

    // Skills
    if (s.skills.rowGap         == null) s.skills.rowGap         = 6;
    if (s.skills.headerSkillGap == null) s.skills.headerSkillGap = 8;
    if (s.skills.tagPaddingH    == null) s.skills.tagPaddingH    = 8;

    // Languages
    if (s.languages.tagPaddingH == null) s.languages.tagPaddingH = 10;
    if (s.languages.tagPaddingV == null) s.languages.tagPaddingV = 3;
    if (s.languages.tagGap      == null) s.languages.tagGap      = 5;

    // Soft Skills
    if (s.softSkills.tagPaddingH == null) s.softSkills.tagPaddingH = 10;
    if (s.softSkills.tagPaddingV == null) s.softSkills.tagPaddingV = 3;
    if (s.softSkills.tagGap      == null) s.softSkills.tagGap      = 5;
  }

  setColor(color: string) {
    this.resumeData.styleConfig.accentColor = color;
    this.emit();
  }

  resetAll() {
    if (!confirm('Reset ALL styles to defaults?')) return;
    this.resumeData.styleConfig = StyleConfigComponent.defaultConfig();
    this.emit();
  }

  resetSection(section: string) {
    const def = StyleConfigComponent.defaultConfig() as any;
    const s   = this.resumeData.styleConfig as any;
    if (def[section]) s[section] = { ...def[section] };
    this.emit();
  }

  resolveColor(val: string): string {
    return val === 'accent' ? this.resumeData.styleConfig.accentColor : val;
  }

  emit() { this.dataChange.emit({ ...this.resumeData }); }
}