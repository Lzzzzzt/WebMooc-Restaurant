<template>
  <div class="progress-bar-root">
    <div :style="{height: size.height, width: size.width}" class="progress-bar">
      <div :style="{backgroundColor: finishedColor, width: `calc(${size.width} * ${finished})`}"
           class="finished"/>
      <div :style="{backgroundColor: unfinishedColor, width: `calc(${size.width} * ${unfinished})`}"
           class="unfinished"/>
    </div>
    <div
      :style="{
        height: size.height,
        width: size.width,
        marginLeft: `calc(-${size.width} - 6px)`,
        lineHeight: `calc(${size.height})`,
        color: '#fff',
        fontSize: `calc(${size.height} * 2 / 3)`,
    }"
      class="progress-bar">
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
  },
  reset: {
    type: Boolean,
    default: false
  },
  stop: {
    type: Boolean,
    default: false
  }
})

const unfinished = ref<number>(1)
const finished = ref<number>(0)
const interval = computed(() => props.time * 1000 / 100)

function working (interval: number) {
  unfinished.value -= 0.01 * (props.stop ? 0 : props.rate)
  finished.value += 0.01 * (props.stop ? 0 : props.rate)

  if (finished.value <= 1) {
    setTimeout(working, interval, interval)
  }
}

function reset () {
  unfinished.value = 1
  finished.value = 0
  emit('update:reset', false)
  working(interval.value)
}

// eslint-disable-next-line no-undef
const emit = defineEmits(['update:isFinished', 'update:reset'])

watch(() => props.start, () => {
  if (props.start) {
    working(interval.value)
  } else {
    unfinished.value = 1
    finished.value = 0
  }
}, { immediate: true })

watch(() => props.reset, () => {
  if (props.reset) {
    reset()
  }
})

watchEffect(() => {
  if (finished.value >= 1) {
    unfinished.value = 0
    finished.value = 1
    emit('update:isFinished', true)
  }
  if (unfinished.value <= 0) {
    unfinished.value = 0
    finished.value = 1
  }
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
