<template>
    <div v-for="city in savedCityes" :key="city.id">
        <CityCard :city="city" @click="goToCityView(city)" />
    </div>

    <p v-if="savedCityes.length === 0">
        还没有添加城市。请在上方搜索栏中查找需要追踪的城市。
    </p>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import CityCard from './CityCard.vue'

const savedCityes = ref([])
// 城市信息查询API_Key
const qweatherAPIKey = "5a7251cd3b2e4396b101716cf2a9a74b";
const getCities = async () => {
    if (localStorage.getItem("savedCityes")) {
        savedCityes.value = JSON.parse(localStorage.getItem("savedCityes"))
    }

    const requests = []
    savedCityes.value.forEach((city) => {
        requests.push(
            axios.get(
                `https://devapi.qweather.com/v7/weather/now?location=${city.apiId}&key=${qweatherAPIKey}`
            )
        )
    })

    const weatherData = await Promise.all(requests)

    weatherData.forEach((value, index) => {
        savedCityes.value[index].weather = value.data.now
    })
}
await getCities()

const router = useRouter()
const goToCityView = (city) => {
    router.push({
        name: "cityView",
        params: {
            province: city.province,
            city: city.city
        },
        query: {
            id: city.apiId,
            lat: city.coords.lat,
            lon: city.coords.lon,
        }
    })
}

</script>
