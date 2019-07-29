<template>
  <v-layout id="portfolioCard">
    <v-flex xs12 sm8 style="margin: 0 auto;">
      <v-card>
        <v-img
          :src="pfdetail.imgSrc"
          aspect-ratio="2.75"
        ></v-img>

        <v-card-title primary-title>
          <v-layout row wrap>
            <v-flex xs12 sm8 class="headline mb-0" id="pftitle">{{ pfdetail.title }}</v-flex>
            <v-flex xs12 sm4 style="font-size:17px;text-align:right;">{{ getpfdate }}</v-flex>
            <v-flex xs12 sm8  />
            <v-flex xs12 sm4 style="font-size:14px; text-align:right;">Posted By yex38144@naver.com</v-flex>
            <div id="pfbody" style="margin: 4% 0; font-size:17px;" v-html="pfdetail.body"> </div> <br />
          </v-layout>
        </v-card-title>

        <v-card-actions style="float:right;">
          <v-btn flat color="orange">수정</v-btn>
          <v-btn flat color="orange">삭제</v-btn>
        </v-card-actions>

        <div style="display:hidden; clear:both;"></div>
      </v-card>
      <br />
      <br />
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "PortfolioDetail",
  data () {
    return {
      card_text: "Lorem ipsum dolor sit amet, brute iriure accusata ne mea. Eos suavitate referrentur ad, te duo agam libris qualisque, utroque quaestio accommodare no qui. Et percipit laboramus usu, no invidunt verterem nominati mel. Dolorem ancillae an mei, ut putant invenire splendide mel, ea nec propriae adipisci. Ignota salutandi accusamus in sed, et per malis fuisset, qui id ludus appareat.",
      pfdetail: this.$route.params,
      pfdate: this.$route.params.date,
      lang: "ko"
    };
  },
  created() {
    if (typeof this.$route.params.pfid == "undefined") { // 새로고침시 파라미터 분실, 이전페이지 이동으로 예외처리
      this.$router.go(-1);
    }
    this.$EventBus.$on("click-icon", () => {
      if (this.lang == "ko") {
        this.lang = "en";
      } else {
        this.lang = "ko";
      }

      this.translateText(this.lang);
    });
  },
  computed: {
    getpfdate() {
      if (typeof this.$route.params.pfid == "undefined") return false; // 예외처리
      return this.pfdate.substring(0, 25);
    }
  },
  methods: {
    translateText(target) {
      var url =
        "https://www.googleapis.com/language/translate/v2?key=AIzaSyA0_KdshFIp0aoX7fbaKVTZmuvk3GBrlls&target=" +
        target +
        "&format=html&q=" +
        this.pfdetail.title;
      this.$http.post(url).then(response => {
        this.pfdetail.title =
          response.data.data.translations[0].translatedText;
      });

      url =
        "https://www.googleapis.com/language/translate/v2?key=AIzaSyA0_KdshFIp0aoX7fbaKVTZmuvk3GBrlls&target=" +
        target +
        "&format=html&q=" +
        this.pfdetail.body;
      this.$http.post(url).then(response => {
        this.pfdetail.body =
          response.data.data.translations[0].translatedText;
      });
    }
  }
};
</script>

<style>
@media screen and (max-width: 598px){
  #portfolioCard{
    margin-top: 100px;
  }
}
@media screen and (min-width: 599px){
  #portfolioCard{
    margin-top: 110px;
  }
}
</style>
