import { ref } from "vue";

export const obsTimeFormat = function (obsTime) {
    const weatherDate = ref(null);
    const weatherYear = ref(null);
    const weatherMo = ref(null);
    const weatherDay = ref(null);
    const weatherTime = ref(null);

    // 处理日期
    weatherDate.value = obsTime.substr(0, 10).split("-");
    weatherYear.value = weatherDate.value[0];
    weatherMo.value = weatherDate.value[1];
    weatherDay.value = weatherDate.value[2];
    weatherMo.value = weatherMo.value.replace(/^0/, "");
    weatherDay.value = weatherDay.value.replace(/^0/, "");
    weatherDate.value = `${weatherYear.value}年${weatherMo.value}月${weatherDay.value}日`;

    // 处理时间
    weatherTime.value = obsTime.substr(11, 5);
    obsTime = `${weatherDate.value} ${weatherTime.value}`;

    return obsTime;
}
