import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeData } from '../../resume.model';

@Component({
  selector: 'app-creative-template',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './creative-template.html',
  styleUrl: './creative-template.scss',
  encapsulation: ViewEncapsulation.None
})
export class CreativeTemplateComponent {
  @Input() resumeData!: ResumeData;

get styles(): Record<string, string> {
  const s = this.resumeData.styleConfig;
  return {
    '--accent':           s.accentColor,
    '--heading-size':     s.headingFontSize    + 'px',
    '--section-title-sz': s.sectionTitleSize   + 'px',
    '--body-size':        s.bodyFontSize        + 'px',
    '--heading-weight':   s.headingFontWeight,
    '--section-title-wt': s.sectionTitleWeight,
    '--font-family':      s.fontFamily,
    '--page-padding':     (s.pagePadding    ?? 14) + 'mm',   // ← ADD
    '--section-spacing':  (s.sectionSpacing ?? 18) + 'px',   // ← ADD
    '--line-height':      (s.lineHeight     ?? 1.7).toString(), // ← ADD
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
    return ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][+m - 1] + ' ' + y;
  }

  formatYear(d: string): string { return d ? d.split('-')[0] : ''; }

  get isEmpty(): boolean {
    const p = this.resumeData.personalInfo;
    return !p.fullName && !p.email && this.resumeData.experiences.length === 0;
  }
}