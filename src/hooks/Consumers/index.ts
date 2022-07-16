import { useConsumersStore } from '@/store/Consumers'
import { WaitingConsumer } from '@/types/Consumer'

let $id = 0

function addConsumer (max: number) {
  const store = useConsumersStore()

  if (store.ConsumerWaitList.length < 5) {
    $id++

    const consumer: WaitingConsumer = {
      seat: $id,
      consumer: $id,
      picId: Math.floor(Math.random() * 6 + 1)
    }

    store.ConsumerWaitList.unshift(consumer)
  }

  setTimeout(addConsumer, Math.floor(Math.random() * max * 1000), max)
}

export function useAutoAddConsumer (max: number) {
  setTimeout(addConsumer, 0, max)
}
