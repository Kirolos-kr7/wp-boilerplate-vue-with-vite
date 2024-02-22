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
    <label>{{ el.label }}</label>
    <div class="flex items-center gap-2" v-for="(opt, idx) in el.options">
      <div
        class="w-4 h-4 rounded-full border flex"
        :class="{ 'bg-blue-400': idx == 0 }"
      >
        <span
          class="w-1 h-1 bg-white rounded-full translate-x-[5px] translate-y-[5px]"
        />
      </div>
      {{ opt }}
    </div>

    <Actions :live="live" :serial="el.serial" />
  </div>
</template>
