<script setup>
import Navbar from './Navbar.vue'
</script>

<template>
  <div>
    <Navbar />
    <div class="p-3 sm:p-5">
      <RouterView />
    </div>
  </div>
</template>
