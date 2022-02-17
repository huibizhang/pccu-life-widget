<template>
  <div
    class="max-w-[350px] bg-orange-600 text-white font-bold rounded-lg select-none flex flex-col space-y-3 items-center p-3"
  >
    <div>
      {{`星旗${week}`}}
    </div>
    <div class="text-5xl font-black">
      {{dd}}
    </div>
    <div>
      {{ `${yy} 年 ${MM} 月` }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      yy: "",
      MM: "",
      dd: "",
      week: "",
      time: new Date(),
    };
  },
  mounted() {
    this.timer();
  },
  methods: {
    timer() {
      this.time = new Date();

      this.yy = this.time.getFullYear();
      this.MM = [
          "一",
          "二",
          "三",
          "四",
          "五",
          "六",
          "七",
          "八",
          "九",
          "十",
          "十一",
          "十二",
      ].this.time.getMonth();
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
  },
};
</script>
