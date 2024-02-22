<script setup lang="ts">
import { ElButton, ElSwitch } from 'element-plus'
import { RotateCcw, X } from 'lucide-vue-next'
import { computed, ref } from 'vue'
import { getStore } from '../store'
import { FormEl } from '../types'

const { editing, elements, submitButton } = getStore()

const validations = ['required']

const element = computed<FormEl>(() => {
  if (editing.value == 'submitButton') {
    return structuredClone(submitButton.value as FormEl)
  }

  const el = elements.value.find(
    ({ serial }) => editing && editing.value == serial
  ) as FormEl

  return el ? structuredClone(el) : null
})

const selectOption = ref('')
const addOption = () => {
  if (selectOption.value.trim() == '') return

  element.value.options = element.value.options
    ? [...element.value.options, selectOption.value]
    : [selectOption.value]

  selectOption.value = ''
}

const removeOption = (idx: number) => () => {
  element.value.options.splice(idx, 1)
  // element.value.options = structuredClone(element.options)
}

const toggleValidation = (key: string, val: boolean, element: FormEl) => {
  elements.value.map(() => {})

  if (val) {
    element.validations.push(key)
  } else {
    element.validations.splice(element.validations.indexOf(key), 1)
  }
}

const reset = () => {
  if (element.value.type == 'button') {
    submitButton.value = structuredClone(submitButton.value)
    return
  }

  elements.value = structuredClone(elements.value)
}

const save = () => {
  if (element.value.type == 'button') {
    submitButton.value = element.value as any
    return
  }

  elements.value = elements.value.map((el) => {
    if (element.value.serial == el.serial) {
      el = element.value
    }
    return el
  })
}
</script>

<template>
  <transition name="slide-left" mode="out-in">
    <aside
      v-if="element"
      class="bg-white w-96 shadow-sm h-[calc(100vh-125px)] sticky top-[6.8rem] rounded-md flex flex-col overflow-hidden"
    >
      <div class="p-3">
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-bold">Edit Element</h2>

          <div>
            <ElButton circle icon size="small" @click="reset">
              <RotateCcw :size="16" />
            </ElButton>
            <ElButton circle icon size="small" @click="editing = null">
              <X :size="18" />
            </ElButton>
          </div>
        </div>

        <ElButton type="primary" class="w-full mt-3" @click="save"
          >Save</ElButton
        >
      </div>

      <div class="flex flex-col gap-3 py-3 flex-1 overflow-y-auto p-3">
        <div>
          <label for="id">ID</label>
          <input id="id" type="text" v-model="element.id" required />
        </div>

        <div>
          <label for="label">Label</label>
          <input id="label" type="text" v-model="element.label" />
        </div>

        <div v-if="element.placeholder && element.type != 'radio'">
          <label for="placeholder">Placeholder</label>
          <input id="placeholder" type="text" v-model="element.placeholder" />
        </div>

        <form
          @submit.prevent="addOption"
          v-if="element.type == 'select' || element.type == 'radio'"
          class="bg-gray-50 rounded-md p-3 border"
        >
          <label for="newOption">Options</label>

          <div class="flex relative">
            <input
              id="newOption"
              placeholder="Add option"
              type="text"
              class="!py-1.5 !rounded-r-md !pr-12"
              v-model="selectOption"
            />
            <ElButton
              class="absolute top-1/2 -translate-y-1/2 right-px !px-2"
              link
              @click="addOption"
              :disabled="selectOption.trim() == ''"
              >Add</ElButton
            >
          </div>

          <ul class="pt-3" v-if="element.options && element.options.length > 0">
            <li
              v-for="(opt, idx) in element.options"
              class="flex items-center justify-between gap-2 w-full"
            >
              <span>{{ `- ${opt}` }}</span>
              <ElButton circle icon link @click="() => removeOption(idx)">
                <X :size="14" />
              </ElButton>
            </li>
          </ul>
        </form>

        <div
          v-if="element.validations"
          class="px-3 py-2 bg-gray-50 border-2 border-dashed rounded-sm"
        >
          <label for="validations">Validations</label>

          <div class="flex flex-col">
            <div
              class="flex items-center gap-2"
              v-for="validation in validations"
              :key="validation"
            >
              <ElSwitch
                :model-value="element.validations.includes(validation)"
                @change="(v) => toggleValidation(validation, v as boolean, element)"
              /><label class="capitalize">{{ validation }}</label>
            </div>
          </div>
        </div>
      </div>
    </aside>
  </transition>
</template>
