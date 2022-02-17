<template>
  <div
    class="max-w-[350px] bg-gray-700 text-white font-bold rounded-lg select-none flex flex-col"
  >
    <div class="flex justify-center items-center gap-6 p-3">
      <div class="h-full text-gray-500" v-if="is12">
        <div :class="[am && 'text-white']">上午</div>
        <div :class="[!am && 'text-white']">下午</div>
      </div>
      <div class="flex gap-3 items-end">
        <div class="text-5xl">{{ `${hh}:${mm}` }}</div>
        <div class="text-2xl text-gray-400">{{ ss }}</div>
      </div>
    </div>
    <div
      class="p-2 text-center border-t border-gray-800 text-gray-300 text-lg"
      :class="!openCalendar && 'hidden'"
    >
      {{ `${yy} 年 ${MM} 月 ${dd} 日 (週${week})` }}
    </div>
  </div>
</template>

<script>
export default {
  props: ["is12","openCalendar"],
  data() {
    return {
      hh: "",
      mm: "",
      ss: "",
      yy: "",
      MM: "",
      dd: "",
      week: "",
      am: true,
      time: new Date(),
    };
  },
  mounted() {
    this.timer();
  },
  methods: {
    timer() {
      this.time = new Date();

      this.hh = this.prefix(
        this.is12 ? this.hour12(this.time.getHours()) : this.time.getHours()
      );
      this.mm = this.prefix(this.time.getMinutes());
      this.ss = this.prefix(this.time.getSeconds());

      this.yy = this.time.getFullYear();
      this.MM = this.time.getMonth() + 1;
      this.dd = this.time.getDate();

      this.week = [
        "日",
        "一",
        "二",
        "三",
        "四",
        "五",
        "六",
      ][this.time.getDay()];

      setTimeout(this.timer, 800);
    },
    prefix(num) {
      return num < 10 ? `0${num}` : num;
    },
    hour12(num) {
      this.am = num < 12;

      if (num === 0) {
        return 12;
      } else {
        return num % 12;
      }
    },
  },
};
</script>
