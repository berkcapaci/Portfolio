import { Component } from '@angular/core';
import { Hero } from '../../features/hero/hero';
import { About } from '../../features/about/about';

@Component({
  imports: [Hero,About ],
  selector: 'app-home',
  styleUrl: './home.scss',
  templateUrl: './home.html',
})
export class Home {}
