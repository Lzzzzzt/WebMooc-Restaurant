<template>
  <img :src=currentConsumer.path alt="consumer" class="chef" :class="{'waiting': isWaiting}"
       v-if="consumerId !== 0"
       :style="{width: size, backgroundImage: isWaiting ? '' : background[consumerId % 3]}"
  />
  <div class="empty" :style="{width:size, height: size}" v-else></div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

interface ConsumerConfig {
  path: string,
}

// enum ConsumerStatus {
//   waiting4Seat,
//   waiting4Meal,
//   eating,
//   angry
// }

const consumerMap = new Map<number, ConsumerConfig>(
  [
    [0, {
      path: ''
    }],
    [1, {
      path: '/consumer-1.png'
    }],
    [2, {
      path: '/consumer-2.png'
    }],
    [3, {
      path: '/consumer-3.png'
    }],
    [4, {
      path: '/consumer-4.png'
    }],
    [5, {
      path: '/consumer-5.png'
    }],
    [6, {
      path: '/consumer-6.png'
    }],
    [7, {
      path: '/consumer-7.png'
    }]
  ]
)

const background: string[] = [
  'linear-gradient(to bottom right, #EA4035, #A32015)',
  'linear-gradient(to bottom right, #F09641, #CC732A)',
  'linear-gradient(to bottom right, #A1FC4E, #4FAF32)'
]

// eslint-disable-next-line no-undef
const props = defineProps({
  size: {
    default: '100%',
    type: String
  },
  consumerId: {
    default: 0,
    type: Number
  },
  isWaiting: {
    default: false,
    type: Boolean
  }
})

const currentConsumer = ref<ConsumerConfig>(consumerMap.get(props.consumerId) as ConsumerConfig)
</script>

<style scoped>
.chef {
  border: white solid 5px;
  border-radius: 50%;
}

.empty {
  border: white solid 8px;
  border-radius: 50%;
  background-image: linear-gradient(to bottom right, #DDDDDD, #AAAAAA);
  display: flex;
  justify-content: center;
  align-items: center;
  /*mask: url('@/assets/chef.png');*/
}

.waiting {
  margin-left: -15px;
  background-image: linear-gradient(to bottom right, #4A91F7, #2E6BD2);;
}
</style>
