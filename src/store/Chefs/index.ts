import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRestaurantStore } from '@/store'
import { Chef } from '@/types/Chef'

export const useChefsStore = defineStore('Chefs', () => {
  const restaurantStore = useRestaurantStore()

  let $id = 0

  const chefs = ref<Map<number, Chef>>(new Map<number, Chef>([
    [0, {
      id: $id,
      working: null,
      serve: null
    }]
  ]))

  function add (): boolean {
    if (chefs.value.size >= 6) {
      return false
    }

    if (restaurantStore.money < 100) {
      return false
    }

    const id = ++$id

    restaurantStore.money -= 100

    chefs.value.set(id, {
      id,
      working: null,
      serve: null
    })

    return true
  }

  function remove (id: number): boolean {
    return chefs.value.delete(id)
  }

  return {
    chefs,
    add,
    remove
  }
})
