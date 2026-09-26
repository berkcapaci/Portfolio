import { Component } from '@angular/core';
import { Hero } from '../../features/hero/hero';
import { About } from '../../features/about/about';
import { Skills } from '../../features/skills/skills';

@Component({
  imports: [Hero,About,Skills ],
  selector: 'app-home',
  styleUrl: './home.scss',
  templateUrl: './home.html',
})
export class Home {}
