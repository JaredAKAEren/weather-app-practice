<template>
    <header class="sticky top-0 bg-weather-primary shadow-lg">
        <nav class="container flex flex-col sm:flex-row items-center gap-4 text-white py-6">
            <!-- 太阳图标/标题 -->
            <RouterLink :to="{ name: 'home' }">
                <div class="flex items-center gap-3">
                    <i class="fa-solid fa-sun text-2xl"></i>
                    <p class="text-2xl">本地天气</p>
                </div>
            </RouterLink>

            <!-- 信息/添加城市 -->
            <div class="flex gap-3 flex-1 justify-end">
                <i class="fa-solid fa-circle-info text-xl hover:text-weather-secondary duration-150 cursor-pointer"
                    @click="toggleModel"></i>
                <i @click="addCity" v-if="route.query.preview"
                    class="fa-solid fa-plus text-xl hover:text-weather-secondary duration-150 cursor-pointer"></i>
            </div>

            <!-- 信息按钮的弹出窗口 -->
            <BaseModel :model-active="modelActive" @close-model="toggleModel">
                <div class="text-black">
                    <h1 class="text-2xl mb-1">关于:</h1>
                    <p class="mb-4">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </p>

                    <h2 class="text-2xl">如何使用:</h2>
                    <ol class="list-decimal list-inside mb-4">
                        <li>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, asperiores quaerat.
                        </li>
                        <li>
                            Lorem ipsum dolor. Voluptatibus sit amet consectetur adipisicing elit, asperiores quaerat.
                        </li>
                        <li>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, asperiores.
                            Voluptatibus quaerat.
                        </li>
                    </ol>

                    <h2 class="text-2xl">删除城市:</h2>
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati maiores, quo doloremque
                        minus quisquam odio, minima deleniti, exercitationem tenetur sequi voluptates modi ipsa eveniet
                        iure.
                    </p>
                </div>
            </BaseModel>
        </nav>
    </header>
</template>

<script setup>
import { ref } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import BaseModel from './BaseModel.vue';
import { uid } from 'uid'

// 控制开关信息按钮的弹出窗口
const modelActive = ref(null);
const toggleModel = () => {
    modelActive.value = !modelActive.value;
}

const savedCityes = ref([])
const route = useRoute()
const router = useRouter()
const addCity = () => {
    if (localStorage.getItem("savedCityes")) {
        savedCityes.value = JSON.parse(localStorage.getItem("savedCityes"))
    }

    const locationObj = {
        id: uid(),
        apiId: route.query.id,
        province: route.params.province,
        city: route.params.city,
        coords: {
            lat: route.query.lat,
            lon: route.query.lon
        }
    }

    savedCityes.value.push(locationObj)
    localStorage.setItem(
        "savedCityes",
        JSON.stringify(savedCityes.value)
    )

    let query = Object.assign({}, route.query)
    delete query.preview
    router.replace({ query })
}
</script>
