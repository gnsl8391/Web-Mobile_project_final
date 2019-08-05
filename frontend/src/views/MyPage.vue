<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-img
          src="https://cdn.vuetifyjs.com/images/lists/ali.png"
          height="300px"
        >
          <v-layout
            column
            fill-height
          >
            <v-spacer></v-spacer>
            <v-card-title class="white--text pl-5 pt-5">
              <div class="display-1 pl-5 pt-5">My Page</div>
            </v-card-title>
          </v-layout>
        </v-img>

        <!-- 이름 -->
        <v-list two-line>
          <!-- 회원 등급 -->
          <v-list-tile class="listTile">
            <v-list-tile-action>
              <v-icon class="fas fa-crown" size="30px"></v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>My Grade</v-list-tile-title>
              <v-list-tile-sub-title>{{ chkMyauth }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider inset></v-divider>
          <v-list-tile class="listTile">
            <v-list-tile-action>
              <v-icon class="far fa-laugh-wink" size="30px"></v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>User Name</v-list-tile-title>
              <v-list-tile-sub-title v-if="displayName != undefined">
                {{ displayName }}
              </v-list-tile-sub-title>
              <v-list-tile-sub-title v-else>
                {{ emailId }}
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider inset></v-divider>
          <!-- 메일 -->
          <v-list-tile class="listTile">
            <v-list-tile-action>
              <v-icon class="far fa-envelope" size="30px"></v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Email</v-list-tile-title>
              <v-list-tile-sub-title>{{ email }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider inset></v-divider>
          <!-- 패스워드 -->
          <v-list-tile class="listTile">
            <v-list-tile-action>
              <v-icon class="fas fa-key" size="30px"></v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Password</v-list-tile-title>
              <v-list-tile-sub-title>
                <input
                  type="password"
                  placeholder="변경할 비밀번호를 입력하세요."
                  v-model="password"
                  style="width:90%; backgroundColor:#F2F2F2;"
                >
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider inset></v-divider>
          <!-- 포트폴리오 -->
          <v-list-tile class="listTile">
            <v-list-tile-action>
              <v-icon class="fas fa-file-powerpoint" size="30px"></v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>My Portfolios</v-list-tile-title>
              <v-list-tile-sub-title>
                나의 포트폴리오 개수 : {{ pfCount   }}개
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile class="listTile">
            <v-list-tile-action />
            <v-list-tile-content>
              <v-list-tile-title>최근 게시한 포트폴리오</v-list-tile-title>
              <v-list-tile-sub-title>
                <a @click="getPfDetail()">{{ pfTitle }}</a>
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider inset></v-divider>
          <!-- 포스트 -->
          <v-list-tile class="listTile">
            <v-list-tile-action>
              <v-icon class="fas fa-file-alt" size="30px"></v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>My Posts</v-list-tile-title>
              <v-list-tile-sub-title>
                나의 포스트 개수 : {{ptCount}}개
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile class="listTile">
            <v-list-tile-action />
            <v-list-tile-content>
              <v-list-tile-title>최근 게시한 포스트</v-list-tile-title>
              <v-list-tile-sub-title>
                  <a @click="getPtDetail()">{{ ptTitle }}</a>
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider inset></v-divider>
          <div style="margin:15px 0;float:right">
            <v-btn flat
             color="warning"
             @click="updateMember"
            >회원수정</v-btn>
            <v-btn flat
             color="error"
             @click="deleteMember"
            >회원탈퇴</v-btn>
          </div>
        </v-list>
      </v-card>
    </v-flex>
    <v-snackbar
      v-model="snackbar"
      :multi-line="mode === 'multi-line'"
      :timeout="timeout"
      :top="true"
    >
      {{ text }}
      <v-btn
        color="pink"
        flat
        @click="goHome()"
      >
        Close
      </v-btn>
    </v-snackbar>
  </v-layout>
</template>

<script>
import FirebaseService from "@/services/FirebaseService";

export default{
  name: "MyPage",
  data() {
    return {
      show3: false,
      password: "",
      myauth: "",
      snackbar: false,
      y: "top",
      x: null,
      mode: "",
      timeout: 6000,
      text: "",
      pfCount: 0,
      ptCount: 0,
      pfInfo: {},
      ptInfo: {},
      pfTitle: "",
      ptTitle: ""
    };
  },
  created() {
    this.curAuthChk();
    this.getPort();
    this.getPost();
  },
  computed: {
    chkMyauth() {
      return this.myauth;
    },
    emailId() {
      if (this.$store.state.user.email != "") {
        return this.$store.state.user.email.split("@")[0];
      }
      else return null;
    },
    email() {
      if (this.$store.state.user.email == "") {
        return "이메일 정보가 없습니다.";
      }
      else return this.$store.state.user.email;
    },
    displayName() {
      if (this.$store.state.user.displayName != "undefined") {
        return this.$store.state.user.displayName;
      }
      else return null;
    }
  },
  methods: {
    curAuthChk() {
      const auths = FirebaseService.getOneMembers(this.$store.state.user.uid);
      auths.then(auth => {
        this.myauth = auth.myauth;
      });
    },
    getPort() {
      var myPf = FirebaseService.getOnePortfolio(this.$store.state.user.uid);
      myPf.then(data => {
        var count = 0;
        var res = true;
        for (var i = 0; i < data.length; i++) {
          if (data[i] != null) {
            if (res) {
              this.pfInfo = data[i];
              this.pfTitle = this.pfInfo.dataMap.title;
              res = false;
            }
            count++;
          }
        }
        this.pfCount = count;
        if (res) {
          this.pfTitle = "게시한 포트폴리오가 없습니다.";
        }
      });
    },
    getPost() {
      var myPt = FirebaseService.getOnePost(this.$store.state.user.uid);
      myPt.then(data => {
        console.log(data);
        var count = 0;
        var res = true;
        for (var i = 0; i < data.length; i++) {
          if (data[i] != null) {
            if (res) {
              console.log(data[i]);
              this.ptInfo = data[i];
              this.ptTitle = this.ptInfo.dataMap.title;
              res = false;
            }
            count++;
          }
        }
        this.ptCount = count;
        if (res) {
          this.ptTitle = "게시한 포스트가 없습니다.";
        }
      });
    },
    updateMember() {
      FirebaseService.updatePassword(this.password);
      this.text = "수정되었습니다. 다시 로그인해주세요.";
      this.snackbar = true;
    },
    deleteMember() {
      var con = confirm("탈퇴하시겠습니까?");
      if (con) {
        FirebaseService.deleteAccount();
        this.text = "안녕히 가십시오.";
        this.snackbar = true;
      }
    },
    goHome() {
      this.snackbar = false;
      FirebaseService.logout();
      this.$router.push("/");
    },
    getPfDetail() {
      if (this.pfCount != 0) {
        this.$router.push({name: "portfolioDetail",
          params: {
            pfid: this.pfInfo.id,
            date: this.pfInfo.dataMap.created_at,
            title: this.pfInfo.dataMap.title,
            body: this.pfInfo.dataMap.body,
            imgSrc: this.pfInfo.dataMap.img,
            uid: this.pfInfo.dataMap.uid,
            writer: this.pfInfo.dataMap.writer
          }});
      }
    },
    getPtDetail() {
      if (this.ptCount != 0) {
        this.$router.push({name: "postDetail",
          params: {
            pid: this.ptInfo.id,
            date: this.ptInfo.dataMap.created_at,
            title: this.ptInfo.dataMap.title,
            body: this.ptInfo.dataMap.body,
            uid: this.ptInfo.dataMap.uid,
            writer: this.ptInfo.dataMap.writer
          }
        });
      }
    }
  }
};
</script>

<style>
.listTile {
  padding: 5px 0;
}
</style>
