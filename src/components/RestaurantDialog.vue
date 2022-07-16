<template>
  <div id="masking" v-if="active">
    <div id="dialog">
      <svg class="icon-close" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" v-show="showClose"
           @click="emit('update:active', false)">
        <path d="M576 64H448v384H64v128h384v384h128V576h384V448H576z" fill="#C49B7E"/>
      </svg>
      <slot name="header"></slot>
      <slot name="content"></slot>
      <slot name="action"></slot>
      <div style="margin-bottom: 10px;"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, watch } from 'vue'
import { useRestaurantStore } from '@/store'

// eslint-disable-next-line no-undef
const props = defineProps({
  active: {
    type: Boolean,
    default: false
  },
  showClose: {
    type: Boolean,
    default: false
  }
})

// eslint-disable-next-line no-undef
const emit = defineEmits(['update:active'])

const store = useRestaurantStore()

onMounted(() => {
  watch(() => props.active, () => {
    if (props.active) {
      store.Stop()
    } else {
      store.Proceed()
    }
  }, {
    immediate: true
  })
})

</script>

<style scoped>
#masking {
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}

#dialog {
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-items: center;
  align-content: space-around;
  border: white solid 8px;
  border-radius: 30px;
  background-color: #F8D465;
  width: 80%;
  height: max-content;

  padding: 0 10px;
  position: relative;
}

.icon-close {
  z-index: 10;
  transform: rotate(45deg);
  position: absolute;
  width: 20px;
  height: 20px;
}
</style>
