import { Component } from '@angular/core';
import { Hero } from '../../features/hero/hero';
import { About } from '../../features/about/about';
import { Skills } from '../../features/skills/skills';
import { Projects } from '../../features/projects/projects';
import { Contact } from '../../features/contact/contact';

@Component({
  imports: [Hero, About, Skills, Projects, Contact],
  selector: 'app-home',
  styleUrl: './home.scss',
  templateUrl: './home.html',
})
export class Home {}
