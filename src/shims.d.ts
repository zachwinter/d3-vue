declare module '*.vue' {
  import { type DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module '*.svg' {
  export default '';
}

declare module '*.glsl' {
  const value: string;
  export {};
}

declare module 'window' {
  const GLSLX: any;
  export {};
}
declare module '~pages' {
  export {};
}

export {};
