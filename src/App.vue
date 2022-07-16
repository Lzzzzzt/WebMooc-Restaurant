<template>
  <div id="root">
    <Dialog v-model:active="menu" style="z-index: 9999;">
      <template #header>
        <h2 style="text-align: center; margin-bottom: 3px">菜单</h2>
        <h4 style="text-align: center; margin: 3px;">共计{{ price }}元</h4>
      </template>
      <template #content>
      <span v-for="dish in RestaurantStore.dishes.values()" :key="dish.id"
            style="display:flex; justify-content: space-between;">
        <label>
          <input :key="dish.id" v-model="checked" :disabled="checked.length >= 3 && checked.indexOf(dish.id) === -1"
                 :value="dish.id" type="checkbox">
          {{ dish.name }}
        </label>
        <span> {{ dish.price }}元 </span>
      </span>
      </template>
      <template #action>
        <Button style="margin-top: 20px;" @click="OrderFood">确定</Button>
      </template>
    </Dialog>

    <!--  information-area -->
    <div id="information">
      <div id="date"><span>W{{ RestaurantStore.time.week }}</span>|<span>D{{ RestaurantStore.time.day }}</span></div>
      <div id="money"><span>¥: {{ RestaurantStore.money }}</span></div>
    </div>
    <!--  chefs-area -->
    <div id="chefs">
      <Chef v-for="chef in ChefsStore.chefs.values()" :id="chef.id" :key="chef.id" size="85%"/>
      <!-- add-chef -->
      <div v-show="ChefsStore.chefs.size < 6" class="empty" style="width: 85%; min-height: 85%"
           @click="addDialog = true">
        <svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
          <path d="M576 64H448v384H64v128h384v384h128V576h384V448H576z" fill="#C49B7E"/>
        </svg>
      </div>
      <Dialog v-model:active="addDialog">
        <template #header>
          <h2 style="text-align: center">雇佣厨师</h2>
        </template>
        <template #content>
      <span>
        雇佣厨师需要花钱(100元)
      </span>
        </template>
        <template #action>
          <div style="display: flex; justify-content: space-around; align-items: center; margin-top: 30px;">
            <Button style="width: 40%;" @click="add">确定雇佣</Button>
            <Button style="width: 40%;" @click="addDialog = false">取消</Button>
          </div>
        </template>
      </Dialog>
    </div>
    <!--  consumers-eating-area -->
    <div id="consumers">
      <Component
        :is="seat.consumer === null ? Seat : Consumer"
        v-for="seat in RestaurantStore.seats"
        :key="seat.consumer ? seat.consumer : -seat.id - 1"
        :pic-id="seat.picId"
        :seat="seat.id"
        size="50%"
      />
    </div>
    <!--  consumers-waiting-area -->
    <div id="consumers-waiting">
      <Consumer v-for="waiting in ConsumersStore.ConsumerWaitList"
                :key="waiting.consumer"
                :c-id="waiting.consumer"
                :pic-id="waiting.picId"
                is-waiting
                size="20%"
                @click="Consumer2Seat"
      />
    </div>
  </div>
  <Dialog v-model:active="welcome">
    <template #header>
      <h2 style="text-align: center">WebMooc餐厅开业啦</h2>
    </template>
    <template #content>
      <div style="display: flex;justify-content: space-around;align-items: center;flex-direction: column">
        <span>WebMooc餐厅即将开业</span>
        <span>请认真经营你的餐厅</span>
        <span>经营餐厅需要做好下面几件事情</span>
        <div style="display: flex;justify-content: space-between;align-items: center; width: 80%;">
          <span><b>招聘厨师</b></span>
          <span><b>迎接客人</b></span>
          <span><b>烹饪美食</b></span>
        </div>
      </div>
    </template>
    <template #action>
      <Button style="margin-top: 20px;" @click="welcome = false">开始经营吧</Button>
    </template>
  </Dialog>
</template>

<script lang="ts" setup>
import Chef from '@/components/Chefs/RestaurantChef.vue'
import Seat from '@/components/RestaurantSeat.vue'
import Consumer from '@/components/Consumers/RestaurantConsumers.vue'
import Button from '@/components/RestaurantButton.vue'
import Dialog from '@/components/RestaurantDialog.vue'
import { useRestaurantStore } from '@/store'
import { computed, ref, watch } from 'vue'
import { useChefsStore } from '@/store/Chefs'
import { useConsumersStore } from '@/store/Consumers'
import { useAutoAddConsumer } from '@/hooks/Consumers'
import { Meal } from '@/types/Meal'

const RestaurantStore = useRestaurantStore()

const ConsumersStore = useConsumersStore()

useAutoAddConsumer(15)

const ChefsStore = useChefsStore()

const welcome = ref<boolean>(true)

const addDialog = ref<boolean>(false)

function add () {
  ChefsStore.add()
  addDialog.value = false
}

const menu = ref<boolean>(false)

const checked = ref<number[]>([])

const target = ref<number>(-1)

function Consumer2Seat () {
  for (const seat of RestaurantStore.seats) {
    if (seat.consumer === null) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const consumer = ConsumersStore.ConsumerWaitList.pop()!
      seat.consumer = consumer.consumer
      seat.picId = consumer.picId
      target.value = seat.id
      menu.value = true
      break
    }
  }
}

function OrderFood () {
  menu.value = false
  RestaurantStore.MealWaitList.push(...checked.value.map(value => ({
    id: value,
    target: target.value
  })))
  RestaurantStore.seats[target.value].meals = checked.value
  checked.value = []
}

watch(() => RestaurantStore.MealWaitList, () => {
  if (RestaurantStore.MealWaitList.length !== 0) {
    DistributeDish2Cook(RestaurantStore.MealWaitList[0])
  }
}, {
  deep: true,
  immediate: true
})

watch(() => ChefsStore.chefs, () => {
  if (RestaurantStore.MealWaitList.length !== 0) {
    DistributeDish2Cook(RestaurantStore.MealWaitList[0])
  }
}, {
  deep: true,
  immediate: true
})

function DistributeDish2Cook ({
  id,
  target
}: { id: number, target: number }) {
  let flag = false

  ChefsStore.chefs.forEach(chef => {
    if (!flag && chef.working === null) {
      flag = true
      chef.working = id
      chef.serve = target
      RestaurantStore.money -= (RestaurantStore.dishes.get(id) as Meal).price / 2
    }
  })

  if (flag) {
    RestaurantStore.MealWaitList.splice(0, 1)
  }
}

const price = computed(() => {
  let all = 0

  checked.value.forEach(value => {
    all += (RestaurantStore.dishes.get(value) as Meal).price
  })

  return all
})

</script>

<style>

body {
  margin: 0;
}

#app {
  width: 100vw;
  height: 100vh;
  background-image: url("assets/background.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

#root {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

#information {
  width: 90%;
  height: 10%;
  margin: 3% 5%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

#date {
  width: 30%;
  height: 50%;
  background-color: rgb(248, 212, 101);
  border-radius: 40px;
  border: #876A1F solid 8px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

#date > span, #money > span {
  font-weight: bold;
  color: #8F7126;
}

#money {
  width: 50%;
  height: 50%;
  background-color: rgb(248, 212, 101);
  border-radius: 40px;
  border: #876A1F solid 8px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

#chefs, #consumers {
  padding: 2%;
  width: calc(90% - 10px * 2 - 2% * 2);
  margin: 5%;
  border-radius: 20px;
  border: white solid 8px;
  display: grid;

  align-items: center;
}

#chefs {
  background-color: #F8D365;
  min-height: calc(15% - 10px * 2 - 2% * 2);
  max-height: calc(40% - 10px * 2 - 2% * 2);
  grid-template-columns: repeat(auto-fill, 30%);
  grid-gap: 10px;
  justify-content: space-between;
}

#consumers {
  background-color: #F2AA5E;
  min-height: calc(30% - 10px * 2 - 2% * 2);
  max-height: calc(40% - 10px * 2 - 2% * 2);
  grid-template-columns: repeat(auto-fill, 48%);
  grid-gap: 10px;
}

#consumers-waiting {
  position: absolute;
  width: 85vw;
  height: auto;
  top: 93%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: row-reverse;
}

.empty {
  border: white solid 8px;
  border-radius: 50%;
  background-image: linear-gradient(to bottom right, #DDDDDD, #AAAAAA);
  display: flex;
  justify-content: center;
  align-items: center;
  /*mask: url('@/assets/chef.png');*/
  position: relative;
}
</style>
