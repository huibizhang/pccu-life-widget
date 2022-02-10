<template>
  <div class="flex flex-col max-w-[350px]">
    <div class="w-full flex justify-end items-center">
      <div
        class="titlebar w-7 h-7 flex justify-center items-center text-gray-500 cursor-move"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 absolute"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
          />
        </svg>
      </div>
    </div>
    <div class="flex flex-col gap-3">
      <Clock />
      <WeatherCard
        v-for="w in weather.filter((w) => w.full)"
        :key="w.Location"
        v-bind="w"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import WeatherCard from "./components/WeatherCard.vue";
import Clock from "./components/Clock.vue";

export default {
  data() {
    return {
      weather: [],
    };
  },
  mounted() {
    this.weatherTimer();
  },
  methods: {
    weatherTimer() {
      const _me = this;
      axios({
        method: "get",
        url: "https://api.pccu.edu.tw/public/weather.json",
      }).then(function (response) {
        _me.weather = response.data;
        _me.weather.forEach((e, index) => {
          e["full"] = index === 0;
        });
        console.log(_me.weather);
      });
      setTimeout(this.weatherTimer, 45000);
    },
  },
  components: {
    WeatherCard,
    Clock,
  },
};
</script>
