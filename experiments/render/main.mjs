import {
  input,
  Injector,
  ɵɵdefineComponent,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵproperty,
  ɵɵconditional,
  ɵɵtextInterpolate,
  ɵɵelement,
  ɵɵelementStart,
  ɵɵelementEnd,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵnextContext,
  runInInjectionContext,
} from "@angular/core";
import * as ns from "@angular/core";

globalThis.ngDevMode = true;

class AppComponent {
  title = input("ngtest");
  showDetails = input(true);
}

function AppComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span");
    ɵɵtext(1, "Some more (static) content.");
    ɵɵelementEnd();
    ɵɵelementStart(2, "strong", 0);
    ɵɵtext(3, "With title");
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance(2);
    ɵɵproperty("title", ctx_r0.title());
  }
}

const def = ɵɵdefineComponent({
  type: AppComponent,
  selectors: [["app-root"]],
  standalone: true,
  features: [ɵɵStandaloneFeature],
  decls: 6,
  vars: 3,
  consts: [[3, "title"]],
  template: function TestCmp_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵelementStart(0, "h1");
      ɵɵtext(1);
      ɵɵelementEnd();
      ɵɵtemplate(2, AppComponent_Conditional_2_Template, 4, 1);
      ɵɵelementStart(3, "em", 0);
      ɵɵtext(4, "With title");
      ɵɵelementEnd();
      ɵɵelement(5, "router-outlet");
    }
    if (rf & 2) {
      ɵɵadvance();
      ɵɵtextInterpolate(ctx.title());
      ɵɵadvance();
      ɵɵconditional(ctx.showDetails() ? 2 : -1);
      ɵɵadvance();
      ɵɵproperty("title", ctx.title());
    }
  },
  encapsulation: 2,
});
AppComponent.ɵcmp = def;
AppComponent.ɵfac = function AppComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || AppComponent)();
};

// Create an instance of the component.
// We need an injector for `input` support, any injector will do.
// 1. Create an injection context.
// 2. runInInjectionContext(injector, cb)
const injector = Injector.create({ name: "root", providers: [] });
let context2;
runInInjectionContext(injector, () => {
  context2 = new AppComponent();
});

const rootViewInjector = injector;
const hostRenderer = {
  createElement(name, ns) {
    console.log("createElement", { name, ns });
    return { createElement: { name, ns } };
  },

  createText(value) {
    console.log("createText", { value });
    return { createText: { value } };
  },

  appendChild(parent, newChild) {
    console.log("appendChild", { parent, newChild });
    return { appendChild: { parent, newChild } };
  },

  createComment(value) {
    console.log("createComment", { value });
    return { createComment: { value } };
  },

  setValue(...args) {
    console.log("setValue", ...args);
    return { setValue: args };
  },

  parentNode(...args) {
    console.log("parentNode", ...args);
    return { parentNode: args };
  },

  insertBefore(parent, newChild, refChild, isMove) {
    console.log("insertBefore", { parent, newChild, refChild, isMove });
    return { insertBefore: { parent, newChild, refChild, isMove } };
  },

  setProperty(el, name, value) {
    console.log("setProperty", { el, name, value });
    return { setProperty: { el, name, value } };
  },
};

const environment = {
  // const rendererFactory = rootViewInjector.get(RendererFactory2, null);
  // const sanitizer = rootViewInjector.get(Sanitizer, null);
  // const changeDetectionScheduler = rootViewInjector.get(
  //   ChangeDetectionScheduler,
  //   null
  // );
  // const environment = {
  //   rendererFactory,
  //   sanitizer,
  //   // We don't use inline effects (yet).
  //   inlineEffectRunner: null,
  //   changeDetectionScheduler,
  // };
};

// We need a separate root view because Angular assumes at least 2 layers exist.
const rootTView = ns.createTView(
  0 /* TViewType.Root */,
  null,
  null,
  1,
  0,
  null,
  null,
  null,
  null,
  null,
  null
);

// Set up tView & lView for our top level component.
// The nested template from `@if` gets its tView at runtime.
def.tView = ns.createTView(
  1 /* TViewType.Component */,
  null,
  def.template,
  def.decls,
  def.vars,
  def.directiveDefs,
  def.pipeDefs,
  def.viewQuery,
  def.schemas,
  def.consts,
  def.id
);
const lView = ns.createLView(
  null,
  def.tView,
  context2,
  /*SignalView= */ 4096 | /* Dirty */ 64 | /* CheckAlways */ 16,
  null,
  /* parent= */ rootTView,
  environment,
  hostRenderer,
  rootViewInjector,
  null,
  /*hydrationInfo=*/ null
);

// Render the template via renderView:
// a. enterView(lView)
// b. executeTemplate(...)
// c. firstCreatePass = false
// d. lView[FLAGS] &= ~4 (???) - clear CheckAlways bit
// e. leaveView()
ns.renderView(def.tView, lView, lView[/*CONTEXT*/ 8]);

// Then, refresh the template via refreshView.
// 1. Clear HasChildViewsToRefresh (8192) and RefreshView (1024)
lView[/*FLAGS*/ 2] &= ~(8192 | 1024);
// 2. Call refreshView
ns.refreshView(def.tView, lView, def.tView.template, lView[/*CONTEXT*/ 8]);

// At this point we have populated all render results (rf=1 and rf=2) in lView.

console.log(lView);
