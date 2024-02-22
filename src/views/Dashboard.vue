<script setup lang="ts">
import { ElButton, ElCard, ElDialog, ElSwitch } from 'element-plus'
import { ref } from 'vue'

interface FormT {
  id: number
  name: string
  description: string
  active: boolean
}

const open = ref(false)

const forms = ref<FormT[]>([
  {
    id: 1,
    name: 'Test Form 1',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat in numquam delectus saepe vitae odit deserunt, tempore reprehenderit voluptatem eligendi?',
    active: true
  },
  {
    id: 2,
    name: 'Test Form 2',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat in numquam delectus saepe vitae odit deserunt, tempore reprehenderit voluptatem eligendi?',
    active: false
  },
  {
    id: 3,
    name: 'Test Form 3',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat in numquam delectus saepe vitae odit deserunt, tempore reprehenderit voluptatem eligendi?',
    active: false
  }
])

const selectedForm = ref<FormT | null>()

const handleToggle = (id: number, val: boolean) => {
  forms.value.map((form) => {
    if (form.id == id) form.active = val
    return form
  })
}

const handlePreview = (id: number) => {
  open.value = true
  selectedForm.value = forms.value.find((form) => form.id == id)
}

const handleClose = () => {
  open.value = false
}
</script>

<template>
  <div class="grid md:grid-cols-3 gap-5">
    <el-card v-for="{ id, name, description, active } in forms">
      <template #header>
        <div class="flex items-center justify-between -my-1">
          <h2 class="text-lg">{{ name }}</h2>
          <el-switch
            :value="active"
            @change="(val) => handleToggle(id, val as boolean)"
          />
        </div>
      </template>
      <p>{{ description }}</p>
      <div class="flex items-center justify-end -my-1 mt-5">
        <el-button plain @click="handlePreview(id)">Preview</el-button>
      </div>
    </el-card>
  </div>

  <el-dialog
    v-model="open"
    :title="selectedForm?.name"
    width="500"
    :before-close="handleClose"
  >
    <p>{{ selectedForm?.description }}</p>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose">Close</el-button>
      </div>
    </template>
  </el-dialog>
</template>
