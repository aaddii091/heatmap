<template>
  <h1>TJ</h1>
  <CalendarHeatmap
    :end-date="datee"
    :values="finalDates"
    :style="{ 'max-width': '675px' }"
    :range-color="['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39']"
    :max="1000"
    :round="2"
  ></CalendarHeatmap>
</template>

<script>
// import { log } from "console";
import { onBeforeMount, onMounted, ref } from "vue";
import { CalendarHeatmap } from "vue3-calendar-heatmap";
export default {
  components: {
    CalendarHeatmap,
  },
  setup() {
    const activity = ref([]);
    onBeforeMount(async () => {
      try {
        const response = await fetch("http://localhost:3000/data");
        const data = await response.json();
        activity.value = data;
        loading();
        // console.log(activity.value);
      } catch (error) {
        console.log(error.message);
      }
    });

    const loading = () => {
      for (let i = 0; i < activity.value.length; i++) {
        // if (activity.value[i].value.email == "dutta.navin@edvanta.com") {
        const day = new Date(activity.value[i].timestamp.machineReadable.$date)
          .toISOString()
          .slice(0, 10);
        console.log(day);
        dates.value.push(day);
      }
      // }
    };
    const dates = ref([]);
    setTimeout(() => {
      console.log(dates.value);
      filterDates();
    }, 2000);
    const finalDates = ref([]);
    const filterDates = () => {
      const elementCounts = {};

      dates.value.forEach((element) => {
        elementCounts[element] = (elementCounts[element] || 0) + 1;
      });
      console.log(elementCounts);
      finalDates.value = Object.entries(elementCounts).map(([date, count]) => ({
        date,
        count,
      }));
      console.log(finalDates.value);
    };
    let datee = new Date("2021-10-01");
    return { datee, finalDates };
  },
};
</script>

<style>
/* .vch__months__labels__wrapper {
  padding-bottom: 10px;
}
.vch__days__labels__wrapper {
  padding-right: 101px !important;
} */
</style>
