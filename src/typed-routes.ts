import { Component, input, InputSignal, Type } from '@angular/core';
import {
  Data,
  RedirectFunction,
  UrlMatcher,
  Resolve,
  ResolveFn,
  DefaultExport,
} from '@angular/router';
import { Observable } from 'rxjs';

type SignalInput<T> = ReturnType<typeof input<T>>;

export interface RequiredInput<T> extends SignalInput<T> {
  __required__: true;
}

class DataInput<T> {
  value: T;

  constructor(value: T) {
    this.value = value;
  }
}

type InputBinding<T> = DataInput<T>;

type NonRequiredComponentInputs<Component> = {
  [Property in keyof Component as Component[Property] extends InputSignal<any>
    ? Property
    : never]?: Component[Property] extends InputSignal<infer InputType>
    ? InputBinding<InputType>
    : never;
};

type RequiredComponentInputs<Component> = {
  [Property in keyof Component as Component[Property] extends RequiredInput<any>
    ? Property
    : never]: Component[Property] extends RequiredInput<infer InputType>
    ? InputBinding<InputType>
    : never;
};

export type ComponentInputs<Component> = NonRequiredComponentInputs<Component> &
  RequiredComponentInputs<Component>;

export type ComponentWithoutRequiredInputs<Component> = {
  [Property in keyof Component as Component[Property] extends RequiredInput<any>
    ? Property
    : never]: never;
};

export interface LoadComponentFn<T> {
  ():
    | Type<T>
    | Observable<Type<T> | DefaultExport<Type<T>>>
    | Promise<Type<T> | DefaultExport<Type<T>>>;
}

class ComponentRouteHandler<T = unknown> {
  component?: Type<T>;
  loadComponent?: Function;

  outlet?: string;

  data?: Data;

  constructor(
    inputs: ComponentInputs<T>,
    component?: Type<T>,
    loadComponent?: LoadComponentFn<T>
  ) {
    this.component = component;
    this.loadComponent = loadComponent;

    for (const [key, binding] of Object.entries(inputs)) {
      if (binding instanceof DataInput) {
        this.data ??= {};
        this.data[key] = binding.value;
      } else {
        console.log({ key, binding });
        throw new Error('unsupported binding');
      }
    }
  }

  into(outlet: string) {
    this.outlet = outlet;
  }
}

export function componentWithInputs<T>(
  Class: Type<T>,
  inputs: ComponentInputs<T>
): ComponentRouteHandler {
  return new ComponentRouteHandler(inputs, Class);
}

export function component<T extends ComponentWithoutRequiredInputs<T>>(
  Class: Type<T>
): ComponentRouteHandler {
  return new ComponentRouteHandler<T>({} as ComponentInputs<T>, Class);
}

type RouteHandler = ComponentRouteHandler<unknown>;

class RouteBuilder {
  title?: string | Type<Resolve<string>> | ResolveFn<string>;

  path?: string;
  pathMatch?: 'prefix' | 'full';

  matcher?: UrlMatcher;

  component?: Type<any>;
  loadComponent?: LoadComponentFn<unknown>;
  outlet?: string;

  redirectTo?: string | RedirectFunction;

  data?: Data;

  constructor(
    matcher?: UrlMatcher,
    path?: string,
    pathMatch?: 'prefix' | 'full'
  ) {
    this.path = path;
    this.pathMatch = pathMatch;
    this.matcher = matcher;
  }

  titled(title: string | Type<Resolve<string>> | ResolveFn<string>) {
    this.title = title;
  }

  to(handler: RouteHandler): this {
    Object.assign(this, handler);
    return this;
  }
}

export function data<T>(value: T) {
  return new DataInput(value);
}

export function route(
  path: string,
  pathMatch?: 'prefix' | 'full'
): RouteBuilder;
export function route(matcher: UrlMatcher): RouteBuilder;
export function route(
  matcherOrPath?: UrlMatcher | string,
  pathMatch?: 'prefix' | 'full'
) {
  if (typeof matcherOrPath === 'function') {
    return new RouteBuilder(matcherOrPath, undefined, pathMatch);
  }
  return new RouteBuilder(undefined, matcherOrPath, pathMatch);
}
