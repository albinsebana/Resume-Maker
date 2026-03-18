import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ResumeData } from '../../resume.model';

@Component({
  selector: 'app-education-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './education-form.html',
  styleUrl: './education-form.scss'
})
export class EducationFormComponent {
  @Input()  resumeData!: ResumeData;
  @Output() dataChange = new EventEmitter<ResumeData>();

  add() {
    this.resumeData.education.push({
      id: Date.now().toString(),
      institution: '', degree: '', field: '',
      startDate: '', endDate: '', grade: ''
    });
    this.emit();
  }

  remove(id: string) {
    this.resumeData.education = this.resumeData.education.filter(e => e.id !== id);
    this.emit();
  }

  emit() { this.dataChange.emit({ ...this.resumeData }); }
}