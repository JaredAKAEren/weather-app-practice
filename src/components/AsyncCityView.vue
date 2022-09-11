<template>
  <div class="flex flex-col flex-1 items-center">
    <!-- 提示横幅 -->
    <div class="text-white w-full text-center p-4 bg-weather-secondary">
      <p>点击 “+” 添加当前城市到首页。</p>
    </div>

    <!-- 天气信息 -->
    <div class="flex flex-col items-center py-10 text-white">
      <!-- 城市名称 -->
      <h1 class="text-4xl mb-5">{{ route.params.city }}</h1>
      <!-- 时间 -->
      <p class="mb-10">{{ weatherData.obsTime }}</p>
      <!-- 温度 -->
      <p class="text-8xl mb-8">{{ weatherData.temp }}&deg;</p>
      <!-- 天气图标 -->
      <div class="text-5xl">
        <i :class="`qi-${weatherData.icon}-fill`"></i>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { inject } from "@vue/runtime-core";
import axios from "axios";
import { useRoute } from "vue-router";

const route = useRoute();

// 引入全局方法解析天气数据中的obsTime
const obsTimeFormat = inject("obsTimeFormat");
// 城市信息查询API_Key
const qweatherAPIKey = "5a7251cd3b2e4396b101716cf2a9a74b";

// 获取当前城市的实时天气信息
const getWeatherData = async () => {
  const weatherData = ref(null);

  await axios
    .get(
      `https://devapi.qweather.com/v7/weather/now?location=${route.query.id}&key=${qweatherAPIKey}`
    )
    .then((response) => {
      if (response.data.code == 200) {
        weatherData.value = response.data.now;
        weatherData.value.obsTime = obsTimeFormat(weatherData.value.obsTime);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  return weatherData.value;
};

// 调用getWeatherData方法获取并保存实时天气信息
const weatherData = await getWeatherData();
</script>
