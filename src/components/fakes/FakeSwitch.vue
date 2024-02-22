<script setup lang="ts">
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
      <div class="w-10 h-5 bg-blue-400 rounded-full border relative">
        <span
          class="inline-block w-4 h-4 bg-white rounded-full absolute top-px right-px"
        ></span>
      </div>
      <label class="mb-0">{{ el.label }}</label>
    </div>

    <Actions :live="live" class="translate-y-2" :serial="el.serial" />
  </div>
</template>
