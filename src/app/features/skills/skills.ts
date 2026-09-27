import { Component } from '@angular/core';
import { Scroll } from '../../core/services/scroll';
import { SKILLS } from '../../core/data/skills-data';

@Component({
  selector: 'app-skills',
  imports: [],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
})
export class Skills {
  protected readonly skillList = SKILLS;
  
  constructor(private scrollService: Scroll) {}

  protected onLetsTalkClick(event: Event): void {
    event.preventDefault();
    this.scrollService.scrollToSection('contact');
  }
}
