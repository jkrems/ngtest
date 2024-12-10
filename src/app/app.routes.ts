import { Component, input, Type } from '@angular/core';
import { Routes } from '@angular/router';
import { CounterComponent } from './counter.component';

import {
  component,
  componentWithInputs,
  data,
  RequiredInput,
  route,
} from '../typed-routes';

@Component({
  selector: 'no-inputs',
  template: 'no-inputs: {{ x }}',
})
class NoInputs {
  x = 'static value';
}

@Component({
  selector: 'no-required-inputs',
  template: 'no-required-inputs: {{ x() }}',
})
class NoRequiredInputs {
  x = input('default value');
}

@Component({
  selector: 'required-inputs',
  template: 'required-inputs: {{ x() }}',
})
class RequiredInputs {
  x = input.required<string>();
}

type FixedRequiredInputs = {
  // Mark required input in type system.
  x: RequiredInput<string>;
};

const noInputsRoute = route('no-inputs').to(component(NoInputs));

const noRequiredInputsRoute = route('no-required-inputs').to(
  component(NoRequiredInputs)
);

const requiredInputsRoute = route('required-inputs').to(
  componentWithInputs<FixedRequiredInputs>(
    RequiredInputs as Type<FixedRequiredInputs>,
    {
      x: data('from value'),
    }
  )
);

export const routes: Routes = [
  route('').to(
    componentWithInputs(CounterComponent, {
      // TODO: Why is passing no data for `label` reset the default?
      label: data('Counter'),
      label2: data('from route data'),
    })
  ),
  noInputsRoute,
  noRequiredInputsRoute,
  requiredInputsRoute,
];
