import { Component, HostListener, OnInit, OnDestroy, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Scroll } from '../../services/scroll';

@Component({
  imports: [RouterLink],
  selector: 'app-header',
  styleUrl: './header.scss',
  templateUrl: './header.html',
})
export class Header implements OnInit, OnDestroy {
  protected readonly isMenuOpen = signal(false);
  protected readonly activeSection = signal<string | null>(null);

  private readonly sectionIds = ['about', 'skills', 'projects'];
  private observer?: IntersectionObserver;

  constructor(
    private scrollService: Scroll,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // rootMargin shrinks the observed area to a thin horizontal line at
    // screen center, so a section only counts as "active" once it crosses
    // the middle of the viewport (not just when it first appears at the edge)
    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.activeSection.set(entry.target.id);
          }
        }
      },
      { rootMargin: '-50% 0px -50% 0px' },
    );

    for (const id of this.sectionIds) {
      const element = document.getElementById(id);
      if (element) {
        this.observer.observe(element);
      }
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  protected toggleMenu(): void {
    this.isMenuOpen.update((current) => !current);
  }

  protected onNavClick(event: Event, sectionId: string): void {
    event.preventDefault();
    this.activeSection.set(sectionId);

    const path = this.router.url.split('#')[0];
    if (path === '/') {
      this.scrollService.scrollToSection(sectionId);
    }
  }

  @HostListener('window:resize')
  onResize() {
    if (window.innerWidth > 768) {
      this.isMenuOpen.set(false);
    }
  }
}
