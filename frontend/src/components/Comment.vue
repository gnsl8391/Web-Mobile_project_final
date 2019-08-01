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
         <input v-else type="text" id="Comtitle" v-model="comment" readOnly placeholder="관리자와 팀원만 이용가능합니다."/>
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
          <!-- 대댓글 입력 -->
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
             <input v-else type="text" id="ComSubtitle" v-model="subcomment" readOnly placeholder="관리자와 팀원만 이용가능합니다."/>
            </v-flex>
            <v-flex xs2 hidden-sm-and-up>
            <v-btn hidden-xs-and-up color="error" @click="regSubComm" style="min-width:10px !important; padding: 0 11px;">
              <i class="fas fa-pen"></i>
            </v-btn>
            </v-flex>
            <v-flex xs2 hidden-xs-only>
              <v-btn  color="error" @click="regSubComm(item.pfc_id)" style="min-width:10px !important;">등록</v-btn>
            </v-flex>
          </v-layout>
          <br />
          <!-- 대댓글 -->
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
          <!-- 대댓글 -->
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
      myauth: false
    };
  },
  created() {
    // axios로 댓글 내용 가져오기
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
          if (auth == null || auth.myauth == "visitor") this.myauth = false;
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
      return this.myauth; // 권한이 null이거나 visitor인 경우 false, 멤버 또는 관리자일 경우 true(from portfolioList)
    },
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
    getSubComm(pfc_id) {
      // portfolio인지 post인지
      // 댓글 id
      const axios = require("axios");
      let formData = new FormData();
      formData.append("pfc_id", pfc_id);
      var category = window.location.pathname.split("/")[1];
      if (category == "portfolioDetail") {
        axios.post("/getPfSubComment", formData).then(res => {
          this.subcomm = res.data;
          this.subcomment = "";
        })
          .catch((ex) => {
            console.log(ex);
          });
      }
    },
    regSubComm(pfc_id) {
      const axios = require("axios");
      let formData = new FormData();
      formData.append("pfid", this.pfid);
      if (this.$store.state.user.displayName != undefined) {
        formData.append("spfc_writer", this.$store.state.user.displayName);
      }
      else {
        formData.append("spfc_writer", this.$store.state.user.email.split("@")[0]);
      }
      formData.append("spfc_writerUid", this.$store.state.user.uid);
      formData.append("spfc_content", this.subcomment);
      formData.append("pfc_id", pfc_id);
      var category = window.location.pathname.split("/")[1];
      if (category == "portfolioDetail") {
        axios.post("/regPfSubComment", formData).then(res => {
          this.getSubComm(pfc_id);
        })
          .catch((ex) => {
            console.log(ex);
          });
      }
      this.subcomment = "";
    },
    delSubComm(pfc_id, val) {
      var del = confirm("삭제하시겠습니까?");
      if (!del) return;
      const axios = require("axios");
      let formData = new FormData();
      formData.append("spfc_id", val);
      var category = window.location.pathname.split("/")[1];
      if (category == "portfolioDetail") {
        axios.post("/delPfSubComment", formData).then(res => {
          this.getSubComm(pfc_id);
        })
          .catch((ex) => {
            console.log(ex);
          });
      }
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
