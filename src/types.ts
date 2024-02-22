export interface BasicInfoI {
  title: string
  description: string
  submitCallback: string
  submitAction: string
  useCaptcha: boolean
}

export const baseELements = [
  'text',
  'email',
  'password',
  'radio',
  'checkbox',
  'number',
  'switch',
  'select',
  'button'
] as const

export type ElementType = (typeof baseELements)[number]

export interface FormEl {
  serial: string
  id: string
  type: ElementType
  label?: string
  placeholder?: string
  validations?: string[]
  options?: string[]
}

export type FormElementsI = FormEl[]

type color = {
  title: string
  value: string
}

export interface FormColorsI {
  backgroundColor: color
  titleColor: color
  submitButtonColor: color
  labelColor: color
}

export interface UpdateElementsEvent {
  added: {
    newIndex: number
    element: FormEl
  }
  removed: {
    oldIndex: number
    element: FormEl
  }
  moved: {
    newIndex: number
    oldIndex: number
    element: FormEl
  }
}
