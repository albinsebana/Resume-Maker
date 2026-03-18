import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ResumeData } from '../../resume.model';

@Component({
  selector: 'app-personal-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './personal-form.html',
  styleUrl: './personal-form.scss'
})
export class PersonalFormComponent {
  @Input()  resumeData!: ResumeData;
  @Output() dataChange = new EventEmitter<ResumeData>();

  onPhotoSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || !input.files[0]) return;

    const file = input.files[0];

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (JPG, PNG, etc.)');
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert('Image must be smaller than 2MB');
      return;
    }

    // Convert to base64 and store in resumeData
    const reader = new FileReader();
    reader.onload = (e) => {
      this.resumeData.personalInfo.photo = e.target?.result as string;
      this.emit();
    };
    reader.readAsDataURL(file);
  }

  removePhoto() {
    this.resumeData.personalInfo.photo = undefined;
    this.emit();
  }

  emit() { this.dataChange.emit({ ...this.resumeData }); }
}