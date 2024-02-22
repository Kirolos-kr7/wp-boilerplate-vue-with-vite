<script setup lang="ts">
import Navbar from './Navbar.vue'
</script>

<template>
  <Navbar />

  <div class="px-3 sm:px-5 py-4">
    <RouterView />
  </div>
</template>
