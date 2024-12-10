import { Component, ChangeDetectionStrategy, input, InputSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  readonly title = input('ngtest');

  foo() {
    return 'foo';
  }
}
