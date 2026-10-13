<template>
  <component
    :is="as"
    :class="['relative inline-block overflow-hidden bg-transparent! border-none! rounded-[20px]!', customClass]"
    v-bind="restAttrs"
    :style="componentStyle"
  >
    <div
      class="right-[-250%] bottom-[-11px] z-0 absolute opacity-70 rounded-full w-[300%] h-[50%] animate-star-movement-bottom"
      :style="{
        background: `radial-gradient(circle, ${color}, transparent 10%)`,
        animationDuration: speed
      }"
    ></div>

    <div
      class="top-[-10px] left-[-250%] z-0 absolute opacity-70 rounded-full w-[300%] h-[50%] animate-star-movement-top"
      :style="{
        background: `radial-gradient(circle, ${color}, transparent 10%)`,
        animationDuration: speed
      }"
    ></div>

    <!-- Inner surface adapted to the CTA palette (was #0b0b0b / #333, px-64 py-24). -->
    <div
      class="z-10 relative bg-[#16253d] border border-white/15 rounded-[20px] font-display text-[1.05rem] font-semibold text-white text-center"
    >
    <div class="w-full h-full rounded-[20px] bg-[#ffffff]/20 px-8 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.03),0_8px_24px_rgba(0,0,0,0.1)]">
      <slot />
      </div>
    </div>
  </component>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue';

interface StarBorderProps {
  as?: string;
  customClass?: string;
  color?: string;
  speed?: string;
  thickness?: number;
}

const props = withDefaults(defineProps<StarBorderProps>(), {
  as: 'button',
  customClass: '',
  color: 'white',
  speed: '6s',
  thickness: 1
});

const restAttrs = useAttrs();

const componentStyle = computed(() => {
  const base = {
    padding: `${props.thickness}px 0`
  };
  const userStyle = (restAttrs.style as Record<string, string>) || {};
  return { ...base, ...userStyle };
});
</script>

<style scoped>
@keyframes star-movement-bottom {
  0% {
    transform: translate(0%, 0%);
    opacity: 1;
  }

  100% {
    transform: translate(-100%, 0%);
    opacity: 0;
  }
}

@keyframes star-movement-top {
  0% {
    transform: translate(0%, 0%);
    opacity: 1;
  }

  100% {
    transform: translate(100%, 0%);
    opacity: 0;
  }
}

.animate-star-movement-bottom {
  animation: star-movement-bottom linear infinite alternate;
}

.animate-star-movement-top {
  animation: star-movement-top linear infinite alternate;
}

/* Added: no motion for users who ask for less. */
@media (prefers-reduced-motion: reduce) {
  .animate-star-movement-bottom,
  .animate-star-movement-top {
    animation: none;
  }
}
</style>
