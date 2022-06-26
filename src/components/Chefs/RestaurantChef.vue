<template>
  <img :src=chef alt="chef" class="consumer" :style="{width: size}" v-if="!isAdd">
  <div class="empty" :style="{width:size, height: size}" v-else>
    <svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"
         width="40px" height="40px">
      <path d="M576 64H448v384H64v128h384v384h128V576h384V448H576z" fill="#C49B7E"/>
    </svg>
  </div>
</template>

<script lang="ts" setup>
import chef from '@/assets/chef.png'
import { defineProps } from 'vue'

defineProps({
  size: {
    default: '100%',
    type: String
  },
  isAdd: {
    default: false,
    type: Boolean
  }
})
</script>

<style scoped>
.consumer {
  border: white solid 8px;
  border-radius: 50%;
  background-image: linear-gradient(to bottom right, #DDDDDD, #AAAAAA);
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
</style>
