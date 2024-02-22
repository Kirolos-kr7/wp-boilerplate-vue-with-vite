import { defineStore, storeToRefs } from 'pinia'
import { ref, watch } from 'vue'
import { random } from './helper'
import { FormEl } from './types'

export const useStore = defineStore('element', () => {
  const dragging = ref(false),
    adding = ref(true),
    editing = ref<number | string | null>('select'),
    submitButton = ref({
      serial: 'submitButton',
      id: 'submitButton',
      label: 'Submit',
      type: 'button'
    }),
    elements = ref<FormEl[]>([
      // {
      //   serial: random(),
      //   id: 'firstName',
      //   placeholder: 'First Name',
      //   label: 'First Name',
      //   type: 'text'
      // },
      // {
      //   serial: random(),
      //   id: 'lastName',
      //   placeholder: 'Last Name',
      //   label: 'Last Name',
      //   type: 'text'
      // },
      {
        serial: random(),
        id: 'select',
        placeholder: 'Select',
        label: 'Select',
        type: 'select'
      }
      // {
      // serial: random(),
      //   id: 'groupName',
      //   placeholder: 'Group Name',
      //   label: 'Group Name',
      //   type: 'text'
      // },
      // {
      // serial: random(),
      //   id: 'password',
      //   placeholder: 'Password',
      //   label: 'Password',
      //   type: 'password',
      //   validations: ['required']
      // },
      // {
      // serial: random(),
      //   id: 'recaptcha',
      //   placeholder: 'Recaptcha',
      //   label: 'Recaptcha',
      //   type: 'switch'
      // }
    ])

  watch(adding, () => {
    if (adding.value) editing.value = null
  })

  watch(editing, () => {
    if (editing.value) adding.value = null
  })

  return { dragging, adding, editing, elements, submitButton }
})

export const getStore = () => {
  const store = useStore()
  return storeToRefs(store)
}
