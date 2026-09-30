import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Scroll } from '../../services/scroll';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  private readonly scroll = inject(Scroll);
  private readonly logoHovered = signal(false);

  get logoIcon(): string {
    return this.logoHovered() ? 'icons/logo_hover.svg' : 'icons/logo.svg';
  }

  onLogoHover(state: boolean): void {
    this.logoHovered.set(state);
  }

  scrollToTop(event: Event): void {
    event.preventDefault();
    this.scroll.scrollToTop();
  }
}