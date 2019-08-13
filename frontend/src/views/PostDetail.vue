<template>
  <v-layout id="postCard">
    <v-flex xs12 sm8 style="margin: 0 auto;">
      <v-card  style="margin: 0 auto; position:relative !important;">
        <v-toolbar
      card
      color="white"
      dark
    >
      <v-toolbar-title style="color:#FFBF00" @click="goBack()">
         <i class="fas fa-chevron-left"></i> BACK
       </v-toolbar-title>
    </v-toolbar>
        <v-card-title primary-title>
          <v-layout row wrap>
            <v-flex v-if="!isUpdate" xs12 sm8 class="headline mb-0" id="pftitle">{{ pftitle }}</v-flex>
            <input v-else xs12 sm8 class="headline mb-0" v-model="pftitle" style="border: 1px solid #ccc;" />
            <v-flex xs12 sm4 style="font-size:17px;text-align:right;">{{ getpfdate }}</v-flex>
            <v-flex xs12 sm8  />
            <v-flex xs12 sm4 style="font-size:14px; text-align:right;">Posted By {{ pfdetail.writer  }}</v-flex>
            <ImgUpload v-if="isUpdate" />
            <div v-if="!isUpdate" id="pfbody" style="margin: 4% 0; font-size:17px;" v-html="pfbody"> </div>
            <yimo-vue-editor v-else v-model="pfbody"></yimo-vue-editor>
             <br />
          </v-layout>
        </v-card-title>
        <v-card-actions style="float:right;"  v-if="this.$store.state.user != '' && (pfdetail.uid == this.$store.state.user.uid) ">
          <v-btn v-if="!isUpdate" flat color="orange" @click="update=true">
            수정
          </v-btn>
          <v-btn v-else flat color="orange" @click="ClickUp">
            저장
          </v-btn>
          <template>
            <div class="text-xs-center">
            <v-dialog v-model="pfDelDialog" persistent max-width="290">
              <template v-slot:activator="{ on }">
                <v-btn
                flat
                color="orange"
                v-on="on"
                >
                삭제
              </v-btn>
              </template>
              <v-card>
                <v-card-text>삭제하시겠습니까?</v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="orange darken-1" flat @click="ClickDel">예</v-btn>
                  <v-btn color="orange darken-1" flat @click="pfDelDialog = false">아니요</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog
            v-model="loading"
            hide-overlay
            persistent
            width="300"
            >
            <v-card
            color="#FACC2E"
            dark
            >
            <v-card-text>
              처리 중...
              <v-progress-linear
              indeterminate
              color="white"
              class="mb-0"
              ></v-progress-linear>
            </v-card-text>
          </v-card>
        </v-dialog>
      </div>
</template>
        </v-card-actions>
        <div style="display:hidden; clear:both;"></div>
      </v-card>
      <br /><br />
      <div v-if="this.$store.state.user != ''">
        <Comment :pfid="this.$route.params.pid" :pfauth="pfauth"/>
      </div>
      <br /><br />
    </v-flex>
  </v-layout>
</template>

<script>
import FirebaseService from "@/services/FirebaseService";
import YimoVueEditor from "yimo-vue-editor";
import ImgUpload from "../components/ImgUpload";
import Comment from "../components/Comment";
export default {
  name: "PortfolioDetail",
  data () {
    return {
      pfauth: this.$route.params.auth,
      pfdetail: this.$route.params,
      pfdate: this.$route.params.date,
      pftitle: this.$route.params.title,
      pfbody: this.$route.params.body,
      lang: "ko",
      loading: false,
      update: false,
      getpfdate: "",
      pfDelDialog: false
    };
  },
  components: {
    YimoVueEditor,
    ImgUpload,
    Comment
  },
  created() {
    if (typeof this.$route.params.pid == "undefined") {
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
    isUpdate() {
      return this.update;
    }
  },
  mounted() {
    console.log(this.pfdate);
    this.getpfdate = this.pfdate.toString().substring(0, 25);
  },
  methods: {
    goBack() {
      this.$router.push("/post");
    },
    translateText(target) {
      var url =
        "https://www.googleapis.com/language/translate/v2?key=AIzaSyA0_KdshFIp0aoX7fbaKVTZmuvk3GBrlls&target=" +
        target +
        "&format=html&q=" +
        this.pftitle;
      this.$http.post(url).then(response => {
        this.pftitle =
          response.data.data.translations[0].translatedText;
      });

      url =
        "https://www.googleapis.com/language/translate/v2?key=AIzaSyA0_KdshFIp0aoX7fbaKVTZmuvk3GBrlls&target=" +
        target +
        "&format=html&q=" +
        this.pfbody;
      this.$http.post(url).then(response => {
        this.pfbody =
          response.data.data.translations[0].translatedText;
      });
    },
    ClickDel() {
      this.loading = true;
      setTimeout(() => (this.loading = false
      ), 2000);
      FirebaseService.deletePost(this.pfdetail.pid);
      setTimeout(() => (
        this.$router.go(-1)
      ), 2000);
    },
    ClickUp() {
      this.loading = true;
      setTimeout(() => (this.loading = false
      ), 2000);
      FirebaseService.updatePost(
        this.pfdetail.pid,
        this.pftitle,
        this.pfbody
      );
      setTimeout(() => (
        this.$router.go(-1)
      ), 2000);
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
