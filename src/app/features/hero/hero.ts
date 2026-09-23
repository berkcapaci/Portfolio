import { Component } from '@angular/core';
import { Scroll } from '../../core/services/scroll';

@Component({
  imports: [],
  selector: 'app-hero',
  styleUrl: './hero.scss',
  templateUrl: './hero.html',
})
export class Hero {
  constructor(private scrollService: Scroll) {}

  protected onCheckWorkClick(event: Event): void {
    event.preventDefault();
    this.scrollService.scrollToSection('projects');
  }

  protected onContactClick(event: Event): void {
    event.preventDefault();
    this.scrollService.scrollToSection('contact');
  }
}
