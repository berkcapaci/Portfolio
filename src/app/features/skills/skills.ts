import { Component } from '@angular/core';
import { Scroll } from '../../core/services/scroll';

@Component({
  selector: 'app-skills',
  imports: [],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
})
export class Skills {
  constructor(private scrollService: Scroll) {}

  protected onLetsTalkClick(event: Event): void {
    event.preventDefault();
    this.scrollService.scrollToSection('contact');
  }

  protected readonly skillList = [
    { name: 'HTML', icon: 'icons/skillsetphotos/HTML.svg' },
    { name: 'CSS', icon: 'icons/skillsetphotos/CSS.svg' },
    { name: 'JavaScript', icon: 'icons/skillsetphotos/JavaScript.svg' },
    { name: 'Material Design', icon: 'icons/skillsetphotos/MaterialDesign.svg' },
    { name: 'TypeScript', icon: 'icons/skillsetphotos/TypeScript.svg' },
    { name: 'Angular', icon: 'icons/skillsetphotos/Angular.svg' },
    { name: 'Supabase', icon: 'icons/skillsetphotos/Supabase.svg' },
    { name: 'Git', icon: 'icons/skillsetphotos/Git.svg' },
    { name: 'REST-API', icon: 'icons/skillsetphotos/Rest-Api.svg' },
    { name: 'Scrum', icon: 'icons/skillsetphotos/Scrum.svg' },
    { name: 'Growth mindset', icon: 'icons/skillsetphotos/GrowthMindset.svg' },
  ];
}
