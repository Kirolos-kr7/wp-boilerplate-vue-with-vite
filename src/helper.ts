import { FormEl } from './types'

export const random = () => Math.random().toString().split('.')[1]

export const uniqueId = (elId: string, elements: FormEl[], idx: number = 0) => {
  const val = idx == 0 ? elId : `${elId} ${idx}`

  const exists = elements.some(({ id }) => id.includes(val))
  if (exists) {
    return uniqueId(elId, elements, (idx += 1))
  }

  return val
}
