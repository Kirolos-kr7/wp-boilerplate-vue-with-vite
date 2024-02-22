<script setup lang="ts">
const { errors } = defineProps<{
  errors: { $message: string }[]
}>()
</script>

<template>
  <span v-if="errors.length > 0" class="text-red-500 p-1 inline-block">
    {{ errors[0]?.$message }}
  </span>
</template>
