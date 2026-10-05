import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { Scroll } from '../../services/scroll';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  private readonly scroll = inject(Scroll);
  private readonly router = inject(Router);
  private readonly logoHovered = signal(false);

  get logoIcon(): string {
    return this.logoHovered() ? 'icons/logo_hover.svg' : 'icons/logo.svg';
  }

  onLogoHover(state: boolean): void {
    this.logoHovered.set(state);
  }

  scrollToTop(event: Event): void {
    event.preventDefault();

    const path = this.router.url.split('#')[0];
    if (path === '/') {
      this.scroll.scrollToTop();
    } else {
      this.router.navigate(['/']);
    }
  }
}
