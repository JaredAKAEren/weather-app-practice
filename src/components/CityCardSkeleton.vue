<template>
    <div class="flex py-6 px-3 bg-weather-secondary rounded-md shadow-md">
        <div class="flex flex-col flex-grow gap-2">
            <AnimatedPlaceholder class="max-w-[30%]" />
            <AnimatedPlaceholder class="max-w-[20%]" />
        </div>
        <div class="flex items-center">
            <AnimatedPlaceholder class="w-[30px] py-1" />
        </div>
    </div>
</template>

<script setup>
import AnimatedPlaceholder from './AnimatedPlaceholder.vue';
</script>
