<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <!-- 城市搜索输入框 -->
      <input
        type="text"
        v-model="searchQuery"
        @input="getSearchResults"
        @compositionstart="onInputStart"
        @compositionend="onInputEnd"
        placeholder="输入需要添加的城市"
        class="
          py-2
          px-1
          w-full
          bg-transparent
          border-b
          focus:border-weather-secondary
          focus:outline-none
          focus:shadow-[0px_1px_0_0_#004E70]
        "
      />

      <!-- 显示城市搜索结果的列表 -->
      <ul
        v-if="qweatherSearchResults != null"
        class="
          absolute
          bg-weather-secondary
          w-full
          shadow-md
          py-2
          px-2
          top-[66px]
          rounded-xl
        "
      >
        <!-- 出现搜索错误的提示语句 -->
        <p v-if="searchError" class="py-2">抱歉，出现了一些错误，请重试。</p>
        <p v-if="!searchError && qweatherSearchResults == ''" class="py-2">
          查询的地区不存在，请重试。
        </p>

        <!-- 城市搜索结果 -->
        <template v-else>
          <li
            v-for="searchResult in qweatherSearchResults"
            :key="searchResult.id"
            class="p-2 cursor-pointer hover:bg-weather-primary rounded-lg"
            @click="previewCity(searchResult)"
          >
            <!-- 名称 - 上级行政区(), 一级行政区域, 国家 -->
            {{
              `${searchResult.name} - ${searchResult.adm2}, ${searchResult.adm1}, ${searchResult.country}`
            }}
          </li>
        </template>
      </ul>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

// 城市信息查询API_Key
const qweatherAPIKey = "5a7251cd3b2e4396b101716cf2a9a74b";
// 输入框内容
const searchQuery = ref("");
// 判断中文拼写输入是否完成
const isInputFinish = ref(false);
// 懒加载延时
const queryTimeout = ref(null);
// 城市搜索结果
const qweatherSearchResults = ref(null);
// 判断搜索请求是否出错
const searchError = ref(null);

// 监测中文拼写输入的开始(禁止请求)
const onInputStart = () => {
  isInputFinish.value = false;
};

// 监测中文拼写输入的完成(允许请求)
const onInputEnd = () => {
  isInputFinish.value = true;
};

// 请求城市信息查询API
const getSearchResults = () => {
  clearTimeout(queryTimeout.value);
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== "" && isInputFinish.value) {
      await axios
        .get(
          `https://geoapi.qweather.com/v2/city/lookup?location=${searchQuery.value}&key=${qweatherAPIKey}`
        )
        .then((response) => {
          if (response.data.code == 200) {
            qweatherSearchResults.value = response.data.location;
          } else {
            qweatherSearchResults.value = "";
          }
        })
        .catch((error) => {
          searchError.value = true;
        });
      return;
    }
    qweatherSearchResults.value = null;
  }, 300);
};

const router = useRouter();

// 显示选中的城市
const previewCity = (searchResult) => {
  router.push({
    name: "cityView",
    params: { province: searchResult.adm1, city: searchResult.adm2 },
    query: {
      id: searchResult.id,
      lat: searchResult.lat,
      lon: searchResult.lon,
      preview: true,
    },
  });
};
</script>
