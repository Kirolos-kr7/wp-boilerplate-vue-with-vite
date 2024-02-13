<script setup>
import { ElButton, ElCard, ElDialog } from 'element-plus'
import { ref } from 'vue'

const open = ref(false)

const forms = [
  { id: 1, name: 'Test Form 1', description: 'Testing Form Builder 1' },
  { id: 2, name: 'Test Form 2', description: 'Testing Form Builder 2' },
  { id: 3, name: 'Test Form 3', description: 'Testing Form Builder 3' },
  { id: 4, name: 'Test Form 4', description: 'Testing Form Builder 4' },
  { id: 5, name: 'Test Form 5', description: 'Testing Form Builder 5' },
  { id: 6, name: 'Test Form 6', description: 'Testing Form Builder 6' }
]

const handleClose = () => {
  open.value = false
}
</script>

<template>
  <div class="grid grid-cols-3 gap-5">
    <el-card v-for="{ name, description } in forms">
      <template #header>
        <div class="flex items-center justify-between -my-1">
          <h2 class="text-lg">{{ name }}</h2>
          <el-button plain @click="open = true">Preview</el-button>
        </div>
      </template>
      <p>{{ description }}</p>
    </el-card>
  </div>

  <el-dialog
    v-model="open"
    title="Form Preview"
    width="500"
    :before-close="handleClose"
  >
    <span>This is a message</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose">Cancel</el-button>
      </div>
    </template>
  </el-dialog>
</template>
