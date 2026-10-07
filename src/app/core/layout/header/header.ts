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

  private readonly sectionIds = ['hero', 'about', 'skills', 'projects'];
  private observer?: IntersectionObserver;

  constructor(
    private scrollService: Scroll,
    private router: Router,
  ) {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.isMenuOpen.set(false);
      const path = this.router.url.split('#')[0];
      this.showLangToggle.set(path !== '/impress' && path !== '/privacy-policy');

      if (path === '/') {
        // Sections are created after navigation, so wait one tick before observing them
        setTimeout(() => this.observeSections());
      } else {
        this.observer?.disconnect();
        this.scrollService.activeSection.set(null);
      }
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

    this.observeSections();
  }

  private observeSections(): void {
    this.observer?.disconnect();

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.scrollService.activeSection.set(
              entry.target.id === 'hero' ? null : entry.target.id,
            );
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
    this.isMenuOpen.set(false); // Closes the mobile menu once a link is tapped

    const path = this.router.url.split('#')[0];
    if (path === '/') {
      this.scrollService.scrollToSection(sectionId);
    }
  }

  protected onLogoClick(event: Event): void {
    event.preventDefault();
    this.isMenuOpen.set(false);

    const path = this.router.url.split('#')[0];
    if (path === '/') {
      this.scrollService.scrollToTop();
    } else {
      this.router.navigate(['/']);
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.isMenuOpen()) {
      return;
    }

    const target = event.target as Element | null;
    if (!target?.closest('.mobile-menu, .menu-button')) {
      this.isMenuOpen.set(false);
    }
  }

  @HostListener('window:resize')
  onResize() {
    if (window.innerWidth > 768) {
      this.isMenuOpen.set(false);
    }
  }
}
