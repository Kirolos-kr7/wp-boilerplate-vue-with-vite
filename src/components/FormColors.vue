<script setup lang="ts">
import { ElButton } from 'element-plus'

import { FormColorsI } from '../types.ts'

const emit = defineEmits(['next', 'prev'])

const { formColors } = defineProps<{ formColors: FormColorsI }>()
</script>

<template>
  <form class="flex flex-col gap-3">
    <div class="flex justify-between">
      <h3 class="text-lg font-semibold mt-0.5">Form Colors</h3>

      <div class="flex items-center justify-end">
        <ElButton @click="emit('prev')">Prev</ElButton>
        <ElButton @click="emit('next', formColors)">Submit</ElButton>
      </div>
    </div>

    <div class="grid grid-cols-2 items-center gap-8 py-5">
      <div
        v-for="[key, { title }] in Object.entries(formColors)"
        :key="key"
        class="flex flex-col items-center justify-center"
      >
        <label :for="key">{{ title }}</label>
        <ElColorPicker
          :id="key"
          v-model="formColors[key].value"
          @change="(v: string) => (formColors[key].value = v)"
        />
      </div>
    </div>
  </form>
</template>
