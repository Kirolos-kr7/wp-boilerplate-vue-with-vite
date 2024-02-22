<script setup lang="ts">
import { Check } from 'lucide-vue-next'
import { ref } from 'vue'
import { FormEl } from '../../types'
import Actions from '../Actions.vue'

const live = ref(false)
const { el } = defineProps<{ el: FormEl }>()
</script>

<template>
  <div
    @mouseover="live = true"
    @mouseleave="live = false"
    class="relative w-full"
  >
    <div class="flex items-center gap-2">
      <div
        class="w-4 h-4 bg-blue-400 rounded border flex items-center justify-center"
      >
        <Check :size="12" class="text-white -translate-x-[0.5px]" />
      </div>
      <label class="mb-0">{{ el.label }}</label>
    </div>

    <Actions :live="live" class="translate-y-2" :serial="el.serial" />
  </div>
</template>
