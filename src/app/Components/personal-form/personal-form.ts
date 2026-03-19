import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
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
export class PersonalFormComponent implements OnInit {
  @Input()  resumeData!: ResumeData;
  @Output() dataChange = new EventEmitter<ResumeData>();

  ngOnInit() {
    // Patch missing fields for existing saved data
    const p = this.resumeData.personalInfo;
    if (p.linkedin        == null) p.linkedin        = '';
    if (p.portfolio       == null) p.portfolio       = '';
    if (p.linkedinMask    == null) p.linkedinMask    = false;
    if (p.linkedinLabel   == null) p.linkedinLabel   = '';
    if (p.portfolioMask   == null) p.portfolioMask   = false;
    if (p.portfolioLabel  == null) p.portfolioLabel  = '';
    if (p.websiteMask     == null) p.websiteMask     = false;
    if (p.websiteLabel    == null) p.websiteLabel    = '';
  }

  emit() { this.dataChange.emit({ ...this.resumeData }); }
}