<script setup lang="ts">
import AssessmentForm from '@/components/AssessmentForm.vue'
import AssumptionsNotice from '@/components/AssumptionsNotice.vue'
import CtaSection from '@/components/CtaSection.vue'
import IntroSection from '@/components/IntroSection.vue'
import ResultsDrawer from '@/components/ResultsDrawer.vue'
import ResultsPanel from '@/components/ResultsPanel.vue'
import { useMediaQuery } from '@/composables/useMediaQuery'

// Matches Tailwind's `lg`. Only one results view is mounted at a time.
const isDesktop = useMediaQuery('(min-width: 1024px)')
</script>

<template>
  <IntroSection />
  <main class="mx-auto max-w-7xl space-y-6 px-4 py-8 max-lg:pb-24 sm:px-6 sm:py-10">
    <div class="grid items-start gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
      <AssessmentForm />
      <div v-if="isDesktop" class="sticky top-6">
        <ResultsPanel />
      </div>
    </div>
    <AssumptionsNotice />
    <CtaSection />
  </main>
  <ResultsDrawer v-if="!isDesktop" />
</template>
