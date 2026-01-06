import { Component } from '@angular/core';
import { HeroComponent } from './components/hero/hero.component';
import { ProjectsComponent } from './components/projects/projects.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeroComponent, ProjectsComponent],
  template: `
    <app-hero></app-hero>
    @defer (on viewport) {
      <app-projects></app-projects>
    } @placeholder {
      <div style="min-height: 100vh; background: #050505;"></div>
    }
  `,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'motion-portfolio';
}
