import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardEmployee } from './shared/card/card/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('imal-hr');

 
}
