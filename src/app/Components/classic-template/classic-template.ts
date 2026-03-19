import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeData, StyleConfig } from '../../resume.model';

@Component({
  selector: 'app-classic-template',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './classic-template.html',
  styleUrl: './classic-template.scss',
  encapsulation: ViewEncapsulation.None
})
export class ClassicTemplateComponent {
  @Input() resumeData!: ResumeData;

  // Shorthand for template — avoids long resumeData.styleConfig.xxx chains
  get s(): StyleConfig { return this.resumeData.styleConfig; }

  get styles(): Record<string, string> {
    const s = this.resumeData.styleConfig;
    return {
      '--accent':           s.accentColor,
      '--heading-size':     (s.personal.nameFontSize)    + 'px',
      '--section-title-sz': s.sectionTitleSize                   + 'px',
      '--body-size':        s.bodyFontSize                   + 'px',
      '--heading-weight':   s.personal.nameFontWeight,
      '--section-title-wt': s.sectionTitleWeight,
      '--font-family':      s.fontFamily,
      '--page-padding':     s.pagePadding + 'mm',
      '--page-top-padding': s.pageTopPadding  + 'mm',
      '--section-spacing':  s.sectionSpacing + 'px',
      '--line-height':      s.lineHeight.toString(),
      // Bullet char as CSS var — used by .has-bullet::before
      '--bullet-char':      `'${s.experience.bulletChar}'`,
      '--proj-bullet-char': `'${s.projects.bulletChar}'`,
    };
  }

  get skillCategories(): string[] {
    return [...new Set(this.resumeData.skills.map(s =>
      s.category === 'Other' ? (s.customCategory?.trim() || 'Other') : s.category
    ))].filter(c => c.length > 0);
  }

  getSkillsByCategory(cat: string) {
    return this.resumeData.skills.filter(s => {
      const resolved = s.category === 'Other'
        ? (s.customCategory?.trim() || 'Other') : s.category;
      return resolved === cat;
    });
  }

  formatDate(d: string): string {
    if (!d) return '';
    const [y, m] = d.split('-');
    return ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][+m-1] + ' ' + y;
  }

  formatYear(d: string): string { return d ? d.split('-')[0] : ''; }

  get isEmpty(): boolean {
    const p = this.resumeData.personalInfo;
    return !p.fullName && !p.email && !p.jobTitle
      && this.resumeData.experiences.length === 0
      && this.resumeData.education.length === 0;
  }
}