<template>
  <v-layout id="postCard">
    <v-flex xs12 sm8 style="margin: 0 auto;">
      <v-card>
        <v-card-title primary-title>
          <v-layout row wrap>
            <v-flex xs12 sm8 class="headline mb-0" id="ptitle">{{ pfdetail.title }}</v-flex>
            <v-flex xs12 sm4 style="font-size:17px;text-align:right;">{{ getpfdate }}</v-flex>
            <v-flex xs12 sm8  />
            <v-flex xs12 sm4 style="font-size:14px; text-align:right;">Posted By {{ pfdetail.writer  }}</v-flex>
            <div id="pbody" style="margin: 4% 0; font-size:17px;" v-html="pfdetail.body"> </div> <br />
          </v-layout>
        </v-card-title>

        <v-card-actions style="float:right;"  v-if="pfdetail.uid == this.$store.state.user.uid ">
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
  name: "PostDetail",
  data () {
    return {
      pdetail: this.$route.params,
      pdate: this.$route.params.date,
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
        this.pdetail.title;
      this.$http.post(url).then(response => {
        this.pdetail.title =
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
  #postCard{
    margin-top: 100px;
  }
}
@media screen and (min-width: 599px){
  #postCard{
    margin-top: 110px;
  }
}
</style>
