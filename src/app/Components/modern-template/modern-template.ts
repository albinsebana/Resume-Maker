import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeData } from '../../resume.model';

@Component({
  selector: 'app-modern-template',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modern-template.html',
  styleUrl: './modern-template.scss',
  encapsulation: ViewEncapsulation.None
})
export class ModernTemplateComponent {
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

  formatDate(dateStr: string): string {
    if (!dateStr) return '';
    const [year, month] = dateStr.split('-');
    const months = ['Jan','Feb','Mar','Apr','May','Jun',
                    'Jul','Aug','Sep','Oct','Nov','Dec'];
    return `${months[parseInt(month, 10) - 1]} ${year}`;
  }

  formatYear(dateStr: string): string {
    return dateStr ? dateStr.split('-')[0] : '';
  }

  get isEmpty(): boolean {
    const p = this.resumeData.personalInfo;
    return !p.fullName && !p.email && !p.jobTitle
      && this.resumeData.experiences.length === 0
      && this.resumeData.education.length === 0;
  }
}