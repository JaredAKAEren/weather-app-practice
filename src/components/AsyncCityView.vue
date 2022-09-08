<template>
  <div></div>
</template>

<script setup>
import axios from "axios";
import { useRoute } from "vue-router";

const route = useRoute();
// 城市信息查询API_Key
const qweatherAPIKey = "5a7251cd3b2e4396b101716cf2a9a74b";

const getWeatherData = async () => {
  await axios
    .get(
      `https://devapi.qweather.com/v7/weather/now?location=${route.query.id}&key=${qweatherAPIKey}`
    )
    .then((response) => {
      if (response.data.code == 200) {
        return response.data.now;
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

const weatherData = await getWeatherData();
</script>