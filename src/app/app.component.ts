import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // @ts-ignore
  signals: true,
})
export class AppComponent {
  title = input('ngtest');
}
