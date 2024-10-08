import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './home.component';
import { CounterComponent } from './counter.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CounterComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // @ts-ignore
  signals: true,
})
export class AppComponent {
  title = input('ngtest');

  foo() {
    return 'foo';
  }
}
