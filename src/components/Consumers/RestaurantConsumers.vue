<template>
  <div :style="{width: size}" style="position: relative;" @click="handleConsumerClick">
    <img :class="{'waiting': isWaiting}"
         :src=pic.path
         :style="{width: '100%', backgroundImage: isWaiting ? '' : background[picId % 3]}"
         alt="consumer"
         class="consumer"
    />
    <div v-if="!isWaiting" class="progress-bar-area">
      <ProgressBar v-for="meal in currentMeals"
                   :key="meal.id"
                   :finished-color="`#${background[props.picId % 3].split('#')[2].replace(')', '')}`"
                   :size="{height: '18px', width: '70px'}"
                   :start="true"
                   :text="meal.name"
                   :time="meal.time * 2"
                   :unfinished-color="`#${background[props.picId % 3].split('#')[1].replace(',', '')}`"
                   style="margin-bottom: 3px;"
      />
    </div>
    <ProgressBar v-else
                 v-model:is-finished="leave"
                 :size="{height: '18px', width: '55px'}"
                 :start="true"
                 :text="'等位'"
                 :time="60 + 30 * (Math.random() - 0.5)"
                 class="waiting-progress-bar"
                 finished-color="#2E6BD2"
                 style="margin-bottom: 3px;"
                 unfinished-color="#4A91F7"
    />
    <img v-show="Status.PAY === status" :src="Coin" alt="coin" class="coin">
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch, watchEffect } from 'vue'
import { useRestaurantStore } from '@/store'
import { background, consumerMap, Status } from '@/types/Consumer'
import { Meal } from '@/types/Meal'
import Coin from '../../../public/coin.png'
import ProgressBar from '@/components/ProgressBar.vue'
import { useConsumersStore } from '@/store/Consumers'

// eslint-disable-next-line no-undef
const props = defineProps({
  size: {
    default: '100%',
    type: String
  },
  picId: {
    default: 0,
    type: Number
  },
  isWaiting: {
    default: false,
    type: Boolean
  },
  seat: {
    default: -1,
    type: Number
  },
  cId: {
    default: -1,
    type: Number
  }
})

const RestaurantStore = useRestaurantStore()

const ConsumersStore = useConsumersStore()

if (!RestaurantStore.radio) {
  const parent = ref<HTMLElement>()

  onMounted(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    parent.value = document.querySelector('#consumers')! as HTMLElement
    RestaurantStore.radio = parent.value.clientWidth / parent.value.clientHeight
  })
}

const pic = ref<{ path: string }>(consumerMap.get(props.picId) as { path: string })

const currentMeals = computed(() => {
  if (props.seat >= 0) {
    return RestaurantStore.seats[props.seat].meals.map(value => {
      return RestaurantStore.dishes.get(value) as Meal
    })
  }
  return []
})

const status = ref<Status>()

const leave = ref(false)
const price = ref(0)
const maxTime = ref(0)

let timer: number | undefined

watchEffect(() => {
  if (currentMeals.value.length === 0 && price.value !== 0) {
    status.value = Status.PAY
  }

  if (leave.value && props.isWaiting) {
    setTimeout(() => {
      ConsumersStore.ConsumerWaitList = ConsumersStore.ConsumerWaitList.filter(value => value.consumer !== props.cId)
    }, 1000 * 10)
  }

  if (maxTime.value !== 0) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      RestaurantStore.seats[props.seat].consumer = null
      RestaurantStore.seats[props.seat].picId = null
    }, (maxTime.value) * 1000)
  }
})

watch(currentMeals, () => {
  if (currentMeals.value.length > 0 && price.value === 0) {
    price.value = currentMeals.value.reduce((pre, cur) => {
      return {
        name: '',
        id: -1,
        price: pre.price + cur.price,
        type: cur.type,
        time: cur.time
      }
    }).price

    for (const meal of currentMeals.value) {
      if (meal.time > maxTime.value) {
        maxTime.value = meal.time
      }
    }

    maxTime.value = maxTime.value * 2.5
  }
})

function handleConsumerClick () {
  if (status.value === Status.PAY) {
    RestaurantStore.seats[props.seat].consumer = null
    RestaurantStore.seats[props.seat].picId = null
    RestaurantStore.money += price.value
  }
}

</script>

<style scoped>
.consumer {
  border: white solid 5px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.waiting {
  margin-left: -15px;
  background-image: linear-gradient(to bottom right, #4A91F7, #2E6BD2);
}

.progress-bar-area {
  display: flex;
  position: absolute;
  top: 3%;
  left: 80%;
  flex-direction: column;
}

.waiting-progress-bar {
  position: absolute;
  left: 50%;
  transform: translateX(-65%);
  top: 75%;
}

.coin {
  position: absolute;
  width: 50px;
  top: 50%;
  left: -15%;
}
</style>
