import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './navbar/navbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar],
  template: `
    <app-navbar></app-navbar>
    <main class="app-content">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    .app-content {
      min-height: 100vh;
    }
  `]
})
export class App {
  title = 'resume-maker';
}

// import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
// import { Navbar } from './navbar/navbar';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [RouterOutlet, Navbar],
//   template: `
//   <div class="app-wrapper">
//     <main class="app-content">
//       <router-outlet />
//     </main>
//     <app-navbar />
//   </div>
// `,
//   styles: [`
//     .app-wrapper { display: flex; flex-direction: column; min-height: 100vh; }
//     .app-content { flex: 1; padding-bottom: 72px; }
//   `]
// })
// export class App {
//   title = 'resume-maker';
// }