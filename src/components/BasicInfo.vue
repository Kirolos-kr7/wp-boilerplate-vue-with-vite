<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { ElButton } from 'element-plus'
import { BasicInfoI } from '../types.ts'
import Error from './Error.vue'

const emit = defineEmits(['next'])

const { basicInfo } = defineProps<{ basicInfo: BasicInfoI }>()

const rules: Record<keyof BasicInfoI, any> = {
  title: { required },
  description: { required },
  submitCallback: { required },
  submitAction: { required },
  useCaptcha: {}
}

const v$ = useVuelidate(rules, basicInfo)

const handleSubmit = async () => {
  const isValid = (await v$.value.$validate()) || true
  if (isValid) emit('next', basicInfo)
}
</script>

<template>
  <form class="flex flex-col gap-3">
    <div class="flex justify-between">
      <h3 class="text-lg font-semibold mt-0.5">Basic Info</h3>

      <div class="flex items-center justify-end">
        <ElButton @click="handleSubmit">Next</ElButton>
      </div>
    </div>

    <div>
      <label for="title">Title</label>
      <input
        id="title"
        v-model="basicInfo.title"
        class="input"
        placeholder="Title"
      />
      <Error :errors="v$.title?.$errors" />
    </div>

    <div>
      <label for="description">Description</label>
      <textarea
        id="description"
        v-model="basicInfo.description"
        class="input"
        placeholder="Description"
      />
      <Error :errors="v$.description?.$errors" />
    </div>

    <div>
      <label for="submitCallback">Submit Action</label>
      <div class="flex">
        <select
          id="submitCallback"
          v-model="basicInfo.submitCallback"
          class="input w-min rounded-r-none"
          placeholder="Submit Callback"
        >
          <option value="message">Message</option>
          <option value="redirect">Redirect</option>
        </select>
        <input
          id="submitAction"
          v-model="basicInfo.submitAction"
          class="input rounded-l-none border-l-0"
          :placeholder="
            basicInfo.submitCallback == 'message' ? 'Message' : 'Url'
          "
        />
      </div>
      <Error :errors="v$.submitAction?.$errors" />
    </div>

    <div class="flex items-center gap-2">
      <el-switch id="useCaptcha" v-model="basicInfo.useCaptcha" />
      <label class="mb-0" for="useCaptcha">Use Captcha</label>
    </div>
  </form>
</template>
