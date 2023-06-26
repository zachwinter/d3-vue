<template>
  <main>
    <SyncedCharts>
      <LineChart v-bind="props" />
      <LineChart v-bind="props" />
      <LineChart v-bind="props" />
      <LineChart v-bind="props" />
    </SyncedCharts>
  </main>
</template>

<script setup lang="ts">
import { generateMockData } from '../util/mock';

const viewport = useViewport();

const props = computed(() => ({
  width: viewport.width / 2 - 50,
  height: viewport.height / 2 - 50,
  dataset: generateMockData(365 * 100, 100),
  zoomX: true,
}));
</script>

<style lang="scss" scoped>
main {
  @include size(100vw, 100vh);
  display: flex;
  flex-wrap: wrap;
  padding: 50px;
}
</style>
