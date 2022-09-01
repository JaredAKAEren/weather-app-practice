<template>
    <div v-show="modelActive"
        class="absolute w-full bg-black bg-opacity-30 h-screen top-0 left-0 flex justify-center px-8">
        <div v-if="modelActive" class="bg-white max-w-screen-md self-start px-7 py-5 mt-32">
            <slot></slot>
            <button @click="$emit('close-model')" class="text-white mt-8 bg-weather-primary py-2 px-6">
                关闭
            </button>
        </div>
    </div>
</template>

<script setup>
// 关闭按钮
defineEmits(["close-model"])
// 控制组件显示
defineProps({
    modelActive: {
        type: Boolean,
        default: false
    }
})
</script>

<style lang="scss" scoped>
</style>