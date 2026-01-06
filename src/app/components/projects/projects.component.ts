import { Component, ElementRef, ViewChildren, QueryList, inject, AfterViewInit, OnDestroy, PLATFORM_ID, NgZone } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  category: string;
  color: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements AfterViewInit, OnDestroy {
  @ViewChildren('projectCard') projectCards!: QueryList<ElementRef>;

  private platformId = inject(PLATFORM_ID);
  private ngZone = inject(NgZone);
  private triggers: ScrollTrigger[] = [];

  projects: Project[] = [
    { id: 1, title: 'Neon Dreams', category: '3D Motion', color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
    { id: 2, title: 'Abstract Flow', category: 'Interactive', color: 'linear-gradient(135deg, #662D8C 0%, #ED1E79 100%)' },
    { id: 3, title: 'Cyber Punk', category: 'Branding', color: 'linear-gradient(135deg, #0093E9 0%, #80D0C7 100%)' },
    { id: 4, title: 'Glass Morph', category: 'Web Design', color: 'linear-gradient(135deg, #8EC5FC 0%, #E0C3FC 100%)' }
  ];

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      // ⚡ Bolt Optimization: Although ScrollTrigger is usually safe, running the setup
      // outside Angular ensures that the scroll listeners don't trigger frequent CD cycles
      // if GSAP decides to update properties on every scroll tick.
      this.ngZone.runOutsideAngular(() => {
        this.initScrollAnimations();
      });
    }
  }

  private initScrollAnimations() {
    this.projectCards.forEach((card, index) => {
      const el = card.nativeElement;

      const trigger = ScrollTrigger.create({
        trigger: el,
        start: 'top 85%', // Trigger when top of card hits 85% of viewport height
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
        animation: gsap.fromTo(el,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
        )
      });

      this.triggers.push(trigger);
    });
  }

  ngOnDestroy() {
    this.triggers.forEach(t => t.kill());
  }
}
