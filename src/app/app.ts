import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './navbar/navbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar],
  template: `
    <app-navbar></app-navbar>
    <router-outlet></router-outlet>
  `,
  styles: [`
    :host { display: block; height: 100vh; overflow: hidden; }
  `]
})
export class App {}