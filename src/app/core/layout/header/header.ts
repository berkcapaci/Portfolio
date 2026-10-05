import { Component, HostListener, OnInit, OnDestroy, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs/operators';
import { TranslatePipe } from '@ngx-translate/core';
import { Scroll } from '../../services/scroll';
import { Lang, Language } from '../../services/language';

@Component({
  imports: [RouterLink, TranslatePipe],
  selector: 'app-header',
  styleUrl: './header.scss',
  templateUrl: './header.html',
})
export class Header implements OnInit, OnDestroy {
  private readonly language = inject(Language);

  // The same signal the service owns, so the toggle always mirrors the real language
  protected readonly currentLang = this.language.current;
  protected readonly isMenuOpen = signal(false);
  protected readonly showLangToggle = signal(true);

  private readonly sectionIds = ['about', 'skills', 'projects'];
  private observer?: IntersectionObserver;

  constructor(
    private scrollService: Scroll,
    private router: Router,
  ) {
    // Re-evaluates on every completed navigation, not just on first render,
    // so it stays correct even when Angular doesn't otherwise re-check it
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      const path = this.router.url.split('#')[0];
      this.showLangToggle.set(path !== '/impress' && path !== '/privacy-policy');
    });
  }

  protected get activeSection(): string | null {
    return this.scrollService.activeSection();
  }

  protected useLanguage(lang: Lang): void {
    this.language.use(lang);
  }

  ngOnInit(): void {
    // Set the initial value immediately, since the first NavigationEnd
    // may already have fired before this component was constructed
    const path = this.router.url.split('#')[0];
    this.showLangToggle.set(path !== '/impress' && path !== '/privacy-policy');

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.scrollService.activeSection.set(entry.target.id);
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
