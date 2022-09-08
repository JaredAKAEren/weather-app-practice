<template>
  <Teleport to="body">
    <Transition name="model-outer">
      <div
        v-show="modelActive"
        class="
          absolute
          w-full
          bg-black bg-opacity-30
          h-screen
          top-0
          left-0
          flex
          justify-center
          px-8
        "
      >
        <Transition name="model-inner">
          <div
            v-if="modelActive"
            class="
              bg-white
              max-w-screen-md
              self-start
              px-7
              py-5
              mt-32
              rounded-3xl
            "
          >
            <slot></slot>
            <button
              @click="$emit('close-model')"
              class="
                text-white
                mt-8
                bg-weather-warn-light
                py-2
                px-6
                rounded-full
                hover:bg-weather-warn-dark
              "
            >
              关闭
            </button>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
// 关闭按钮
defineEmits(["close-model"]);
// 控制组件显示
defineProps({
  modelActive: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped>
/* 半透明背景部分 */
.model-outer-enter-active,
.model-outer-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

/* 淡入淡出 */
.model-outer-enter-from,
.model-outer-leave-to {
  opacity: 0;
}

/* popup窗口部分 */
.model-inner-enter-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}

.model-inner-leave-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

/* 缩放 */
.model-inner-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.model-inner-leave-to {
  transform: scale(0.8);
}
</style>
