import { Component } from '@angular/core';
import { HeroComponent } from './components/hero/hero.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeroComponent],
  template: `<app-hero></app-hero>`,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'motion-portfolio';
}
