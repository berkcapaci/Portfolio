import { Component, HostListener, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './core/layout/header/header';
import { Footer } from './core/layout/footer/footer';

@Component({
  imports: [RouterOutlet, Header, Footer],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('portfolio-app');
  protected readonly glowTransform = signal('translate(-9999px, -9999px)');

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    const x = event.clientX - 75;
    const y = event.clientY - 75;
    this.glowTransform.set(`translate(${x}px, ${y}px)`);
  }
}