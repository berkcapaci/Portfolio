import {
  Component,
  effect,
  signal,
  ElementRef,
  QueryList,
  ViewChildren,
  ViewChild,
  HostListener,
} from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { SKILLS } from '../../core/data/skills-data';

@Component({
  imports: [TranslatePipe],
  selector: 'app-projects',
  styleUrl: './projects.scss',
  templateUrl: './projects.html',
})
export class Projects {
  protected readonly projects = [
    {
      number: '01',
      name: 'Join',
      descriptionKey: 'projects.items.join.description',
      technologies: ['Angular', 'TypeScript', 'CSS', 'HTML', 'Supabase'],
      githubUrl: 'https://github.com/berkcapaci/ElPolloLoco',
      liveUrl: 'https://berkcapaci.developerakademie.net/ElPolloLoco/index.html',
      image: 'images/projects/join_optimized.jpg',
    },
    {
      number: '02',
      name: 'El Pollo Loco',
      descriptionKey: 'projects.items.elPolloLoco.description',
      technologies: ['JavaScript', 'HTML', 'CSS'],
      githubUrl: 'https://github.com/berkcapaci/ElPolloLoco',
      liveUrl: 'https://berkcapaci.developerakademie.net/ElPolloLoco/index.html',
      image: 'images/projects/ElPolloLoco_optimized.jpg',
    },
    {
      number: '03',
      name: 'Pokedex',
      descriptionKey: 'projects.items.pokedex.description',
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

  constructor() {
    effect((onCleanup) => {
      if (this.selectedIndex() === null) {
        return;
      }

      const root = document.documentElement;
      const scrollbarWidth = window.innerWidth - root.clientWidth;
      root.style.overflow = 'hidden';
      root.style.paddingRight = `${scrollbarWidth}px`;

      onCleanup(() => {
        root.style.overflow = '';
        root.style.paddingRight = '';
      });
    });
  }

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

  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    if (this.selectedIndex() !== null) {
      this.closeModal();
    }
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
