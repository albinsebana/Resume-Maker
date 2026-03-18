import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ResumeData } from '../../resume.model';

@Component({
  selector: 'app-languages-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './languages-form.html',
  styleUrl: './languages-form.scss'
})
export class LanguagesFormComponent {
  @Input()  resumeData!: ResumeData;
  @Output() dataChange = new EventEmitter<ResumeData>();

  proficiencies = ['Native', 'Professional', 'Conversational', 'Basic'];

  add() {
    this.resumeData.languages.push({
      id: Date.now().toString(),
      name: '', proficiency: 'Conversational'
    });
    this.emit();
  }

  remove(id: string) {
    this.resumeData.languages = this.resumeData.languages.filter(l => l.id !== id);
    this.emit();
  }

  emit() { this.dataChange.emit({ ...this.resumeData }); }
}