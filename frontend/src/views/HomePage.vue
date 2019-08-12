<template style="padding:0px !important;">
  <div class="fullpage-container" style="max-height: 762px !important;">
    <div class="fullpage-wp" v-fullpage="opts" ref="example">
      <!-- 1 -->
      <v-layout class="page">
        <p sytle="margin-top: 30px !important;" id="firstPage">
          <ImgBanner id="ImgBanner" >
            <div id="banner" slot="text" class="animated bounceInDown">
              Think more strategically.<br />
              We always have.
            </div>
          </ImgBanner>
        </p>
      </v-layout>
      <!-- 2 -->
      <v-layout class="page-1">
        <p sytle="margin-top: 30px !important;" class="part-1" v-animate="{value: 'bounceInLeft'}">
          <!-- About Me -->
          <v-layout class="homePage">
            <v-flex sm1 hidden-xs-only/>
            <v-flex sm7 xs12>
              <!--소개 -->
              <v-menu offset-y>
                <template v-slot:activator="{ on }">
                  <v-btn flat dark v-on="on" >
                    <span  class="eachPageFont">About me</span>
                     <v-icon style="margin-left: 10px !important;" class="aNone">fas fa-chevron-down</v-icon>
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
                <vue-typer class="team_typer" text="야망을 가진 사람을 막을 수 있는 사람은 그 자신 뿐이다
- Charles Ross -"></vue-typer><br/>
              </p>
            </div>
          </v-flex>
          <v-flex sm4 hidden-xs-only>
            <div class="introDiv">
              <img
              src="../assets/team.jpg"
              id="introImg"
              aspect-ratio="0.6"
              style="width:20vw !important; height:25vw !important;"
              />
            </div>
          </v-flex>
        </v-layout>
      </p>
    </v-layout>
    <!-- 3 -->
    <v-layout class="page-2" style="background: #FAFAFA !important;">
      <p class="part-2" v-animate="{value: 'bounceInRight'}">
        <!-- Portfolio -->
        <v-layout id="portfolio">
          <v-flex xs12>
            <h2 class=" text-xs-center eachPageFont" style="margin-bottom:80px !important;">
              Portfolio
              <a href="/portfolio" class="aNone">
                <i class="fas fa-angle-right"></i>
              </a>
            </h2>
            <v-flex hidden-xs-only style="width:80% !important; margin: 0 auto !important;">
              <vueper-slides class="no-shadow" :visible-slides="3" :slide-ratio="1/4" :dragging-distance="70">
                <vueper-slide style="height:300px !important; margin: 0 5px!important;" v-for="(item,index) in data" :key="index" :image="item.dataMap.img" :title="item.dataMap.title" >
                </vueper-slide>
              </vueper-slides>
            </v-flex>
            <v-flex hidden-sm-and-up>
              <vueper-slides class="no-shadow" :visible-slides="1" :slide-ratio="1/4" :dragging-distance="70">
                <vueper-slide style="height:300px !important;" v-for="(item,index) in data" :key="index" :image="item.dataMap.img" :title="item.dataMap.title" >
                </vueper-slide>
              </vueper-slides>
            </v-flex>
          </v-flex>
        </v-layout>
      </p>
    </v-layout>
    <!-- 4 -->
    <v-layout class="page-3" style="background-color: #FAFAFA !important;">
      <p class="part-3" v-animate="{value: 'bounceInLeft', delay: 0}">
        <!-- Post -->
        <v-layout id="post" class="homePage" >
          <v-flex xs12 sm10 style="margin: 0 auto !important;">
            <h2 class="text-xs-center eachPageFont">
              Post
              <a href="/post" class="aNone">
                <i class="fas fa-angle-right"></i>
              </a>
            </h2>
            <PostList :column="2"></PostList>
          </v-flex>
        </v-layout>
      </p>
    </v-layout>
    <v-layout class="page-3" style="background: #FAFAFA !important;">
      <p class="part-1" v-animate="{value: 'bounceInLeft', delay: 0}">
        <v-layout my-5 id="github">
          <v-flex xs12>
            <h2 class=" text-xs-center my-5 eachPageFont">
              Project
              <a href="/git" class="aNone">
                <i class="fas fa-angle-right"></i>
              </a>
            </h2>
            <!-- git profile -->
            <v-layout row wrap class="align-center gitprofile" style="width:80% !important;">
              <v-flex v-for="(mem, i) in member" :index="i" v-bind:key="i" class="align-center" >
                <v-layout class="slideCard my-1 text-xs-center" v-animate="{value: 'zoomInDown', delay: i * 600}" style="margin:0 auto">
                  <v-flex sm4>
                    <img v-bind:src="mem.avatar_url" style="width : 50px !important;" />
                  </v-flex>
                  <v-flex sm8>
                    <a v-bind:href="mem.web_url" style="color: #FE2E64 !important; text-decoration:none !important;">
                      <span class="title">{{ mem.name }}</span>
                    </a>
                    <br />
                    <span style="font-size:10px !important; color:gray !important;">└ GitHub 바로 이동하기</span>
                    <br />
                    <span>@{{ mem.username }}</span>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
            <!--end git profile -->
          </v-flex>
        </v-layout>
      </p>
    </v-layout>
  </div>
</div>
</template>

<script>
import animateCss from "../css/animate.css";
import ImgBanner from "../components/ImgBanner";
import PortfolioList from "../components/PortfolioList";
import PostList from "../components/PostList";
import { Carousel3d, Slide } from "vue-carousel-3d";
import GitlabService from "@/services/GitlabService";
import { VueTyper } from "vue-typer";
import FirebaseService from "@/services/FirebaseService";
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";

export default {
  name: "HomePage",
  components: {
    ImgBanner,
    PostList,
    VueTyper,
    VueperSlides,
    VueperSlide
  },
  data: function() {
    var that = this;
    return {
      drawer: true,
      slides: 3,
      name: "Team",
      data: [
        {
          id: "No Id",
          dataMap: {
            title: "No Title",
            img: "https://uradi-sam.rs/UserFiles/products/details/"
          }
        }
      ],
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
      member: [{ avatar_url: "", username: "", web_url: "", name: "" }],
      index: 0,
      pageNum: 0,
      opts: {
        start: 0,
        dir: "v",
        loop: false,
        duration: 300,
        beforeChange: function(ele, current, next) {
          that.index = next;
        },
        afterChange: function(ele, current) {
          that.index = current;
        }
      }
    };
  },
  created() {
    FirebaseService.getPortfolios().then(r => {
      this.data = r.slice(0, 9);
    });
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
        if (id == null) {
          continue;
        }
        this.translateText(id.innerHTML, tagId[i], this.lang);
      }
    });
  },
  mounted() {
    this.getGitMember();
  //  this.slidePF();
  },
  computed: {
    getTags() {
      return this.tags;
    }
  },
  methods: {
    moveTo: function(index) {
      this.$refs.fullpage.$fullpage.moveTo(index, true);
    },
    showPage: function() {
      this.pageNum++;
      this.$refs.fullpage.$fullpage.$update();
    },
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
.action {
  touch-action: none;
}
body {
  margin: 0;
}
.fullpage-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
#banner {
  line-height: 1.2em;
  font-size: 5vw;
  text-shadow: 6px 6px 6px gray;
  font-weight: bold;
  color: #ffffff;
}
.eachPageFont {
  line-height: 1.2em;
  font-size: 5vw;
  font-weight: bold;
  color: #FA5882;
  margin-bottom:20px;
}
.aNone {
  color: pink !important;
}
.page {
  display: block;
  background: url("../assets/sky.gif") no-repeat center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  max-height: 762px !important;
}
.page-1 {
  padding-top: 100px;
  /* background-image: url("../assets/img/space.png"); */
  background: #FAFAFA;
  background-size: cover;
}
.page-2 {
  padding-top: 100px;
  background-color: #FAFAFA;
}
.page-3 {
  padding-top: 50px;
  background: #FAFAFA;
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
  .eachPageFont {
    line-height: 1.2em;
    font-size: 35px !important;
    font-weight: bold;
    color: #FA5882;
    margin-bottom:20px;
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
@media screen and (max-width: 598px) {
  .carousel-3d-container .carousel-3d-slide {
    padding: 20px;
  }
  .carousel-3d-container .carousel-3d-slide .title {
    font-size: 22px;
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
  .carousel-3d-container .carousel-3d-slide {
    padding: 20px;
  }
  .carousel-3d-container .carousel-3d-slide .title {
    font-size: 22px;
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
.right {
  display: none !important;
}
.team_typer {
  delay: 6000;
  font-size : 26px;
  font-family: 'Nanum Myeongjo', serif;
  color: white;
}
.slideCard {
  border-radius: 20px;
  border: 1px solid #FE2E64;
  position: relative;
}
@media screen and (max-width: 598px) {
  .slideCard {
    width: 250px;
    height: 100px;
    padding: 20px;
    padding-top: 24px;
  }
  .gitprofile {
    margin: 0 auto;
    margin-top: 60px;
  }
  .vueperslides__bullets {
    position: relative;
  }
  .vueperslides__arrows {
  }
  .vueperslides__parallax-wrapper {
        padding-bottom: 90% !important;
  }
}
@media screen and (min-width: 598px) {
  .slideCard {
    width: 300px;
    height: 130px;
    padding: 20px;
    padding-top: 35px;
  }
  .gitprofile {
    margin: 0 auto;
    margin-top: 100px;
  }
}
@media screen and (max-width: 970px) {
  #firstPage {
    margin-top: 200px;
  }
}
.vueperslide__content-wrapper {
  width: 100% !important;
  background-color: #ffffff!important;
  opacity: 0.5!important;
  font-size: 30px;
}
.vueperslides__bullet {
  border-color: #FA5882 !important;
}
.uploadPos {
  position: absolute;
  bottom : 2%;
}
svg {
  margin: 0 !important;
}
</style>
