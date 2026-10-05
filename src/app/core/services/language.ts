import { Injectable, inject, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

export type Lang = 'en' | 'de';

const STORAGE_KEY = 'portfolio-lang';
const SUPPORTED: readonly string[] = ['en', 'de'];

@Injectable({ providedIn: 'root' })
export class Language {
  private readonly translate = inject(TranslateService);

  // Single source of truth for the active language (the toggle reads this)
  readonly current = signal<Lang>('en');

  // Runs once at app start: saved choice, then browser language, then English.
  // Returns the loading observable so the app waits for the translation file
  // and never flashes raw keys like "nav.about".
  init(): Observable<unknown> {
    const lang = this.readStored() ?? this.fromBrowser() ?? 'en';
    return this.apply(lang);
  }

  // Runs when the visitor clicks the toggle: applies and remembers the choice
  use(lang: Lang): void {
    this.apply(lang);
    this.store(lang);
  }

  private apply(lang: Lang): Observable<unknown> {
    this.current.set(lang);
    document.documentElement.lang = lang;
    return this.translate.use(lang);
  }

  private fromBrowser(): Lang | null {
    const lang = this.translate.getBrowserLang();
    return this.isSupported(lang) ? lang : null;
  }

  // localStorage can throw (private mode, blocked storage), so both
  // helpers swallow the error and the site simply works without saving
  private readStored(): Lang | null {
    try {
      const value = localStorage.getItem(STORAGE_KEY);
      return this.isSupported(value) ? value : null;
    } catch {
      return null;
    }
  }

  private store(lang: Lang): void {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Not critical, ignore
    }
  }

  private isSupported(value: string | null | undefined): value is Lang {
    return !!value && SUPPORTED.includes(value);
  }
}