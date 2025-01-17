import App from "./App.vue";
import router from "./router";
import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import VueSimplemde from "vue-simplemde";
import "simplemde/dist/simplemde.min.css";
import "font-awesome/css/font-awesome.min.css";
import "animate.css";
import "fullpage-vue/src/fullpage.css";
import VueFullpage from "fullpage-vue";
import VueResource from "vue-resource";
import VueWeatherWidget from "vue-weather-widget";
import "vue-weather-widget/dist/css/vue-weather-widget.css";
import "@fortawesome/fontawesome-free/css/all.css";
import VEditor from "yimo-vue-editor";
import VueCarousel from "@chenfengyuan/vue-carousel";
import VueAgile from "vue-agile";
import { Drag, Drop } from "vue-drag-drop";

Vue.component("drag", Drag);
Vue.component("drop", Drop);
Vue.use(VueAgile);

Vue.component(VueCarousel.name, VueCarousel);
Vue.config.productionTip = false;

Vue.use(VueFullpage);
Vue.use(VueSimplemde);
Vue.use(VueResource);
Vue.use(Vuetify, {
  iconfont: "fa",
  theme: {
    primary: "#3f51b5",
    secondary: "#b0bec5",
    accent: "#8c9eff",
    error: "#b71c1c"
  }
});

Vue.use(VEditor, {
  name: "v-editor-app",
  config: {},
  uploadHandler: (type, resTxt) => {
    if (type === "success") {
      var res = JSON.parse(resTxt);
      if (res.status !== 1) {
        return null;
      }
      return res.data;
    } else if (type === "error") {
      // todo toast
    } else if (type === "timeout") {
      // todo toast
    }
    return "upload failed__";
  }
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
