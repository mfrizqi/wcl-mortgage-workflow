<script setup lang="ts">
const points = [
  {
    title: 'Illustrative inputs',
    text: 'Every default value is a sample for demonstration. None is a verified industry benchmark. Replace them with your own figures.',
  },
  {
    title: 'Results depend on your setup',
    text: 'Actual outcomes depend on workflow design, exceptions, existing software, and how automation is implemented.',
  },
  {
    title: 'Capacity is not cash',
    text: 'Recovered staff time does not automatically become direct cash savings. It shows capacity that could be redirected.',
  },
  {
    title: 'Limited scope',
    text: 'This covers document handling and borrower follow-ups only. It excludes intake, data entry, underwriting, and closing, and it cannot predict underwriting outcomes, approval rates, or regulatory compliance.',
  },
]
</script>

<template>
  <section aria-labelledby="assumptions-title" class="rounded-2xl border border-line bg-surface p-5 sm:p-8">
    <h2 id="assumptions-title" class="font-display text-xl font-bold">Assumptions and limitations</h2>
    <p class="mt-1 text-sm text-muted">
      Document-handling minutes should exclude follow-up time, which is counted separately to avoid double counting.
    </p>
    <dl class="mt-5 grid gap-x-8 gap-y-5 md:grid-cols-2">
      <div v-for="p in points" :key="p.title" class="border-l-2 border-line pl-4">
        <dt class="font-display font-semibold">{{ p.title }}</dt>
        <dd class="mt-1 text-sm leading-relaxed text-muted">{{ p.text }}</dd>
      </div>
    </dl>
  </section>
</template>
