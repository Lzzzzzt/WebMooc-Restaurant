import { onUnmounted, ref } from 'vue'

export function useTimeAutoIncr () {
  const day = ref<number>(1)
  const week = ref<number>(1)
  const timer = setInterval(() => {
    if (day.value < 7) {
      day.value++
    } else {
      day.value = 1
      week.value += 1
    }
  }, 600 * 1)
  onUnmounted(() => {
    clearTimeout(timer)
  })
  return {
    day,
    week,
    timer
  }
}
