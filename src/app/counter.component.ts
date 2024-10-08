import { ChangeDetectionStrategy, Component, signal } from "@angular/core";

@Component({
  selector: 'ng-counter',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<h1>{{count()}}</h1>
<button (click)="inc()">Increment</button>
@if (count() < 10 || count() > 20) {
  <p>Take it slow, dude!</p>
  <!-- This won't update when the signal changes. -->
  <em>In if block: {{count()}}</em>
}`,
})
export class CounterComponent {
  count = signal(0);

  inc() {
    this.count.set(this.count() + 1);
  }
}
