<template>
  <D3 ref="wrapper" v-bind="$props" @tick="tick" @transform="setTransform">
    <slot></slot>
  </D3>
</template>

<script setup lang="ts">
import { ZoomTransform } from 'd3-zoom';
import { type BarChartProps, BaseBarChartProps } from '../../types';
import D3 from '../common/D3.vue';

const props = withDefaults(
  defineProps<BarChartProps>(),
  BaseBarChartProps as any
);

const updateTransform: Function | null = inject('update:transform') as any;

const ctx: Ref<CanvasRenderingContext2D | null> = ref(null);
const wrapper = ref();

async function setTransform(transform: ZoomTransform) {
  wrapper.value?.setTransform?.(transform);
  // syncTick?.(val);
}

function emitTransform(val: ZoomTransform) {
  $emit('transform', val);
  syncTick?.(val);
}

const exposed = {
  setTransform,
  emitTransform,
};

defineExpose(exposed);

sync?.(exposed);

const $emit = defineEmits(['transform']);

watch(
  () => [props.width, props.height, props.dpr],
  () => rescale()
);

async function rescale(transform = props.transform) {
  if (!ctx.value) return;
  await nextTick();
  ctx.value.resetTransform();
  ctx.value.scale(props.dpr, props.dpr);
  ctx.value.fillStyle = props.barColor;
  emitTransform(transform);
  tick();
}

async function tick() {
  const { width, height, lineWidth, data } = props;
  const xScale = wrapper.value.scales.x as any;
  const yScale = wrapper.value.scales.y as any;

  let started = true;
  let finished = false;

  ctx.value?.clearRect(0, 0, width, height);

  const path = new Path2D();

  (data as any[])?.forEach?.((values: any) => {
    if (finished) return;

    const x = xScale?.(values[0]) || null;

    if (x >= 0) {
      if (!started) started = true;
    } else {
      return;
    }

    if (x > width) {
      finished = true;
      return;
    }

    const y = yScale?.(values[1]);

    path?.rect(x - lineWidth / 2, y, lineWidth, height - y);
  });

  ctx.value?.fill(path);
}

onMounted(async () => {
  await nextTick();
  ctx.value = wrapper.value.canvas.getContext('2d') || null;
  ctx.value &&
    (ctx.value.scale(props.dpr, props.dpr),
    (ctx.value.fillStyle = props.barColor));
  tick();
});
</script>
