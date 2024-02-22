<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { ElButton } from 'element-plus'
import { Plus } from 'lucide-vue-next'
import { ref } from 'vue'
import draggable from 'vuedraggable'
import Fake from '../components/fakes/Fake.vue'
import { getStore } from '../store'
import { FormElementsI } from '../types.ts'

const emit = defineEmits(['next', 'prev'])
const { adding, elements, submitButton } = getStore()

const rules: FormElementsI = []

const v$ = useVuelidate(rules, elements)

const dragging = ref(false)

const handleSubmit = async () => {
  const isValid = (await v$.value.$validate()) || true
  if (isValid) emit('next', elements)
}
</script>

<template>
  <div class="flex flex-col gap-3">
    <div class="flex justify-between">
      <div class="flex items-center gap-2">
        <h3 class="text-lg font-semibold mt-0.5">Form Elements</h3>
        <ElButton circle icon size="small" @click="adding = true">
          <Plus :size="18" />
        </ElButton>
      </div>

      <div class="flex items-center justify-end">
        <ElButton @click="() => emit('prev')">Prev</ElButton>
        <ElButton @click="handleSubmit">Next</ElButton>
      </div>
    </div>

    <div class="relative">
      <draggable
        group="elements"
        @start="dragging = true"
        @end="dragging = false"
        :list="elements"
        itemKey="serial"
        :animation="150"
        class="flex flex-col gap-3"
        :class="{
          'w-full h-[100px] bg-gray-50 rounded-md ': elements.length == 0
        }"
        removeCloneOnHide
      >
        <template #item="{ element: el }">
          <Fake :el="el" />
        </template>
      </draggable>
      <div
        v-if="elements.length == 0"
        class="text-gray-600 font-semibold text-lg absolute inset-0 grid place-content-center"
      >
        Click on an element or drag one to start.
      </div>
    </div>

    <Fake :el="(submitButton as any)" />
  </div>
</template>
