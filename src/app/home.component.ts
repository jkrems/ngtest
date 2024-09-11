import { input, ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  // selector: 'app-home',
  template: `{{ name() }}`,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  // @ts-ignore
  signals: true,
})
export class HomeComponent {
  name = input('Quinn');
}
