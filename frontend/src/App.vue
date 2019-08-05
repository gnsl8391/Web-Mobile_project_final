<template>
  <v-app>
    <v-content>
      <app-header />
      <app-topBut v-if="this.$route.path !== '/test'"/>
      <app-chatbot />
      <router-view />
      <app-footer v-if="this.$route.path !== '/test'"/>
    </v-content>
  </v-app>
</template>

<script>
import chatbot from "./components/Chatbot";
import store from "./store";
import mainHeader from "./components/header";
import mainFooter from "./components/footer";
import topBut from "./components/BackToTop";
import FirebaseService from "@/services/FirebaseService";
import Vue from "vue";
Vue.prototype.$EventBus = new Vue();

export default {
  name: "App",
  components: {
    "app-header": mainHeader,
    "app-footer": mainFooter,
    "app-topBut": topBut,
    "app-chatbot": chatbot
  },
  created() {
    FirebaseService.authChk();
  },
  store,
  data () {
    return {
      //
    };
  }
};

var BrowserChk = "";
var agt = navigator.userAgent.toLowerCase();
if (agt.indexOf("opera") != -1) BrowserChk = "Opera";
else if (agt.indexOf("staroffice") != -1) BrowserChk = "Star Office";
else if (agt.indexOf("webtv") != -1) BrowserChk = "WebTV";
else if (agt.indexOf("beonex") != -1) BrowserChk = "Beonex";
else if (agt.indexOf("chimera") != -1) BrowserChk = "Chimera";
else if (agt.indexOf("netpositive") != -1) BrowserChk = "NetPositive";
else if (agt.indexOf("phoenix") != -1) BrowserChk = "Phoenix";
else if (agt.indexOf("firefox") != -1) BrowserChk = "Firefox";
else if (agt.indexOf("skipstone") != -1) BrowserChk = "SkipStone";
else if (agt.indexOf("netscape") != -1) BrowserChk = "Netscape";
else if (agt.indexOf("edge") != -1) BrowserChk = "Explorer";
else if (agt.indexOf("chrome") != -1) BrowserChk = "Chrome";
if (BrowserChk != "Chrome") {
  if (window.Notification) {
    Notification.requestPermission();
  }

  var notification = new Notification("최적화 경고", {
    icon: "https://cdn1.iconfinder.com/data/icons/fruit-39/128/FRUIT_2-14-256.png",
    body: "해당 사이트는 크롬에서 최적화 되어있습니다."
  });
}
</script>
