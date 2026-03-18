import { Component, Input, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrintDownloadService } from '../print-download';

@Component({
  selector: 'app-download-toolbar',
  standalone: true,          // ← standalone: true fixes NG2012
  imports: [CommonModule],
  templateUrl: './download-toolbar.html',
  styleUrl: './download-toolbar.scss'
})
export class DownloadToolbarComponent {
  @Input() resumeName = 'resume';

  showDropdown = false;
  isLoading    = false;
  loadingLabel = '';

  constructor(
    private printDownload: PrintDownloadService,
    private elRef: ElementRef
  ) {}

  @HostListener('document:click', ['$event'])
  onDocClick(e: Event) {
    if (!this.elRef.nativeElement.contains(e.target)) {
      this.showDropdown = false;
    }
  }

  toggleDropdown() { this.showDropdown = !this.showDropdown; }

  onPrint() {
    this.showDropdown = false;
    this.printDownload.print();
  }

  onDownload(format: 'pdf' | 'html' | 'doc' | 'image') {
    this.showDropdown = false;
    const name = this.resumeName || 'resume';

    switch (format) {
      case 'pdf':
        this.setLoading('Opening PDF…');
        this.printDownload.downloadPdf();
        setTimeout(() => this.clearLoading(), 2000);
        break;
      case 'html':
        this.setLoading('Downloading HTML…');
        this.printDownload.downloadHtml(name);
        setTimeout(() => this.clearLoading(), 1000);
        break;
      case 'doc':
        this.setLoading('Downloading DOC…');
        this.printDownload.downloadDoc(name);
        setTimeout(() => this.clearLoading(), 1000);
        break;
      case 'image':
        this.setLoading('Generating image…');
        this.printDownload.downloadImage(name).then(() => {
          this.clearLoading();
        }).catch(() => this.clearLoading());
        break;
    }
  }

  private setLoading(label: string) {
    this.isLoading    = true;
    this.loadingLabel = label;
  }

  private clearLoading() {
    this.isLoading    = false;
    this.loadingLabel = '';
  }
}