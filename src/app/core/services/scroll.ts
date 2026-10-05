import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Scroll {
  readonly activeSection = signal<string | null>(null);

  scrollToSection(sectionId: string): void {
    this.activeSection.set(sectionId);

    const element = document.getElementById(sectionId);

    if (element === null) {
      return;
    }
    const startPosition = window.scrollY;
    const targetPosition = element.getBoundingClientRect().top + window.scrollY;
    const duration = 300;

    let startTime: number | null = null;

    const animateScroll = (currentTime: number): void => {
      if (startTime === null) {
        startTime = currentTime;
      }

      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);

      const easedProgress = 1 - Math.pow(1 - progress, 2);
      const currentPosition = startPosition + (targetPosition - startPosition) * easedProgress;
      window.scrollTo(0, currentPosition);

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  }

  scrollToTop(): void {
    this.activeSection.set(null);

    const startPosition = window.scrollY;
    const duration = 300;

    let startTime: number | null = null;

    const animateScroll = (currentTime: number): void => {
      if (startTime === null) {
        startTime = currentTime;
      }

      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);

      const easedProgress = 1 - Math.pow(1 - progress, 2);
      const currentPosition = startPosition * (1 - easedProgress);
      window.scrollTo(0, currentPosition);

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  }
}
