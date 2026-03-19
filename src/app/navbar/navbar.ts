import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  isOpen = false;

  constructor(private router: Router) {}

  open()  { this.isOpen = true;  document.body.style.overflow = 'hidden'; }
  close() { this.isOpen = false; document.body.style.overflow = ''; }
  toggle() { this.isOpen ? this.close() : this.open(); }

  navigate(path: string) {
    this.close();
    this.router.navigate([path]);
  }

  logout() {
    this.close();
    this.router.navigate(['/home']);
  }

  // Expose open() for external trigger (called from resume-builder)
  static instance: Navbar | null = null;

  ngOnInit()    { Navbar.instance = this; }
  ngOnDestroy() { Navbar.instance = null; document.body.style.overflow = ''; }
}