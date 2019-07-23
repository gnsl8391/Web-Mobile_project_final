<template>
  <div>
    <ImgBanner v-bind:imgSrc="imgBannerUrl" id="ImgBanner">
      <div id="banner" slot="text" class="animated bounceInDown">
        Think more strategically.<br />
        We always have.
      </div>
    </ImgBanner>
    <ImgUpload style="margin-left:2%; width : 98%;" />
    <v-container id="aboutMe">
      <!-- About Me -->
      <v-layout class="homePage">
        <v-flex sm hidden-xs8-only>
          <!--소개 -->
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn flat dark v-on="on" style="color:black; font-size:30px;">
                About me <i class="material-icons">reorder</i>
              </v-btn>
            </template>
            <v-list>
              <v-list-tile
                v-for="(item, index) in items"
                :key="index"
                @click="showIntro(item.title, item.content, item.image)"
              >
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
          <!--소개끝-->
          <div class="introDiv">
            <h2 id="introTitle">Team 2. 야망</h2>
            <p id="intro">
              <span style="font-style: italic; font-size : 26px;">
                야망을 가진 사람을 막을 수 있는 사람은<br />
                그 자신 뿐이다.<br />
                - Charles Ross -
              </span>
            </p>
          </div>
        </v-flex>
        <v-flex xs4 hidden-xs-only>
          <v-btn style="display:none;font-size:30px;" flat>
            About me
          </v-btn>
          <div class="introDiv">
            <img
              src="../assets/team.jpg"
              id="introImg"
              aspect-ratio="0.6"
              style="width:20vw; height:25vw"
            />
          </div>
        </v-flex>
      </v-layout>

      <!-- Portfolio -->
      <v-layout id="portfolio" class="pfPage">
        <v-flex xs12>
          <h2 class="headline my-5 text-xs-center">
            Portfolio
            <a href="/portfolio">
              <i class="material-icons">keyboard_arrow_right</i>
            </a>
          </h2>
          <PortfolioList></PortfolioList>
        </v-flex>
      </v-layout>
      <!-- Post -->
      <v-layout id="post" class="homePage">
        <v-flex xs12>
          <h2 class="headline my-5 text-xs-center">
            Post
            <a href="/post">
              <i class="material-icons">keyboard_arrow_right</i>
            </a>
          </h2>
          <PostList :column="2"></PostList>
        </v-flex>
      </v-layout>
      <!-- Github -->
      <v-layout my-5 id="github">
        <v-flex xs12>
          <h2 class="headline my-5 text-xs-center">
            Project
            <a href="/git">
              <i class="material-icons">keyboard_arrow_right</i>
            </a>
          </h2>
          <div id="example">
            <carousel-3d :autoplay="true" :autoplay-timeout="3000" :display="3">
              <slide v-for="(mem, i) in member" :index="i" v-bind:key="i">
                <v-layout class="slideCard">
                  <v-flex sm4>
                    <img v-bind:src="mem.avatar_url" style="width : 50px" />
                  </v-flex>
                  <v-flex sm8>
                    <a v-bind:href="mem.web_url">
                      <span class="title">{{ mem.name }}</span>
                    </a>
                    <br />
                    <span>{{ mem.username }}</span>
                  </v-flex>
                </v-layout>
              </slide>
            </carousel-3d>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import animateCss from "../css/animate.css"
import ImgBanner from "../components/ImgBanner";
import PortfolioList from "../components/PortfolioList";
import PostList from "../components/PostList";
import ImgUpload from "@/components/ImgUpload";
import { Carousel3d, Slide } from "vue-carousel-3d";
import GitlabService from "@/services/GitlabService";

export default {
  name: "HomePage",
  components: {
    ImgBanner,
    ImgUpload,
    PortfolioList,
    PostList,
    Carousel3d,
    Slide
  },
  data: () => ({
    drawer: true,
    slides: 3,
    name: "Team",
    items: [
      {
        title: "Team",
        content:
          "야망을 가진 사람을 막을 수 있는 사람은<br>\
                                    그 자신 뿐이다.<br>\
                                    - Charles Ross -",
        image: "team.jpg"
      },
      {
        title: "강은주",
        content:
          "- 2011.03 - 2014.02 중앙여자고등학교<br>\
                                    - 2014.03 - 2019.02 순천대학교 멀티미디어공학과<br>\
                                    - 2018.12 - 2019.12 Samsung SW Academy For Youth 1기 교육생<br><br><hr><br>\
                                    - 자격증 : 컴퓨터그래픽스운용기능사, 웹디자인기능사,<br>\
                                              정보처리기사, SQLD<br>\
                                    - 어학 : 토익 725, 오픽 IM2",
        image: "eunju.png"
      },
      {
        title: "김훈",
        content:
          "- 2006.03 ~ 2009.02 풍암고등학교<br>\
                                    - 2009.03 ~ 2017.02 전남대학교 기계공학과 자동차공학전공<br>\
                                    - 2016.03 ~ 2017.08 전남대학교 기계공학과 수소연료전지 / 차량 섀시 진동제어 LAB 연구생<br>\
                                    - 2018.12 ~ 2019.12 Samsung SW Academy For Youth 1기 교육생<br><br><hr><br>\
                                    - 2017.09 ~ 2018.06 효성모터스 CATIA 설계파트 근무<br>\
                                    - 동부전자 아이디어 공모전 수상",
        image: "hoon.png"
      },
      {
        title: "정가영",
        content:
          "- 2010.03 - 2012.02 설월여자고등학교<br>\
                                    - 2013.02 - 2017.02 광운대학교 컴퓨터공학과 졸업<br>\
                                    - 2018.12 - 2019.12 Samsung SW Academy For Youth 1기 교육생<br/><br><hr><br>\
                                    - 이브와 ICT 멘토링 공모전 수상<br>\
                                    - SAFEFOOD 프로젝트 1등 수상<br/>\
                                    - 자격증 : 정보처리기사, SQLD<br/>\
                                    - 어학 : 토익 825점",
        image: "yeong.jpg"
      }
    ],
    lang: "ko",
    imgBannerUrl: "https://source.unsplash.com/user/erondu/1600x900",
    member: [{ avatar_url: "", username: "", web_url: "", name: "" }]
  }),
  created() {
    this.$EventBus.$on("ImgSign", link => {
      this.imgBannerUrl = link;
    });
    this.$EventBus.$on("click-icon", () => {
      this.drawer = !this.drawer;
      if (this.lang == "ko") {
        this.lang = "en";
      } else {
        this.lang = "ko";
      }
      var tagId = ["introTitle", "intro"];
      for (var i = 0; i < tagId.length; i++) {
        var id = document.getElementById(tagId[i]);
        this.translateText(id.innerHTML, tagId[i], this.lang);
      }
    });
  },
  mounted() {
    this.getGitMember();
  },
  methods: {
    getGitMember() {
      GitlabService.getMembers().then(data => {
        this.member = data.data;
      });
    },
    getImgUrl(img) {
      return require("../assets/" + img);
    },
    showIntro(name, content, image) {
      this.name = name;
      if (name == "Team") {
        var desc = document.getElementById("intro");
        desc.innerHTML =
          "<span style='font-style: italic; font-size : 26px;'>" +
          content +
          "</span>";
        var img = document.getElementById("introImg");
        img.src = require("../assets/" + image);
        var history = document.getElementById("introTitle");
        history.innerHTML = name + " 2. 야망";
      } else {
        desc = document.getElementById("intro");
        desc.innerHTML = content;
        img = document.getElementById("introImg");
        img.src = require("../assets/" + image);
        history = document.getElementById("introTitle");
        history.innerHTML = name + " 이력";
      }
    },
    translateText(sourceText, tagId, target) {
      var url =
        "https://www.googleapis.com/language/translate/v2?key=AIzaSyA0_KdshFIp0aoX7fbaKVTZmuvk3GBrlls&target=" +
        target +
        "&format=html&q=" +
        sourceText;
      this.$http.post(url).then(response => {
        document.getElementById(tagId).innerHTML =
          response.data.data.translations[0].translatedText;
        return response.data.data.translations[0].translatedText;
      });
    }
  }
};
</script>

<style>
#banner {
  line-height: 1.2em;
  font-size: 5vw;
  text-shadow: 6px 6px 6px gray;
  font-weight: bold;
  color: #ffffff;
}
.vue-radial-menu-wrapper {
  margin: 100px auto !important;
}
@media screen and (max-width: 550px) {
  #intro {
    font-size: 13px;
    margin-top: 10px;
  }
  .introDiv {
    padding: 10px;
    margin-top: 10px;
  }
}
@media screen and (min-width: 550px) and (max-width: 598px) {
  #intro {
    font-size: 15px;
    margin-top: 10px;
  }
  .introDiv {
    padding: 30px;
  }
}
@media screen and (min-width: 599px) and (max-width: 958px) {
  .homePage {
    height: 600px;
  }
  .pfPage {
    height: 880px;
  }
  #post {
    height: 800px;
  }
  #intro {
    font-size: 16px;
    margin-top: 10px;
  }
  .introDiv {
    padding: 30px;
    margin-top: 8%;
  }
  #introImg {
    min-width: 200px !important;
    min-height: 250px !important;
    margin-top: 60px;
  }
}
@media screen and (min-width: 958px) {
  .homePage {
    height: 600px;
  }
  .pfPage {
    height: 650px;
  }
  #intro {
    font-size: 16px;
    margin-top: 10px;
  }
  .introDiv {
    padding: 30px;
    margin-top: 8%;
  }
}
.homePage {
  padding: 30px;
}
.pfPage {
  padding-top: 30px;
}
@media screen and (max-width: 598px) {
  .carousel-3d-container {
    .carousel-3d-slide {
      padding: 20px;
      .title {
        font-size: 22px;
      }
    }
  }
  .slideCard {
    padding: 20px;
    padding-top: 50px;
  }
  .carousel-3d-slider {
    margin: 0 auto !important;
    padding-left: 16% !important;
  }
  .carousel-3d-slide {
    background-color: #f0faff !important;
    border: 1px solid #aacdd5 !important;
    border-radius: 20px;
    height: 150px !important;
    width: 230px !important;
  }
  .current {
    background: white !important;
    margin-top: 15px;
  }
}
@media screen and (min-width: 599px) {
  .carousel-3d-container {
    .carousel-3d-slide {
      padding: 20px;
      .title {
        font-size: 22px;
      }
    }
  }
  .slideCard {
    padding: 40px;
  }
  .carousel-3d-slider {
    margin: 0 auto !important;
    padding-left: 3% !important;
  }
  .carousel-3d-slide {
    background-color: #f0faff !important;
    border: 1px solid #aacdd5 !important;
    border-radius: 20px;
    height: 150px !important;
    width: 300px !important;
  }
  .current {
    background: white !important;
    margin-top: 15px;
  }
}
</style>
