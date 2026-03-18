import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,   // ← fixes *ngIf, *ngFor
    FormsModule,    // ← fixes [(ngModel)]
  ],
  templateUrl: './settings.html',
  styleUrl: './settings.scss'
})
export class Settings {
  autoSave = true;
  defaultTemplate = 'classic';
  fontStyle = 'serif';

  clearData() {
    if (confirm('Delete all saved resume data? This cannot be undone.')) {
      localStorage.removeItem('resume_maker_data');
      alert('Data cleared successfully.');
    }
  }
}