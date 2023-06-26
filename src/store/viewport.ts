import type { ComputedRef, Ref } from 'vue';
import { acceptHMRUpdate, defineStore } from 'pinia';

export const MOBILE_BREAKPOINT: number = 320;
export const TABLET_BREAKPOINT: number = 768;
export const LAPTOP_BREAKPOINT: number = 1280;
export const DESKTOP_BREAKPOINT: number = 1650;

export const useViewport = defineStore('viewport', () => {
  const width: Ref<number> = ref(window.innerWidth);
  const height: Ref<number> = ref(window.innerHeight);
  const dpr: Ref<number> = ref(window.devicePixelRatio);

  function update() {
    width.value = window.innerWidth;
    height.value = window.innerHeight;
    dpr.value = window.devicePixelRatio;
  }

  return {
    width,
    height,
    dpr,
    update,
  };
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useViewport, import.meta.hot));
