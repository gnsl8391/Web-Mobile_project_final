<template>
  <v-expansion-panel>
      <v-layout row wrap style="width:100%; height: 48px;">
        <v-flex xs2 style="text-align: center; line-height: 48px;">
          <b>
            <span v-if="this.$store.state.user.displayName != undefined">
              {{ this.$store.state.user.displayName }}
            </span>
            <span v-else>
              {{ this.$store.state.user.email.split('@')[0] }}
            </span>
          </b>
        </v-flex>
        <v-flex xs8>
         <input type="text" id="Comtitle" v-model="comment" />
        </v-flex>
        <v-flex xs2 hidden-sm-and-up>
        <v-btn hidden-xs-and-up color="error" @click="regComm" style="min-width:10px !important; padding: 0 11px;">
          <i class="fas fa-pen"></i>
        </v-btn>
        </v-flex>
        <v-flex xs2 hidden-xs-only>
          <v-btn  color="error" @click="regComm" style="min-width:10px !important;">등록</v-btn>
        </v-flex>
      </v-layout>
    <v-expansion-panel-content
      v-for="(item,i) in comm"
      :key="i"
      expand-icon="fas fa-angle-down"
    >
      <template v-slot:header>
        <div>
          <p><i class="fas fa-user-edit"></i>
            <b> {{ item.pfc_writer }}</b>
            &nbsp;&nbsp;&nbsp;&nbsp;
            {{ item.pfc_date }} |
               <i class="fas fa-times" style="color: red;" @click="delComm(item.pfc_id)"/>
          </p>
          <p>{{ item.pfc_content }}</p>
        </div>
      </template>
      <v-card>
        <v-card-text class="lighten-3" style="background-color: #F2F2F2;">
        </v-card-text>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
export default{
  name: "Comment",
  props: {
    pfid: { type: String }
  },
  data () {
    return {
      lang: "ko",
      comm: [],
      comment: "",
      subcomment: ""
    };
  },
  created() {
    // axios로 댓글 내용 가져오기
    this.getComm();
  },
  methods: {
    getComm() {
      // portfolio인지 post인지
      // 글 id
      const axios = require("axios");
      let formData = new FormData();
      formData.append("pfid", this.pfid);
      var category = window.location.pathname.split("/")[1];
      if (category == "portfolioDetail") {
        axios.post("/getPfComment", formData).then(res => {
          this.comm = res.data;
          this.comment = "";
        })
          .catch((ex) => {
            console.log(ex);
          });
      }
    },
    regComm() {
      if (window.location.pathname == "/portfolioDetail") {
        const axios = require("axios");
        let formData = new FormData();
        formData.append("pfid", this.pfid);
        if (this.$store.state.user.displayName != undefined) {
          formData.append("pfc_writer", this.$store.state.user.displayName);
        }
        else {
          formData.append("pfc_writer", this.$store.state.user.email.split("@")[0]);
        }
        formData.append("pfc_writerUid", this.$store.state.user.uid);
        formData.append("pfc_content", this.comment);
        var category = window.location.pathname.split("/")[1];
        if (category == "portfolioDetail") {
          axios.post("/regPfComment", formData).then(res => {
            this.getComm();
          })
            .catch((ex) => {
              console.log(ex);
            });
        }
      }
      else if (window.location.pathname == "/postDetail") {
        console.log("good");
      }
    },
    delComm(val) {
      var del = confirm("삭제하시겠습니까?");
      const axios = require("axios");
      let formData = new FormData();
      formData.append("pfc_id", val);
      var category = window.location.pathname.split("/")[1];
      if (category == "portfolioDetail") {
        axios.post("/delPfComment", formData).then(res => {
          this.getComm();
        })
          .catch((ex) => {
            console.log(ex);
          });
      }
    },
    regSubComm() {
      console.log(this.subcomment);

      this.subcomment = "";
    },
    delSubComm(val) {
      console.log(val);
    }
  }
};
</script>
<style>
#Comtitle {
  width: 100% !important;
  height: 40px;
  margin-top: 5px;
  border: 1px solid #bdbdbd;
  border-radius: 5px;
}
</style>
