<template>
  <div :style="{width: size}" class="Empty">
    <img alt="seat" class="seat" :src="seat"/>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useRestaurantStore } from '@/store'
import seat from '../../public/seat.png'

const RestaurantStore = useRestaurantStore()

// eslint-disable-next-line no-undef
defineProps({
  size: {
    default: '100%',
    type: String
  }
})

if (!RestaurantStore.radio) {
  const parent = ref<HTMLElement>()

  onMounted(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    parent.value = document.querySelector('#consumers')! as HTMLElement
    RestaurantStore.radio = parent.value?.clientWidth / parent.value?.clientHeight
  })
}

</script>

<style scoped>
.Empty {
  border: white solid 5px;
  border-radius: 50%;
  background-image: linear-gradient(to bottom right, #DDDDDD, #AAAAAA);
  display: flex;
  justify-content: center;
  align-items: center;
}

.seat {
  width: 100%;
  opacity: 0;
}

</style>
