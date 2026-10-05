import {
  Component,
  ElementRef,
  HostListener,
  afterNextRender,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Scroll } from '../../core/services/scroll';

@Component({
  selector: 'app-hero',
  imports: [TranslatePipe],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  private readonly translate = inject(TranslateService);

  // Tracks the active language as a signal, so anything derived from it
  // (like tickerItems below) recalculates automatically when it changes
  private readonly langChanged = toSignal(this.translate.onLangChange, {
    initialValue: null,
  });

  protected readonly tickerItems = computed(() => {
    this.langChanged(); // read it so this computed re-runs on language change
    return [
      this.translate.instant('hero.ticker.remote'),
      this.translate.instant('hero.ticker.role'),
      this.translate.instant('hero.ticker.location'),
      this.translate.instant('hero.ticker.openToWork'),
    ];
  });

  protected readonly groupRepeats = signal<number[]>([0, 1, 2]);
  protected readonly marqueeDuration = signal(45);

  private readonly marqueeGroup = viewChild<ElementRef<HTMLElement>>('marqueeGroup');
  private readonly pixelsPerSecond = 75;

  constructor(private scrollService: Scroll) {
    afterNextRender(() => this.updateMarquee());
  }

  @HostListener('window:resize')
  onResize(): void {
    this.updateMarquee();
  }

  protected onCheckWorkClick(event: Event): void {
    event.preventDefault();
    this.scrollService.scrollToSection('projects');
  }

  protected onContactClick(event: Event): void {
    event.preventDefault();
    this.scrollService.scrollToSection('contact');
  }

  private updateMarquee(): void {
    const group = this.marqueeGroup()?.nativeElement;
    if (!group) {
      return;
    }

    const setWidth = group.scrollWidth / this.groupRepeats().length;
    const neededRepeats = Math.ceil((window.innerWidth * 1.2) / setWidth) + 1;

    if (neededRepeats !== this.groupRepeats().length) {
      this.groupRepeats.set(Array.from({ length: neededRepeats }, (_, i) => i));
    }

    this.marqueeDuration.set((setWidth * neededRepeats) / this.pixelsPerSecond);
  }
}