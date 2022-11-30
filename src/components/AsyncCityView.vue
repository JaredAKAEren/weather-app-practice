<template>
  <div class="flex flex-col flex-1 items-center">
    <!-- 提示横幅 -->
    <div v-if="route.query.preview" class="text-white w-full text-center p-4 bg-weather-secondary">
      <p>点击 “+” 添加当前城市到首页。</p>
    </div>

    <!-- 实时天气 -->
    <div class="flex flex-col items-center py-10 text-white">
      <!-- 城市名称 -->
      <h1 class="text-4xl mb-5">{{ route.params.city }}</h1>
      <!-- 时间 -->
      <p class="mb-10">{{ weatherDataNow.obsTime }}</p>
      <!-- 温度 -->
      <p class="text-8xl mb-8">{{ weatherDataNow.temp }}&deg;</p>
      <!-- 体感温度 -->
      <p>体感温度{{ weatherDataNow.feelsLike }}&deg;</p>
      <!-- 天气状况 -->
      <p>{{ weatherDataNow.text }}</p>
      <!-- 天气图标 -->
      <div class="text-5xl mt-4">
        <i :class="`qi-${weatherDataNow.icon}-fill`"></i>
      </div>
    </div>

    <!-- 分割线 -->
    <hr class="border-white w-full border-opacity-10 border" />

    <!-- 逐小时天气 -->
    <div class="max-w-screen-md w-full py-12">
      <div class="text-white mx-8">
        <h2 class="mb-4">未来24小时天气</h2>
        <div class="flex gap-10 overflow-x-scroll scrollbar">
          <div v-for="(hourData, index) in weatherDataHourly" :key="index" class="flex flex-col items-center gap-3">
            <!-- 时间 -->
            <p class="text-sm">
              {{ hourData.fxTime.substr(11, 6) }}
            </p>
            <!-- 图标 -->
            <div class="text-2xl">
              <i :class="`qi-${weatherDataNow.icon}-fill`"></i>
            </div>
            <!-- 温度 -->
            <p>{{ hourData.temp }}&deg;</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 分割线 -->
    <hr class="border-white w-full border-opacity-10 border" />

    <!-- 逐天天气 -->
    <div class="max-w-screen-md w-full py-12">
      <div class="text-white mx-8">
        <h2 class="mb-4">未来7天天气</h2>
        <div v-for="(day, index) in weatherDataDaily" :key="index" class="flex items-center mb-2">
          <!-- 图标 -->
          <div class="text-lg mr-2">
            <i :class="`qi-${day.iconDay}-fill`"></i>
          </div>
          <!-- 日期 -->
          <p class="flex-1">
            {{ day.fxDate.substr(5).replace(/^0/, "") }} · {{ day.textDay }}
          </p>
          <div>
            <p>{{ day.tempMax }}&deg; / {{ day.tempMin }}&deg;</p>
          </div>
        </div>
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

// 获取当前城市实时天气信息
const getWeatherDataNow = async () => {
  const weatherDataNow = ref(null);

  await axios
    .get(
      `https://devapi.qweather.com/v7/weather/now?location=${route.query.id}&key=${qweatherAPIKey}`
    )
    .then((response) => {
      if (response.data.code == 200) {
        weatherDataNow.value = response.data.now;
        weatherDataNow.value.obsTime = obsTimeFormat(
          weatherDataNow.value.obsTime
        );
      }
    })
    .catch((error) => {
      console.log(error);
    });
  return weatherDataNow.value;
};
// 调用getWeatherDataNow方法获取并保存实时天气信息
const weatherDataNow = await getWeatherDataNow();

// 获取当前城市未来24小时的天气信息
const getWeatherDataHourly = async () => {
  const weatherDataHourly = ref(null);

  await axios
    .get(
      `https://devapi.qweather.com/v7/weather/24h?location=${route.query.id}&key=${qweatherAPIKey}`
    )
    .then((response) => {
      if (response.data.code == 200) {
        weatherDataHourly.value = response.data.hourly;
        weatherDataHourly.value.forEach((hour) => {
          hour.fxTime = obsTimeFormat(hour.fxTime);
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
  return weatherDataHourly.value;
};
const weatherDataHourly = await getWeatherDataHourly();

// 获取当前城市未来七天的天气信息
const getWeatherDataDaily = async () => {
  const weatherDataDaily = ref(null);

  await axios
    .get(
      `https://devapi.qweather.com/v7/weather/7d?location=${route.query.id}&key=${qweatherAPIKey}`
    )
    .then((response) => {
      if (response.data.code == 200) {
        weatherDataDaily.value = response.data.daily;
      }
    })
    .catch((error) => {
      console.log(error);
    });
  return weatherDataDaily.value;
};
const weatherDataDaily = await getWeatherDataDaily();
</script>
