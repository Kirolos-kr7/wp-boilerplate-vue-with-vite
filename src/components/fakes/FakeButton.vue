<script setup lang="ts">
import { ref } from 'vue'
import Actions from '../Actions.vue'

defineProps<{ label: string }>()

const live = ref(false)
</script>

<template>
  <div
    class="relative px-3 py-2 w-full border rounded text-center font-medium"
    @mouseover="live = true"
    @mouseleave="live = false"
  >
    {{ label }}

    <Actions :live="live" noDelete serial="submitButton" />
  </div>
</template>
