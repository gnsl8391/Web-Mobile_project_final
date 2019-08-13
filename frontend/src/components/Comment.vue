<template>
  <v-expansion-panel>
      <v-layout row wrap style="width:100%; height: 48px;">
        <v-flex xs2 style="text-align: center; line-height: 48px;">
          <b>
            <span v-if="displayName != undefined">
              {{ displayName }}
            </span>
            <span v-else>
              {{ email }}
            </span>
          </b>
        </v-flex>
        <v-flex xs8>
         <input v-if="chkAuth()" type="text" id="Comtitle" v-model="comment" />
         <input v-else type="text" id="Comtitle" v-model="comment" readOnly placeholder=" 로그인 후 이용가능합니다."/>
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
        <div @click="getSubComm(item.pfc_id)">
          <p><i class="fas fa-user-edit"></i>
            <b> {{ item.pfc_writer }}</b>
            &nbsp;&nbsp;&nbsp;&nbsp;
            {{ item.pfc_date }} |
               <i v-if="chkMe(item.pfc_writerUid)" class="fas fa-times" style="color: red;" @click="delComm(item.pfc_id)"/>
          </p>
          <p>{{ item.pfc_content }}</p>
        </div>
      </template>
      <v-card>
        <v-card-text class="lighten-3" style="background-color: #F2F2F2;">
          <v-layout row wrap style="width:100%; height: 48px;">
            <v-flex xs2 style="text-align: center; line-height: 48px;">
              <b>
                <span v-if="displayName != undefined">
                  {{ displayName }}
                </span>
                <span v-else>
                  {{ email }}
                </span>
              </b>
            </v-flex>
            <v-flex xs8>
             <input v-if="chkAuth()" type="text" id="ComSubtitle" v-model="subcomment"/>
             <input v-else type="text" id="ComSubtitle" v-model="subcomment" readOnly placeholder=" 로그인 후 이용가능합니다."/>
            </v-flex>
            <v-flex xs2 hidden-sm-and-up>
              <v-btn hidden-xs-and-up color="error" @click="regSubComm(item.pfc_id)" style="min-width:10px !important; padding: 0 11px;">
                <i class="fas fa-pen"></i>
              </v-btn>
            </v-flex>
            <v-flex xs2 hidden-xs-only>
              <v-btn color="error" @click="regSubComm(item.pfc_id)" style="min-width:10px !important;">등록</v-btn>
            </v-flex>
          </v-layout>
          <br />
          <div v-for="(idx, i) in subcomm" :key="i">
            <v-layout>
              <v-flex xs2>
                <div style="width:80%;font-size: 18px; text-align:right;">┗
                </div>
              </v-flex>
              <v-flex xs10>
                <p><i class="fas fa-user-edit"></i>
                  <b> {{ idx.spfc_writer }} </b>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  {{ idx.spfc_date }} |
                  <i v-if="chkMe(idx.spfc_writerUid)" class="fas fa-times" style="color: red;" @click="delSubComm(item.pfc_id, idx.spfc_id)"/>
                </p>
                <p>{{ idx.spfc_content }}</p>
              </v-flex>
            </v-layout>
          </div>
        </v-card-text>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import FirebaseService from "@/services/FirebaseService";
export default{
  name: "Comment",
  props: {
    pfid: { type: String }
  },
  data () {
    return {
      lang: "ko",
      comm: [],
      subcomm: [],
      comment: "",
      subcomment: "",
      email: this.$store.state.user.email.split("@")[0],
      displayName: this.$store.state.user.displayName,
      myauth: false,
      crossUrl: "http://13.58.134.195:8082/"
    };
  },
  created() {
    this.getComm();
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
          if (auth == null) this.myauth = false;
          else this.myauth = true;
        });
      }
    },
    chkMe(uid) {
      if (uid == this.$store.state.user.uid) {
        return true;
      }
      else return false;
    },
    chkAuth() {
      if (this.myauth) return true;
      else return false;
    },
    getComm() {
      const axios = require("axios");
      let formData = new FormData();
      formData.append("id", this.pfid);
      var category = window.location.pathname.split("/")[1];
      var url = "";
      if (category == "portfolioDetail") {
        url = "/getPfComment";
      }
      else {
        url = "/getPostComment";
      }
      axios.post(this.crossUrl + url, formData).then(res => {
        this.comm = res.data;
        this.comment = "";
      })
        .catch((ex) => {
          console.log(ex);
        });
    },
    regComm() {
      const axios = require("axios");
      let formData = new FormData();
      formData.append("id", this.pfid);
      if (this.$store.state.user.displayName != undefined) {
        formData.append("writer", this.$store.state.user.displayName);
      }
      else {
        formData.append("writer", this.$store.state.user.email.split("@")[0]);
      }
      formData.append("writerUid", this.$store.state.user.uid);
      formData.append("content", this.comment);

      var category = window.location.pathname.split("/")[1];
      var url = "";
      if (category == "portfolioDetail") {
        url = "/regPfComment";
      }
      else {
        url = "/regPostComment";
      }
      axios.post(this.crossUrl + url, formData).then(res => {
        FirebaseService.postComment(this.comment);
        this.getComm();
      })
        .catch((ex) => {
          console.log(ex);
        });
    },
    delComm(val) {
      var del = confirm("삭제하시겠습니까?");
      const axios = require("axios");
      let formData = new FormData();
      formData.append("id", val);
      var category = window.location.pathname.split("/")[1];
      var url = "";
      if (category == "portfolioDetail") {
        url = "/delPfComment";
      }
      else {
        url = "/delPostComment";
      }
      axios.post(this.crossUrl + url, formData).then(res => {
        this.getComm();
      })
        .catch((ex) => {
          console.log(ex);
        });
    },
    getSubComm(id) {
      const axios = require("axios");
      let formData = new FormData();
      formData.append("id", id);
      var category = window.location.pathname.split("/")[1];
      var url = "";
      if (category == "portfolioDetail") {
        url = "/getPfSubComment";
      }
      else {
        url = "/getPostSubComment";
      }
      axios.post(this.crossUrl + url, formData).then(res => {
        this.subcomm = res.data;
        this.subcomment = "";
      })
        .catch((ex) => {
          console.log(ex);
        });
    },
    regSubComm(id) {
      const axios = require("axios");
      let formData = new FormData();
      formData.append("wid", this.pfid);
      if (this.$store.state.user.displayName != undefined) {
        formData.append("writer", this.$store.state.user.displayName);
      }
      else {
        formData.append("writer", this.$store.state.user.email.split("@")[0]);
      }
      formData.append("writerUid", this.$store.state.user.uid);
      formData.append("content", this.subcomment);
      formData.append("id", id);
      var category = window.location.pathname.split("/")[1];
      var url = "";
      if (category == "portfolioDetail") {
        url = "/regPfSubComment";
      }
      else {
        url = "/regPostSubComment";
      }
      axios.post(this.crossUrl + url, formData).then(res => {
        this.getSubComm(id);
      })
        .catch((ex) => {
          console.log(ex);
        });
      this.subcomment = "";
    },
    delSubComm(id, val) {
      var del = confirm("삭제하시겠습니까?");
      if (!del) return;
      const axios = require("axios");
      let formData = new FormData();
      formData.append("id", val);
      var category = window.location.pathname.split("/")[1];
      var url = "";
      if (category == "portfolioDetail") {
        url = "/delPfSubComment";
      }
      else {
        url = "/delPostSubComment";
      }
      axios.post(this.crossUrl + url, formData).then(res => {
        this.getSubComm(id);
      })
        .catch((ex) => {
          console.log(ex);
        });
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
#ComSubtitle {
  width: 100% !important;
  height: 40px;
  margin-top: 5px;
  border: 1px solid #A4A4A4;
  border-radius: 5px;
}
</style>
