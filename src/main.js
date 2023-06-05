import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import VueCalendarHeatmap from "vue3-calendar-heatmap";

const app = createApp(App);
app.use(VueCalendarHeatmap);
app.mount("#app");
