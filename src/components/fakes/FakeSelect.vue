<script setup lang="ts">
import { ref } from 'vue'
import { FormEl } from '../../types'
import Actions from '../Actions.vue'

const live = ref(false)
const { el } = defineProps<{ el: FormEl }>()
</script>

<template>
  <div
    class="relative w-full"
    @mouseover="live = true"
    @mouseleave="live = false"
  >
    <label v-if="el.label">{{ el.label }}</label>
    <div class="px-3 py-2 w-full border rounded-lg select-none select-icon">
      {{ el.placeholder }}
    </div>

    <Actions :live="live" :serial="el.serial" />
  </div>
</template>
