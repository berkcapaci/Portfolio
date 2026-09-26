import { Component, signal, ElementRef, QueryList, ViewChildren, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

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
      technologies: ['Angular', 'TypeScript', 'CSS', 'HTML', 'Firebase'],
      githubUrl: 'https://github.com/berkcapaci/ElPolloLoco',
      liveUrl: 'https://berkcapaci.developerakademie.net/ElPolloLoco/index.html',
      image: 'images/projects/join.svg',
    },
    {
      number: '02',
      name: 'El Pollo Loco',
      description:
        'Jump, run and throw game based on object-oriented approach. Help Pepe to find coins and tabasco salsa to fight against the crazy hen.',
      technologies: ['JavaScript', 'HTML', 'CSS'],
      githubUrl: 'https://github.com/berkcapaci/ElPolloLoco',
      liveUrl: 'https://berkcapaci.developerakademie.net/ElPolloLoco/index.html',
      image: 'images/projects/ElPolloLoco.svg',
    },
    {
      number: '03',
      name: 'DA Bubble',
      description:
        'This App is a Slack Clone App. It revolutionizes team communication and collaboration with its intuitive interface, real-time messaging, and robust channel organization.',
      technologies: ['Angular', 'TypeScript', 'Firebase'],
      githubUrl: 'https://github.com/berkcapaci/ElPolloLoco',
      liveUrl: 'https://berkcapaci.developerakademie.net/ElPolloLoco/index.html',
      image: 'images/projects/Bubble.svg',
    },
  ];

  protected readonly hoveredIndex = signal<number | null>(null);
  protected readonly previewTop = signal(0);

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

  protected openModal(index: number): void {
    // sıradaki adımda
  }
}
