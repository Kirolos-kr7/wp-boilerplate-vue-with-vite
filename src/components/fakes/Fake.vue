<script setup lang="ts">
import { getStore } from '../../store'
import { type FormEl } from '../../types.ts'
import FakeButton from './FakeButton.vue'
import FakeCheckbox from './FakeCheckbox.vue'
import FakeInput from './FakeInput.vue'
import FakeRadio from './FakeRadio.vue'
import FakeSelect from './FakeSelect.vue'
import FakeSwitch from './FakeSwitch.vue'

defineProps<{ el: FormEl }>()
const { editing } = getStore()
</script>

<template>
  <div
    class="flex-1 rounded-md p-1 -m-1 transition-colors cursor-move"
    :class="{ 'outline-2 outline-dashed': editing == el.serial }"
  >
    <FakeInput
      v-if="el.type == 'text' || el.type == 'password' || el.type == 'email'"
      :el="el"
    />
    <FakeSelect v-if="el.type == 'select'" :el="el" />
    <FakeSwitch v-if="el.type == 'switch'" :el="el" />
    <FakeCheckbox v-if="el.type == 'checkbox'" :el="el" />
    <FakeRadio v-if="el.type == 'radio'" :el="el" />
    <FakeButton v-if="el.serial == 'submitButton'" :label="el.label" />
  </div>
</template>
