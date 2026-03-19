import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NavService } from '../nav';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar implements OnInit, OnDestroy {
  isOpen = false;
  private sub: any;

  constructor(
    private router: Router,
    private navService: NavService
  ) {}

  ngOnInit() {
    this.sub = this.navService.isOpen$.subscribe((val: boolean) => {
      this.isOpen = val;
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
    document.body.style.overflow = '';
  }

  close() { this.navService.close(); }

  logout() {
    this.navService.close();
    localStorage.clear();
    this.router.navigate(['/home']);
  }
}