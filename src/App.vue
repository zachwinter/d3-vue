<template>
  <RouterView />
</template>

<script setup lang="ts">
const viewport = useViewport();

function onResize() {
  viewport.update();
}

onMounted(() => {
  window.addEventListener('resize', onResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize);
});
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Inconsolata:wght@300;400;700&display=swap');

@include reset;

body {
  font-family: 'Inconsolata';
  font-weight: 400;
}

main {
  @include size(100vw, 100vh);
  @include flex;
  overflow: hidden;
  flex-wrap: wrap;
}

.outline {
  box-shadow: inset 0 0 0 1px rgba(255, 0, 0, 0.4);
}
</style>
