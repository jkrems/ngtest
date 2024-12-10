import { InputSignal, Type } from '@angular/core';
import { Data, Routes, Route } from '@angular/router';
import { CounterComponent } from './counter.component';

type ComponentInputs<Component> = {
  [Property in keyof Component as Component[Property] extends InputSignal<any> ? Property : never]:
      Component[Property] extends InputSignal<infer InputType> ? InputType : never;
};

interface ComponentRoute<Component, DataInputs extends Data = Partial<ComponentInputs<Component>>> extends Route {
    component: Type<Component>;
    data?: DataInputs;
}

type CounterInputs = ComponentInputs<CounterComponent>;

export const routes: Routes = [
    {
        path: '',
        component: CounterComponent,
        data: {
            label: 'foo',
        },
    } satisfies ComponentRoute<CounterComponent>,
];
