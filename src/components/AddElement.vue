<script setup lang="ts">
import { ElButton } from 'element-plus'
import { X } from 'lucide-vue-next'
import { ref } from 'vue'
import draggable from 'vuedraggable'
import { random, uniqueId } from '../helper'
import { getStore } from '../store'
import { ElementType, FormEl, baseELements } from '../types'

const { dragging, adding, elements } = getStore()

const getBaseElement = (initial: ElementType): FormEl => {
  const unique = uniqueId(initial, elements.value)

  return {
    serial: random(),
    type: initial,
    id: unique,
    placeholder: unique,
    label: unique,
    ...(initial == 'radio' ? { options: ['option 1', 'option 2'] } : {})
  }
}

const getBaseElements = (): FormEl[] =>
  baseELements.map((val) => getBaseElement(val))

const baseElements = ref<FormEl[]>(getBaseElements())
</script>

<template>
  <transition name="slide-left" mode="out-in">
    <aside
      v-if="adding"
      class="w-96 bg-white shadow-sm h-[calc(100vh-125px)] sticky top-[6.8rem] rounded-md p-3 transition-all self-start"
    >
      <div class="flex justify-between items-center">
        <h2 class="text-xl font-bold">Add Element</h2>

        <ElButton circle icon @click="adding = false">
          <X :size="20" />
        </ElButton>
      </div>

      <div @mousedown="baseElements = getBaseElements()">
        <draggable
          :group="{ name: 'elements', pull: 'clone', put: false }"
          :list="baseElements"
          item-key="key"
          @start="dragging = true"
          @end="dragging = false"
          as="div"
          :sort="false"
          class="grid md:grid-cols-3 gap-3 py-5"
        >
          <template #item="{ element: el }">
            <button
              @click="elements.push(el as any)"
              class="bg-slate-100 p-3 max-h-12 rounded grid place-content-center font-black uppercase truncate"
            >
              {{ el.type }}
            </button>
          </template>
        </draggable>
      </div>
    </aside>
  </transition>
</template>
