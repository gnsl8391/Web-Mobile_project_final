<template>
  <v-footer dark height="auto">
    <v-card class="flex" flat tile>
      <v-card-actions class=" darken-3 justify-center footBack">
        &copy;2019 — <strong>SSAFY Gwangju Team No.2</strong>
      </v-card-actions>
      <v-card-actions class="footBackUp">
        <div style="float:left; width:50%;" v-if="lang == 'ko'">
          <weather
            class="weather"
            api-key="8ed4b87ccc9c324abb1c611e1d523631"
            title="Weather"
            latitude="35.160071"
            longitude="126.851391"
            language="ko"
            units="si"
          >
          </weather>
        </div>
        <div style="float:left; width:50%;" v-else>
          <weather
            class="weather"
            api-key="8ed4b87ccc9c324abb1c611e1d523631"
            title="Weather"
            latitude="35.160071"
            longitude="126.851391"
            language="en"
            units="si"
          >
          </weather>
        </div>
        <div id="info" style="float:left; width: 50%;font-size:1.5vw; ">
          <h3 class="forTrans">Team Info.</h3>
          <span class="forTrans">* Leader : Gayeong Jeong</span><br />
          <span class="forTrans">* Member : Eunju Kang, Hoon Kim</span><br />
          <span class="forTrans">* Duration : 2019.07.01 ~ 2019.08.13</span><br />
          <span>* Git : github 바로가기 <a href="https://lab.ssafy.com/tastera/webmobile-sub2.git"> <i class="fab fa-github"></i></a></span>
        </div>
      </v-card-actions>
    </v-card>
  </v-footer>
</template>

<script>
import VueWeatherWidget from "vue-weather-widget";
import "vue-weather-widget/dist/css/vue-weather-widget.css";

export default {
  name: "app",
  data() {
    return {
      view: false,
      country: "",
      city: "",
      icon: "",
      temp: "",
      humid: "",
      wmain: "",
      desc: "",
      speed: "",
      cloud: "",
      lang: "ko"
    };
  },
  components: {
    weather: VueWeatherWidget
  },
  created() {
    this.$EventBus.$on("click-icon", () => {
      if (this.lang == "ko") {
        this.lang = "en";
      } else {
        this.lang = "ko";
      }
      var tagId = ["forTrans"];
      for (var i = 0; i < tagId.length; i++) {
        var tag = document.getElementsByClassName(tagId[i]);
        for (var j = 0; j < tag.length; j++) {
          this.translateText(tag[j].innerHTML, tagId[i], j, this.lang);
        }
      }
    });
  },
  computed: {
    hasResult: function() {
      return this.posts.length > 0;
    }
  },
  methods: {
    translateText(sourceText, tagId, tagIdIdx, target) {
      var url =
        "https://www.googleapis.com/language/translate/v2?key=AIzaSyA0_KdshFIp0aoX7fbaKVTZmuvk3GBrlls&target=" +
        target +
        "&format=html&q=" +
        sourceText;
      this.$http.post(url).then(response => {
        document.getElementsByClassName(tagId)[tagIdIdx].innerHTML =
          response.data.data.translations[0].translatedText;
      });
    }
  }
};
</script>
<style>
.footBackUp {
  background-color: #e6e6e6;
  border-color: #e6e6e6;
  color: black;
  height: 150px;
  text-align: left;
}
.footBackUpSm {
  background-color: #e6e6e6;
  border-color: #e6e6e6;
  color: black;
  height: 100px;
  text-align: left;
}
.footBack {
  background-color: #f7d358;
  border-color: #f7d358;
}
.fe_temp_bar {
  height: 1px !important;
  top: 5px !important;
}

.fe_location {
  display: none;
}
.fe_container {
  height: 110px !important;
  margin: 0 auto !important;
}
.fe_container .fe_title {
  border: 0px !important;
  border-color: none !important;
  display: none !important;
}

.fe_container #fe_current_icon {
  width: 50px !important;
  height: 50px !important;
}
.fe_container .fe_currently .fe_temp {
  font-size: 35px !important;
}
.fe_dir svg {
  height: 20px !important;
}
@media screen and (max-width: 416px) {
  #info {
    font-size: 10px !important;
  }
  .fe_container .fe_currently {
    width: 100% !important;
  }
  .fe_daily {
    display: none !important;
  }
}
@media screen and (min-width: 417px) and (max-width: 682px) {
  #info {
    font-size: 12px !important;
  }
  .fe_daily {
    display: none !important;
  }
  .fe_container .fe_currently {
    width: 100% !important;
  }
}
@media screen and (min-width: 683px) and (max-width: 782px) {
  #info {
    font-size: 12px !important;
  }
}
@media screen and (min-width: 783px) and (max-width: 1000px) {
  #info {
    font-size: 13px !important;
  }
  .weather {
    width: 400px !important;
  }
  .fe_container .fe_currently {
    width: 30% !important;
  }
}
@media screen and (min-width: 1000px) {
  #info {
    font-size: 16px !important;
  }
  .fe_container .fe_currently {
    width: 30% !important;
  }
}
.weather {
  min-width: 200px;
  height: 210px;
  max-width: 500px;
  color: white;
  margin: 0;
}
.fe_summary {
  font-size: 15px !important;
}
</style>
