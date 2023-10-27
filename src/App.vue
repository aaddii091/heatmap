<template>
  <h1>TJ</h1>
  <CalendarHeatmap
    :end-date="datee"
    :values="finalDates"
    :style="{ 'max-width': '675px' }"
    :range-color="generateRangeColor()"
    :max="1000"
    :round="2"
  ></CalendarHeatmap>
</template>

<script>
import { onBeforeMount, ref } from "vue";
import { CalendarHeatmap } from "vue3-calendar-heatmap";

export default {
  components: {
    CalendarHeatmap,
  },
  setup() {
    const activity = ref([]);
    const benchedActivityThreshold = ref(100); // change for yellow activity threshold

    onBeforeMount(async () => {
      try {
        const response = await fetch("http://localhost:3000/data");
        const data = await response.json();
        activity.value = data;
        loading();
      } catch (error) {
        console.log(error.message);
      }
    });

    const loading = () => {
      for (let i = 0; i < activity.value.length; i++) {
        const day = new Date(activity.value[i].timestamp.machineReadable.$date)
          .toISOString()
          .slice(0, 10);
        dates.value.push(day);
      }
    };

    const dates = ref([]);

    setTimeout(() => {
      filterDates();
    }, 2000);

    const finalDates = ref([]);

    const filterDates = () => {
      const elementCounts = {};

      dates.value.forEach((element) => {
        elementCounts[element] = (elementCounts[element] || 0) + 1;
      });

      finalDates.value = Object.entries(elementCounts).map(([date, count]) => ({
        date,
        count,
      }));
    };

    let datee = new Date("2021-10-01");

    const generateRangeColor = () => {
      const rangeColor = [
        "#ebedf0",
        "#e8f578",
        "#FFFF00",
        "#30a14e",
        "#019139",
      ];
      const count = finalDates.value.length > 0 ? finalDates.value[2].count : 0;

      // Update the third color if the count is less than 100
      if (count < benchedActivityThreshold.value) {
        rangeColor[2] = "#FFFF00"; // Replace with the color you want
      }

      return rangeColor;
    };

    return { datee, finalDates, generateRangeColor };
  },
};
</script>

<style>
</style>
