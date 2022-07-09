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
    }],
    [1, {
      id: ++$id,
      working: null,
      serve: null
    }]
  ]))

  function add () {
    if (chefs.value.size >= 6) {
      return
    }

    if (restaurantStore.money < 100) {
      return
    }

    const id = ++$id

    restaurantStore.money -= 100

    chefs.value.set(id, {
      id,
      working: null,
      serve: null
    })
  }

  function remove (id: number) {
    chefs.value.delete(id)
  }

  return {
    chefs,
    add,
    remove
  }
})
