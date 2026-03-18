import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  constructor(private router: Router) {}

  logout() {
    console.log('Logging out...');
    this.router.navigate(['/home']);
  }
}