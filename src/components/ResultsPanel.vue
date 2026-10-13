<script setup lang="ts">
import ResultsBody from './ResultsBody.vue'
</script>

<template>
  <section aria-labelledby="results-title" class="rounded-2xl border border-line bg-surface p-5 sm:p-8">
    <h2 id="results-title" class="mb-3 font-display text-xl font-bold">Estimated results</h2>
    <ResultsBody />
  </section>
</template>
