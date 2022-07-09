import { ref } from 'vue'

export function useTimeAutoIncr (w = 1, d = 1) {
  const day = ref<number>(d)
  const week = ref<number>(w)
  const timer = setInterval(() => {
    if (day.value < 7) {
      day.value++
    } else {
      day.value = 1
      week.value += 1
    }
  }, 0.5 * 1000)

  return {
    day,
    week,
    timer
  }
}
