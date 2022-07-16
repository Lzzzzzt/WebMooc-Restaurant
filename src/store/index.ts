import { defineStore } from 'pinia'
import { useTimeAutoIncr } from '@/hooks'
import { Meal, MealType } from '@/types/Meal'
import { ref } from 'vue'
import { Seat } from '@/types'

export const useRestaurantStore = defineStore('Restaurant', () => {
  // 钱
  const money = ref<number>(500)

  // 菜单
  const dishes = ref<Map<number, Meal>>(new Map<number, Meal>())
  const dish = [
    {
      id: 0,
      name: '凉拌黄瓜',
      price: 8,
      type: MealType.PRE,
      time: 30
    },
    {
      id: 1,
      name: '凉拌凤爪',
      price: 16,
      type: MealType.PRE,
      time: 40
    },
    {
      id: 2,
      name: '花生米',
      price: 4,
      type: MealType.PRE,
      time: 20
    }
  ] as Meal[]
  dish.forEach(value => dishes.value.set(value.id, value))

  // 时间
  const time = ref({
    ...useTimeAutoIncr(),
    stop: false
  })

  function Stop () {
    clearInterval(time.value.timer)
    time.value.stop = true
  }

  function Proceed () {
    if (time.value.stop) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      time.value = {
        ...useTimeAutoIncr(time.value.week, time.value.day),
        stop: false
      }
    }
  }

  // 点菜队列
  const MealWaitList = ref<{ id: number, target: number }[]>([])

  // 餐桌比例
  const radio = ref<number>()

  // 座位
  const seats = ref<Seat[]>([
    {
      id: 0,
      consumer: null,
      picId: null,
      meals: []
    },
    {
      id: 1,
      consumer: null,
      picId: null,
      meals: []
    },
    {
      id: 2,
      consumer: null,
      picId: null,
      meals: []
    },
    {
      id: 3,
      consumer: null,
      picId: null,
      meals: []
    }
  ])

  return {
    // 钱
    money,
    // 菜
    dishes,
    // 时间
    time,
    Stop,
    Proceed,
    // 点菜队列
    MealWaitList,
    // 餐桌比例
    radio,
    // 座位
    seats
  }
})
