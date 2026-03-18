import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ResumeData } from '../../resume.model';

@Component({
  selector: 'app-experience-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './experience-form.html',
  styleUrl: './experience-form.scss'
})
export class ExperienceFormComponent {
  @Input()  resumeData!: ResumeData;
  @Output() dataChange = new EventEmitter<ResumeData>();

  add() {
    this.resumeData.experiences.push({
      id: Date.now().toString(),
      company: '', position: '', startDate: '',
      endDate: '', isCurrent: false, description: ''
    });
    this.emit();
  }

  remove(id: string) {
    this.resumeData.experiences = this.resumeData.experiences.filter(e => e.id !== id);
    this.emit();
  }

  emit() { this.dataChange.emit({ ...this.resumeData }); }
}