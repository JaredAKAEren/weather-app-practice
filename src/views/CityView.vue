<template>
  <div>
    <Suspense>
      <AsyncCityView></AsyncCityView>
      <template #fallback>
        <p class="text-white w-full text-center mt-4">加载中......</p>
      </template>
    </Suspense>
  </div>
</template>

<script setup>
import AsyncCityView from "../components/AsyncCityView.vue";
</script>
