import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ResumeData } from '../../resume.model';

@Component({
  selector: 'app-skills-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './skills-form.html',
  styleUrl: './skills-form.scss'
})
export class SkillsFormComponent {
  @Input()  resumeData!: ResumeData;
  @Output() dataChange = new EventEmitter<ResumeData>();

  categories = [
    'Frontend', 'UI Frameworks & Libraries', 'State Management',
    'Backend & APIs', 'Databases', 'Tools', 'Other'
  ];

  add() {
    this.resumeData.skills.push({
      id: Date.now().toString(),
      name: '', level: 3,
      category: 'Frontend', customCategory: ''
    });
    this.emit();
  }

  remove(id: string) {
    this.resumeData.skills = this.resumeData.skills.filter(s => s.id !== id);
    this.emit();
  }

  emit() { this.dataChange.emit({ ...this.resumeData }); }
}