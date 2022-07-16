import { defineStore } from 'pinia'
import { ref } from 'vue'
import { WaitingConsumer } from '@/types/Consumer'

export const useConsumersStore = defineStore('Consumers', () => {
  // 客人等位队列
  const ConsumerWaitList = ref<WaitingConsumer[]>([])

  return {
    // 客人等位队列
    ConsumerWaitList
  }
})
