<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
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
        "
      >
        <p v-if="searchError" class="py-2">抱歉，出现了一些错误，请重试。</p>
        <p
          v-if="!searchError && qweatherSearchResults.length === 0"
          class="py-2"
        >
          查询的地区不存在，请重试。
        </p>
        <template v-else>
          <li
            v-for="searchResult in qweatherSearchResults"
            :key="searchResult.id"
            class="py-2 cursor-pointer"
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

const qweatherAPIKey = "5a7251cd3b2e4396b101716cf2a9a74b";
const searchQuery = ref("");
const isInputFinish = ref(false);
const queryTimeout = ref(null);
const qweatherSearchResults = ref(null);
const searchError = ref(null);

const onInputStart = () => {
  isInputFinish.value = false;
  // console.log(isInputFinish.value);
};

const onInputEnd = () => {
  isInputFinish.value = true;
  // console.log(isInputFinish.value);
};

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
</script>
