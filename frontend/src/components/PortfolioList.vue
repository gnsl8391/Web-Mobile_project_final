<template>
  <v-layout mt-5 wrap >
    <v-flex
      v-for="i in portfolios.length > limits ? limits : portfolios.length"
      v-bind:key="i"
      xs12
      sm6
      md4
    >
      <Portfolio
        class="ma-3 animated bounceIn"
        :pfid="portfolios[i - 1].id"
        :date="portfolios[i - 1].dataMap.created_at.toString()"
        :title="portfolios[i - 1].dataMap.title"
        :body="portfolios[i - 1].dataMap.body"
        :imgSrc="portfolios[i - 1].dataMap.img"
        :uid="portfolios[i -1 ].dataMap.uid"
        :writer="portfolios[i - 1].dataMap.writer"
      />
    </v-flex>
    <v-flex xs12 text-xs-center round my-5 v-if="loadMore">
      <v-btn color="info" dark v-on:click="loadMorePortfolios">
        <v-icon size="25" class="mr-2">fa-plus</v-icon>
        더 보기
      </v-btn>
      <v-dialog v-model="dialog" persistent max-width="800px" v-if="chkMyauth">
        <template v-slot:activator="{ on }">
          <v-btn
            color="warning"
            dark
            v-on="on"
            v-on:click="$EventBus.$emit('radio')"
          >
            <v-icon size="20px" class="mr-2">
              fas fa-pen
            </v-icon>
            글 쓰기
          </v-btn>
        </template>
        <v-card style="height:60%">
          <v-card-title>
            <span class="headline">CREATE PORTFOLIO</span>
          </v-card-title>
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs12 md7>
                <form>
                  <span style="margin-left:3%">TITLE : </span>
                  <input v-model="title" type="text" id="title" />
                  <input
                    type="file"
                    @change="onFileSelected"
                    style="display: none; margin: 3%;"
                    ref="fileInput"
                    accept="image/*"
                  />
                  <div style="margin-left: 3%; margin-top : 3%">
                    <ImgUpload />
                  </div>
                </form>
              </v-flex>
              <v-flex xs12 md5 style="text-align:center;" id="preImg">
                <img :src="imageUrl" style="max-height:170px; max-width: 270px;" />
              </v-flex>
            </v-layout>
            <yimo-vue-editor v-model="body"></yimo-vue-editor>

          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="dialog = false">
              Close
            </v-btn>
            <v-btn color="blue darken-1" flat @click="onUpload">
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-flex>
  </v-layout>
</template>

<script>
import YimoVueEditor from "yimo-vue-editor";
import animateCss from "../css/animate.css";
import Portfolio from "@/components/Portfolio";
import FirebaseService from "@/services/FirebaseService";
import ImgUpload from "@/components/ImgUpload";
export default {
  name: "PortfoliosList",
  props: {
    limits: { type: Number, default: 3 },
    loadMore: { type: Boolean, default: false }
  },
  data() {
    return {
      title: "",
      body: "",
      imageUrl: "",
      portfolios: [],
      dialog: false,
      options: {
        // lineNumbers: true,
        // styleActiveLine: true,
        // styleSelectedText: true,
        // lineWrapping: true,
        // indentWithTabs: true,
        // tabSize: 2,
        // indentUnit: 2
      },
      image: null,
      switchDiv: true,
      imgurImg: [],
      url: "",
      myauth: false
    };
  },
  components: {
    Portfolio,
    ImgUpload,
    YimoVueEditor
  },
  created() {
    this.$EventBus.$on("ImgSign", link => {
      this.imageUrl = link;
      this.image = link;
    });
    this.$EventBus.$on("desktopImg", () => {
      this.onPickFile();
    });
  },
  mounted() {
    this.getPortfolios();
  },
  computed: {
    formIsValid() {
      return this.imageUrl !== "";
    },
    chkMyauth() {
      console.log(this.myauth + "!!!!!!!!!!!!!!!!!!!");
      return this.myauth;
    }
  },
  beforeUpdate() {
    this.curAuthChk();
  },
  methods: {
    curAuthChk() {
      if (this.$store.state.user == "") this.myauth = false;
      else {
        const auths = FirebaseService.getOneMembers(this.$store.state.user.uid);
        auths.then(auth => {
          if (auth == null || auth.myauth == "visitor") this.myauth = false;
          else this.myauth = true;
        });
      }
    },
    curAuthChk2() {
      if (this.$store.state.user == "") return false;
      const auths = FirebaseService.getOneMembers(this.$store.state.user.uid);
      auths.then(auth => {
        if (auth == null || auth.myauth == "visitor") return false;
        else return true;
      });
    },
    async getPortfolios() {
      this.portfolios = await FirebaseService.getPortfolios();
    },
    loadMorePortfolios() {
      this.limits += 6;
    },

    onCreatePortfolio() {
      if (!this.formIsValid) {
        return;
      }
      if (!this.image) {
        return;
      }
      const portfolioData = {
        image: this.image
      };
      this.$store.dispatch("getPortfolios", portfolioData);
      this.$router.push("/portfolio");
    },
    onPickFile() {
      this.$refs.fileInput.click();
    },
    onFileSelected(event) {
      const files = event.target.files;
      let filename = files[0].name;
      if (filename.lastIndexOf(".") <= 0) {
        return alert("유효한 파일이 아닙니다.");
      }
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.imageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      this.image = files[0];
    },
    async onUpload() {
      if (this.title.length == 0) {
        alert("제목을 입력해주세요.");
        document.getElementById("title").focus();
        return false;
      } else if (this.body.length == 0) {
        alert("내용을 입력해주세요.");
        return false;
      }
      const axios = require("axios");
      let formData = new FormData();
      formData.append("image", this.image);
      await axios({
        method: "POST",
        url: "https://api.imgur.com/3/image",
        data: formData,
        headers: {
          Authorization: "Client-ID 031f94c0b39fe5f"
        },
        mimeType: "multipart/form-data"
      })
        .then(res => {
          var userName = "";
          if (this.$store.state.user.displayName == "") {
            userName = this.$store.state.user.email;
          }
          else {
            userName = this.$store.state.user.displayName;
          }
          FirebaseService.postPortfolio(
            this.title,
            this.body,
            res.data.data.link,
            this.$store.state.uid,
            userName
          );
        })
        .catch(() => {
          FirebaseService.postPortfolio(
            this.body,
            "https://source.unsplash.com/random/1600x900"
          );
        });
      alert("저장되었습니다!");
      location.reload();
      this.dialog = false;
    }
  }
};
</script>
<style>
.mw-700 {
  max-width: 700px;
  margin: auto;
}
#title {
  width: 80%;
  border: 1px solid #bdbdbd;
  border-radius: 5px;
}
</style>
