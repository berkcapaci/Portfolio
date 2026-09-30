import { Component, signal, ElementRef, QueryList, ViewChildren, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SKILLS } from '../../core/data/skills-data';

@Component({
  imports: [],
  selector: 'app-projects',
  styleUrl: './projects.scss',
  templateUrl: './projects.html',
})
export class Projects {
  protected readonly projects = [
    {
      number: '01',
      name: 'Join',
      description:
        'Task manager inspired by the Kanban System. Create and organize tasks using drag and drop functions, assign users and categories.',
      technologies: ['Angular', 'TypeScript', 'CSS', 'HTML', 'Supabase'],
      githubUrl: 'https://github.com/berkcapaci/ElPolloLoco',
      liveUrl: 'https://berkcapaci.developerakademie.net/ElPolloLoco/index.html',
      image: 'images/projects/join_optimized.jpg',
    },
    {
      number: '02',
      name: 'El Pollo Loco',
      description:
        'Jump, run and throw game based on object-oriented approach. Help Pepe to find coins and tabasco salsa to fight against the crazy hen.',
      technologies: ['JavaScript', 'HTML', 'CSS'],
      githubUrl: 'https://github.com/berkcapaci/ElPolloLoco',
      liveUrl: 'https://berkcapaci.developerakademie.net/ElPolloLoco/index.html',
      image: 'images/projects/ElPolloLoco_optimized.jpg',
    },
    {
      number: '03',
      name: 'Pokedex',
      description:
        'Responsive Pokédex that fetches live data from the PokéAPI. Browse Pokémon cards, search by name, and explore detailed stats, types and evolution chains in an interactive dialog.',
      technologies: ['JavaScript', 'HTML', 'CSS'],
      githubUrl: 'https://github.com/berkcapaci/Pokedex',
      liveUrl: 'https://berkcapaci.developerakademie.net/Pokedex/index.html',
      image: 'images/projects/pokedex.png',
      bgColor: '#f7d02c',
    },
  ];

  protected readonly hoveredIndex = signal<number | null>(null);
  protected readonly previewTop = signal(0);
  protected readonly selectedIndex = signal<number | null>(null);

  @ViewChildren('projectRow') private projectRows!: QueryList<ElementRef<HTMLElement>>;
  @ViewChild('projectsList') private projectsList!: ElementRef<HTMLElement>;

  protected onRowHover(index: number): void {
    this.hoveredIndex.set(index);

    const rows = this.projectRows.toArray();
    const row = rows[index]?.nativeElement;
    const listEl = this.projectsList?.nativeElement;

    if (!row || !listEl) {
      return;
    }

    const previewHeight = 192;
    const listRect = listEl.getBoundingClientRect();

    let finalTop: number;

    if (index === 0) {
      finalTop = -10;
    } else if (index === rows.length - 1) {
      finalTop = listRect.height - previewHeight + 10;
    } else {
      const rowRect = row.getBoundingClientRect();
      const rowCenterFromListTop = rowRect.top - listRect.top + rowRect.height / 2;
      finalTop = rowCenterFromListTop - previewHeight / 2;
    }

    this.previewTop.set(finalTop);
  }

  protected techIcon(tech: string): string {
    const skill = SKILLS.find((s) => s.name === tech);
    return skill?.iconTeal ?? skill?.icon ?? '';
  }

  protected openModal(index: number): void {
    this.selectedIndex.set(index);
  }

  protected closeModal(): void {
    this.selectedIndex.set(null);
  }

  protected nextProject(): void {
    const current = this.selectedIndex();
    if (current === null) {
      return;
    }
    this.selectedIndex.set((current + 1) % this.projects.length);
  }
}
