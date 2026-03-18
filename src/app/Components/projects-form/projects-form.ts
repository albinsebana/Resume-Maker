import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ResumeData } from '../../resume.model';

@Component({
  selector: 'app-projects-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './projects-form.html',
  styleUrl: './projects-form.scss'
})
export class ProjectsFormComponent {
  @Input()  resumeData!: ResumeData;
  @Output() dataChange = new EventEmitter<ResumeData>();

  add() {
    this.resumeData.projects.push({
      id: Date.now().toString(),
      name: '', description: '', technologies: '', link: ''
    });
    this.emit();
  }

  remove(id: string) {
    this.resumeData.projects = this.resumeData.projects.filter(p => p.id !== id);
    this.emit();
  }

  emit() { this.dataChange.emit({ ...this.resumeData }); }
}