<script setup></script>

<template>
  <header>
    <nav
      class="flex items-center justify-between px-3 sm:px-5 py-4 gap-5 bg-white shadow-sm"
    >
      <h1 class="text-xl font-semibold">
        <router-link to="/">Form Builder</router-link>
      </h1>

      <ul class="flex items-center gap-5 font-medium">
        <li><router-link to="/">Dashboard</router-link></li>
        <li><router-link to="/new">New Form</router-link></li>
      </ul>
    </nav>
  </header>
</template>
