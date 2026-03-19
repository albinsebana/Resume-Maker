import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  navOpen = false;

  constructor(private router: Router) {}

  toggleNav() { this.navOpen = !this.navOpen; }
  closeNav()  { this.navOpen = false; }

  // Close nav when clicking outside
  @HostListener('document:click', ['$event'])
  onDocClick(e: Event) {
    const target = e.target as HTMLElement;
    if (!target.closest('.sidenav') && !target.closest('.hamburger-btn')) {
      this.navOpen = false;
    }
  }

  logout() {
    this.navOpen = false;
    this.router.navigate(['/home']);
  }

  navigate(path: string) {
    this.navOpen = false;
    this.router.navigate([path]);
  }
}