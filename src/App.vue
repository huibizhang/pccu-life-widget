<template>
  <div class="flex flex-col max-w-[350px] select-none">
    <div class="w-full flex justify-end items-center space-x-1">
      <div
        class="w-10 h-7 flex justify-center items-center text-gray-500 px-2 font-black font-mono text-lg"
        @click="
          is12 = !is12;
          save();
        "
      >
        <div class="">7</div>
      </div>
      <div
        class="w-10 h-7 flex justify-center items-center text-gray-500 px-2 font-black font-mono text-lg"
        @click="
          is12 = !is12;
          save();
        "
      >
        <div :class="['transition-all', is12 && 'text-white']">1</div>
        <div class="text-white">2</div>
        <div :class="['transition-all', !is12 && 'text-white']">4</div>
      </div>
      <div
        class="w-7 h-7 flex justify-center items-center text-gray-500"
        @click="refresh()"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      </div>
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
      <Clock :is12="is12" :openCalendar="openCalendar" />
      <Calender :openCalendar="openCalendar" />
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
      is12: true,
      openCalendar: false,
    };
  },
  mounted() {
    this.is12 = window.localStorage.getItem("is12")
      ? window.localStorage.getItem("is12") === "true"
      : true;

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
          if (e["WeatherDesciption"] == -99) {
            e["WeatherDesciption"] = "陰";
          }
        });
        console.log(_me.weather);
      });
      setTimeout(this.weatherTimer, 45000);
    },
    refresh() {
      window.location = "";
    },
    save() {
      window.localStorage.setItem("is12", this.is12);
    },
  },
  components: {
    WeatherCard,
    Clock,
  },
};
</script>
