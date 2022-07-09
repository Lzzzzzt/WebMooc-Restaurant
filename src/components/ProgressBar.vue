<template>
  <div class="progress-bar-root">
    <div class="progress-bar" :style="{height: size.height, width: size.width}">
      <div class="finished"
           :style="{backgroundColor: finishedColor, width: `calc(${size.width} * ${finished})`}"/>
      <div class="unfinished"
           :style="{backgroundColor: unfinishedColor, width: `calc(${size.width} * ${unfinished})`}"/>
    </div>
    <div
      class="progress-bar"
      :style="{
        height: size.height,
        width: size.width,
        marginLeft: `calc(-${size.width} - 6px)`,
        lineHeight: size.height,
        color: '#fff'
    }">
      {{ text }}
    </div>
  </div>
</template>

<script lang="ts" setup>

import type { PropType } from 'vue'
import { computed, ref, watch, watchEffect } from 'vue'

interface Size {
  height: string,
  width: string,
}

// eslint-disable-next-line no-undef
const props = defineProps({
  start: {
    type: Boolean,
    default: true
  },
  time: {
    type: Number,
    default: Number.MAX_SAFE_INTEGER
  },
  size: {
    type: Object as PropType<Size>,
    validator (value: Size): boolean {
      return value.height !== '' && value.width !== ''
    },
    required: true
  },
  finishedColor: {
    type: String,
    default: '#7EC250'
  },
  unfinishedColor: {
    type: String,
    default: '#A1E661'
  },
  text: {
    type: String,
    default: ''
  },
  rate: {
    type: Number,
    default: 1
  },
  isFinished: {
    type: Boolean,
    default: false
  }
})

const unfinished = ref<number>(1)
const finished = ref<number>(0)
const interval = computed(() => props.time * 1000 / 100)

function working (interval: number) {
  unfinished.value -= 0.01 * props.rate
  finished.value += 0.01 * props.rate

  if (finished.value <= 1) {
    setTimeout(working, interval, interval)
  }
}

watch(() => props.start, () => {
  if (props.start && !finished.value) {
    setTimeout(working, interval.value, interval.value)
  }
}, { immediate: true })

// eslint-disable-next-line no-undef
const emit = defineEmits(['update:isFinished'])

watchEffect(() => {
  if (finished.value >= 1) {
    finished.value = 1
    emit('update:isFinished', true)
  }
  if (unfinished.value <= 0) unfinished.value = 0
})

</script>

<style scoped>
.progress-bar-root {
  display: flex;
  flex-wrap: nowrap;
}

.progress-bar {
  border: white solid 3px;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.finished, .unfinished {
  height: 100%;
}
</style>
