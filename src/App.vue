<template>
  <div id="root">
    <!--  information-area-->
    <div id="information">
      <div id="date"><span>W{{ week }}</span>|<span>D{{ day }}</span></div>
      <div id="money"><span>¥: {{ store.money }}</span></div>
    </div>
    <!--  chefs-area-->
    <div id="chefs">
      <Chef size="85%"/>
      <Chef size="85%"/>
      <Chef size="85%"/>
      <Chef size="85%"/>
      <Chef size="85%"/>
      <Chef size="85%" :is-add="true"/>
    </div>
    <!--  consumers-eating-area-->
    <div id="consumers">
      <Consumer size="50%" :consumer-id="1"/>
      <Consumer size="50%" :consumer-id="5"/>
      <Consumer size="50%" :consumer-id="6"/>
      <Consumer size="50%" :consumer-id="4"/>
    </div>
    <!--  consumers-waiting-area-->
    <div id="consumers-waiting">
      <Consumer size="20%" :consumer-id="4" is-waiting/>
      <Consumer size="20%" :consumer-id="4" is-waiting/>
      <Consumer size="20%" :consumer-id="4" is-waiting/>
      <Consumer size="20%" :consumer-id="4" is-waiting/>
    </div>
    </div>
</template>

<script lang="ts" setup>
import Chef from '@/components/Chefs/RestaurantChef.vue'
import Consumer from '@/components/Consumers/RestaurantConsumers.vue'
import { useTimeAutoIncr } from '@/hooks/Chefs'
import { useRestaurantStore } from '@/store'

const {
  day,
  week
} = useTimeAutoIncr()

const store = useRestaurantStore()

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
</style>
