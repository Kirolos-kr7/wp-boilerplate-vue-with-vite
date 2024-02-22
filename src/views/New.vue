<script setup lang="ts">
import { ElStep, ElSteps } from 'element-plus'
import { reactive, ref, watch } from 'vue'
import AddElement from '../components/AddElement.vue'
import BasicInfo from '../components/BasicInfo.vue'
import EditElement from '../components/EditElement.vue'
import FormColors from '../components/FormColors.vue'
import FormElements from '../components/FormElements.vue'
import { getStore } from '../store'
import { BasicInfoI, FormColorsI, FormElementsI } from '../types'

const step = ref(2)
const form = reactive<{
  info: BasicInfoI
  colors: FormColorsI
}>({
  info: {
    title: '',
    description: '',
    submitCallback: 'message',
    submitAction: '',
    useCaptcha: true
  },
  colors: {
    backgroundColor: { title: 'Background Color', value: '#ff0fff' },
    titleColor: { title: 'Title Color', value: '#f0ffff' },
    labelColor: { title: 'Label Color', value: '#00ffff' },
    submitButtonColor: { title: 'Submit Button Color', value: '#0f0fff' }
  }
})

const { editing } = getStore()
watch(step, () => {
  if (step.value != 2) editing.value = null
})
</script>

<template>
  <div class="flex gap-6">
    <AddElement />
    <EditElement />

    <div class="flex-1">
      <div class="w-[300px] sm:w-[450px] lg:w-[600px] mx-auto">
        <div class="flex items-center justify-between mb-5">
          <h2 class="text-2xl font-bold">New Form</h2>
          <ElSteps :active="step - 1" class="w-52">
            <ElStep />
            <ElStep />
            <ElStep />
          </ElSteps>
        </div>
        <div class="flex flex-col gap-3 rounded-lg p-3 shadow bg-white">
          <BasicInfo
            :basicInfo="form.info"
            v-if="step == 1"
            @next="
            (info: BasicInfoI) => {
              form.info = info
              step = 2
            }
          "
          />
          <FormElements
            v-if="step == 2"
            @next="(info: FormElementsI) => {
            step = 3
          }"
            @prev="() => (step -= 1)"
          />
          <FormColors
            :formColors="form.colors"
            v-if="step == 3"
            @next="(info: FormColorsI) => {
            form.colors = info
            step = 3
          }"
            @prev="() => (step -= 1)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
