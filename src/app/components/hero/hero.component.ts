import { Component, AfterViewInit, ElementRef, ViewChild, inject, PLATFORM_ID, NgZone } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent implements AfterViewInit {
  @ViewChild('heroContainer') heroContainer!: ElementRef;
  @ViewChild('shape1') shape1!: ElementRef;
  @ViewChild('shape2') shape2!: ElementRef;
  @ViewChild('shape3') shape3!: ElementRef;

  private platformId = inject(PLATFORM_ID);
  private ngZone = inject(NgZone);

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      // ⚡ Bolt Optimization: Run GSAP animations outside Angular Zone
      // This prevents the infinite animation loop from triggering Change Detection on every frame (60fps),
      // which would otherwise cause unnecessary CPU usage and potential jank.
      this.ngZone.runOutsideAngular(() => {
        this.initAnimations();
      });
    }
  }

  private initAnimations() {
    const timeline = gsap.timeline({
      defaults: { ease: 'power3.out', duration: 1 }
    });

    // Animate Text
    const chars = this.heroContainer.nativeElement.querySelectorAll('.char');
    timeline.to(chars, {
      y: 0,
      opacity: 1,
      stagger: 0.05,
      duration: 1.2
    })
    .to('.hero-subtitle', {
      opacity: 1,
      y: 0,
      duration: 1
    }, '-=0.8')
    .to('.cta-button', {
      opacity: 1,
      y: 0,
      duration: 0.8
    }, '-=0.8');

    // Animate Shapes (Continuous floating motion)
    gsap.to(this.shape1.nativeElement, {
      y: 50,
      rotation: 360,
      duration: 20,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    gsap.to(this.shape2.nativeElement, {
      y: -40,
      x: 30,
      rotation: -180,
      duration: 15,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    // Entrance for shapes
    gsap.fromTo([this.shape1.nativeElement, this.shape2.nativeElement, this.shape3.nativeElement],
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 0.8, duration: 2, stagger: 0.3, ease: 'elastic.out(1, 0.5)' }
    );
  }
}
