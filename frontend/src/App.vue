<template>
  <v-app>
    <v-content>
      <app-header />
      <app-topBut />
      <router-view />
      <app-footer />
    </v-content>
  </v-app>
</template>

<script>
import store from "./store";
import mainHeader from "./components/header";
import mainFooter from "./components/footer";
import topBut from "./components/BackToTop";
import Vue from "vue";
import firebase from "firebase/app";
// import provise from "@/services/provise";
Vue.prototype.$EventBus = new Vue();

export default {
  name: "App",
  components: {
    "app-header": mainHeader,
    "app-footer": mainFooter,
    "app-topBut": topBut
  },
  store,
  data () {
    return {
      //
    };
  }
  // created() {
  //   var config = {
  //     apiKey: "AIzaSyC38Q6st2D5nlzoosGxMuZMm_-dz9wDDBU",
  //     authDomain: "ssafy-2team-dc2b4.firebaseapp.com",
  //     databaseURL: "https://ssafy-2team-dc2b4.firebaseio.com",
  //     projectId: "ssafy-2team-dc2b4",
  //     storageBucket: "gs://ssafy-2team-dc2b4.appspot.com",
  //     messagingSenderId: "72397315856"
  //   };
  //   firebase.initializeApp(config);
  //   const messaging = firebase.messaging();
  //
  //   messaging
  //     .requestPermission()
  //     .then(() => firebase.messaging().getToken())
  //     .then((token) => {
  //       console.log(token); // Receiver Token to use in the notification
  //     })
  //     .catch(function(err) {
  //       console.log("Unable to get permission to notify.", err);
  //     });
  //
  //   messaging.onMessage(function(payload) {
  //     console.log("Message received. ", payload);
  //   });
  // }
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
    icon: "fruit.png",
    body: "해당 사이트는 크롬에서 최적화 되어있습니다."
  });
}
</script>

<style>

</style>
