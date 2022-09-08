<template>
  <div>
    <Suspense>
      <AsyncCityView></AsyncCityView>
      <template #fallback>
        <p>加载中......</p>
      </template>
    </Suspense>
  </div>
</template>

<script setup>
import AsyncCityView from "../components/AsyncCityView.vue";
</script>
