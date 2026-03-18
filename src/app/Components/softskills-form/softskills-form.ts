import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ResumeData } from '../../resume.model';

@Component({
  selector: 'app-softskills-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './softskills-form.html',
  styleUrl: './softskills-form.scss'
})
export class SoftskillsFormComponent {
  @Input()  resumeData!: ResumeData;
  @Output() dataChange = new EventEmitter<ResumeData>();

  add() {
    this.resumeData.softSkills.push({
      id: Date.now().toString(), name: ''
    });
    this.emit();
  }

  remove(id: string) {
    this.resumeData.softSkills = this.resumeData.softSkills.filter(s => s.id !== id);
    this.emit();
  }

  emit() { this.dataChange.emit({ ...this.resumeData }); }
}