import { defineStore } from 'pinia'

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useRestaurantStore = defineStore('Restaurant', {
  state: () => {
    return {
      money: 5000
    }
  },
  actions: {
    addMoney (val: number) {
      this.money += val
    }
  }
})
