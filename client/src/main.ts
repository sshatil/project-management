import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./routes/index.ts";
import store from "./store/index.ts";

const app = createApp(App);

app.use(router);
app.use(store);

app.mount("#app");
