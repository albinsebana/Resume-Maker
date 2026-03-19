import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar implements OnInit, OnDestroy {
  isOpen = false;

  // Static instance so resume-builder can call open() directly
  static instance: Navbar | null = null;

  constructor(private router: Router) {}

  ngOnInit()    { Navbar.instance = this; }
  ngOnDestroy() { Navbar.instance = null; document.body.style.overflow = ''; }

  open() {
    this.isOpen = true;
    document.body.style.overflow = 'hidden';  // prevent scroll behind overlay
  }

  close() {
    this.isOpen = false;
    document.body.style.overflow = '';
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  logout() {
    this.close();
    localStorage.clear();
    this.router.navigate(['/home']);
  }
}