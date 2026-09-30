import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Scroll {
  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);

    if (element === null) {
      return;
    }
    const startPosition = window.scrollY;
    const targetPosition = element.getBoundingClientRect().top + window.scrollY;
    const duration = 300; //  300ms from Figma

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
    const startPosition = window.scrollY;
    const duration = 300; // Consistent with scrollToSection

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
