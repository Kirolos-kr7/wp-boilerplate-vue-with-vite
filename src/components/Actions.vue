<script setup lang="ts">
import { ElButton } from 'element-plus'
import { Edit2, X } from 'lucide-vue-next'
import { getStore } from '../store'

withDefaults(
  defineProps<{ live: boolean; noDelete?: boolean; serial: number | string }>(),
  {
    noDelete: false
  }
)

const { editing, elements } = getStore()

const deleteElement = (elSerial: string | number) => {
  elements.value = elements.value.filter((el) => el.serial != elSerial)
}
</script>

<template>
  <div
    v-if="live"
    class="absolute right-0 pr-2 bottom-1.5 flex items-center space-x-0 gap-1"
  >
    <ElButton icon circle size="small" @click="editing = serial"
      ><Edit2 :size="14"
    /></ElButton>

    <ElButton
      icon
      circle
      size="small"
      @click="deleteElement(serial)"
      v-if="!noDelete"
      ><X :size="16"
    /></ElButton>
  </div>
</template>
