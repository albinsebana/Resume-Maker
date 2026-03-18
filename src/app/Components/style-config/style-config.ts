import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ResumeData } from '../../resume.model';

@Component({
  selector: 'app-style-config',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './style-config.html',
  styleUrl: './style-config.scss'
})
export class StyleConfigComponent {
  @Input()  resumeData!: ResumeData;
  @Output() dataChange = new EventEmitter<ResumeData>();

  colorPresets = [
    '#4f46e5', '#0ea5e9', '#10b981',
    '#ef4444', '#f59e0b', '#8b5cf6', '#000000'
  ];

  fontFamilies = [
    { value: "'Georgia', serif",             label: 'Georgia (Serif)'    },
    { value: "'Helvetica Neue', sans-serif", label: 'Helvetica (Sans)'   },
    { value: "'Times New Roman', serif",     label: 'Times New Roman'    },
    { value: "'Arial', sans-serif",          label: 'Arial (Sans)'       },
    { value: "'Garamond', serif",            label: 'Garamond (Elegant)' },
  ];

  fontWeights = [
    { value: '400', label: 'Regular (400)'    },
    { value: '600', label: 'Semi Bold (600)'  },
    { value: '700', label: 'Bold (700)'       },
    { value: '800', label: 'Extra Bold (800)' },
    { value: '900', label: 'Black (900)'      },
  ];

  setColor(color: string) {
    this.resumeData.styleConfig.accentColor = color;
    this.emit();
  }

  emit() { this.dataChange.emit({ ...this.resumeData }); }
}