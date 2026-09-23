import { Component, HostListener, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Scroll } from '../../services/scroll';

@Component({
  imports: [RouterLink],
  selector: 'app-header',
  styleUrl: './header.scss',
  templateUrl: './header.html',
})
export class Header {
  protected readonly isMenuOpen = signal(false);

  protected toggleMenu(): void {
    this.isMenuOpen.update((current) => !current);
  }

  protected onNavClick(event: Event, sectionId: string): void {
    event.preventDefault();

    if (this.router.url === '/') {
      this.scrollService.scrollToSection(sectionId);
    }
  }

  constructor(
    private scrollService: Scroll,
    private router: Router,
  ) {}

  @HostListener('window:resize')
  onResize() {
    if (window.innerWidth > 768) {
      this.isMenuOpen.set(false);
    }
  }
}
