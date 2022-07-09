<template>
  <div style="position: relative">
    <div :style="{width: size}"
         class="chef"
         :class="{
            'making-pre': dish && dish.type === MealType.PRE,
            'making-main': dish && dish.type === MealType.MAIN,
            'making-drink': dish && dish.type === MealType.DRINK
          }"
         @mouseover="showClose = true"
         @mouseout="showClose = false"
         @click="handleChefClick"
    >
      <img :src=chef alt="chef" style="width: 100%;">
      <svg class="icon-close" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" v-show="showClose"
           @click="delDialog = true">
        <path d="M576 64H448v384H64v128h384v384h128V576h384V448H576z" fill="#C49B7E"/>
      </svg>
    </div>
    <img :src="ready" alt="ready" v-show="dishReady" class="dish-ready">
    <ProgressBar v-show="dish && !dishReady"
                 v-model:is-finished="dishReady"
                 :time="dish && dish.time"
                 :start="Boolean(dish)"
                 :size="{height: '20px', width: '80px'}"
                 :text="dish && dish.name"
                 :finished-color="finishColor"
                 :unfinished-color="unfinishedColor"
                 class="progress-bar"
    />
    <Dialog v-model:active="delDialog">
      <template #header>
        <h2 style="text-align: center">解雇厨师</h2>
      </template>
      <template #content>
      <span>
        解雇厨师需要花钱
      </span>
      </template>
      <template #action>
        <div style="display: flex; justify-content: space-around; align-items: center; margin-top: 30px;">
          <Button @click="store.remove(id)" style="width: 40%;">确定解雇</Button>
          <Button @click="delDialog = false" style="width: 40%;">取消</Button>
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script lang="ts" setup>
import chef from '@/assets/chef.png'
import ready from '../../../public/food-ready.png'
import { computed, ref } from 'vue'
import Dialog from '@/components/RestaurantDialog.vue'
import Button from '@/components/RestaurantButton.vue'
import { useChefsStore } from '@/store/Chefs'
import { Chef } from '@/types/Chef'
import { useRestaurantStore } from '@/store'
import { Meal, MealType } from '@/types/Meal'
import ProgressBar from '@/components/ProgressBar.vue'

// eslint-disable-next-line no-undef
const props = defineProps({
  size: {
    default: '100%',
    type: String
  },
  id: {
    type: Number,
    required: true
  }
})

const store = useChefsStore()

const showClose = ref<boolean>(false)

const delDialog = ref<boolean>(false)

const RestaurantStore = useRestaurantStore()

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const current = computed<Chef>(() => store.chefs.get(props.id)!)

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const dish = computed<Meal>(() => RestaurantStore.dishes.get(current.value.working!)!)

const finishColor = computed(() => {
  if (dish.value) {
    switch (dish.value.type) {
      case MealType.PRE:
        return '#A32015'
      case MealType.MAIN:
        return '#CC732A'
      case MealType.DRINK:
        return '#4FAF32'
    }
  }
  return '#CC732A'
})
const unfinishedColor = computed(() => {
  if (dish.value) {
    switch (dish.value.type) {
      case MealType.PRE:
        return '#EA4035'
      case MealType.MAIN:
        return '#F09641'
      case MealType.DRINK:
        return '#A1FC4E'
    }
  }
  return '#F09641'
})

const dishReady = ref<boolean>(false)

function handleChefClick () {
  if (dishReady.value) {
    // TODO: 上菜
    console.log('上菜')
  } else {
    // TODO: 加速
    console.log('加速')
  }
}

</script>

<style scoped>

.chef {
  border: white solid 8px;
  border-radius: 50%;
  background-image: linear-gradient(to bottom right, #DDDDDD, #AAAAAA);
  display: flex;
  justify-content: center;
  align-items: center;
  /*mask: url('@/assets/chef.png');*/
  position: relative;
}

.icon-close {
  z-index: 10;
  transform: rotate(45deg);
  margin-bottom: 50%;
  position: absolute;
  width: 20px;
  height: 20px;
  left: 80%;
  bottom: 25%;
}

.making-pre {
  background-image: linear-gradient(to bottom right, #EA4035, #A32015);
}

.making-main {
  background-image: linear-gradient(to bottom right, #F09641, #CC732A);
}

.making-drink {
  background-image: linear-gradient(to bottom right, #A1FC4E, #4FAF32);
}

.progress-bar {
  position: absolute;
  top: 70%;
  left: 51%;
  transform: translateX(-50%);
}

.dish-ready {
  width: 60px;
  position: absolute;
  top: 50%;
  left: -10%;
}
</style>
