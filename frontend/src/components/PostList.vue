<template>
  <div>
  <v-layout v-if="chkUrl">
      <span style="color:#FFBF00; width:120px; font-size:20px; line-height:50px;" @click="goHome()">
        <i class="fas fa-chevron-left"></i> HOME
      </span>
      <v-flex xs12 style="text-align:right;">
        <!--글작성-->
        <v-dialog v-model="dialog" persistent max-width="800px" v-if="chkMyauth">
          <template v-slot:activator="{ on }">
            <v-btn color="warning" dark v-on="on">
              <v-icon size="20px" class="mr-2">
                fas fa-pen
              </v-icon>
              글 쓰기
            </v-btn>
          </template>
          <v-card style="height:60%">
            <v-card-title>
              <span class="headline">CREATE POST</span>
            </v-card-title>
            <v-card-text>
              <form>
                <span style="margin-left:3%">TITLE : </span>
                <input v-model="title" type="text" id="title" />
              </form>
              <div>
                <yimo-vue-editor v-model="body"></yimo-vue-editor>
              </div>
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
    <v-layout>
    <v-flex  hidden-xs-only>
  <v-timeline id="timeLine" xs12>
    <v-timeline-item
      v-for="i in getLimits"
      v-bind:key="i"
      :color="years[i%5].color"
      small
    >
    <template v-slot:opposite>
        <p style="font-size:18px;"
        :class="`font-weight-bold ${years[i%5].color}--text`"
        v-text="formatedDate(posts[i - 1].dataMap.created_at)"
        ></p>
    </template>
    <Post
      :color="years[i%5].color"
      :pid="posts[i - 1].id"
      :date="posts[i - 1].dataMap.created_at.toString()"
      :title="posts[i - 1].dataMap.title"
      :body="posts[i - 1].dataMap.body"
      :uid="posts[i -1 ].dataMap.uid"
      :writer="posts[i - 1].dataMap.writer"
    />
  </v-timeline-item>
 </v-timeline>
</v-flex>
<v-flex hidden-sm-and-up >
 <v-timeline id="timeLine" dense >
   <v-timeline-item
     v-for="i in posts.length > limits ? limits : posts.length"
     v-bind:key="i"
     :color="years[i%5].color"
     small
   >
   <span style="margin-bottom:-10px; position:absolute;"
   :class="`font-weight-bold ${years[i%5].color}--text`"
   v-text="formatedDate(posts[i - 1].dataMap.created_at)"
   ></span>
   <Post
     :color="years[i%5].color"
     :pid="posts[i - 1].id"
     :date="posts[i - 1].dataMap.created_at.toString()"
     :title="posts[i - 1].dataMap.title"
     :body="posts[i - 1].dataMap.body"
     :uid="posts[i -1 ].dataMap.uid"
     :writer="posts[i - 1].dataMap.writer"
   />
 </v-timeline-item>
</v-timeline>
</v-flex>
</v-layout>
<v-layout>
    <v-flex xs12 text-xs-center round my-5 v-if="loadMore">
      <v-btn color="info" dark v-on:click="loadMorePosts">
        <v-icon size="25" class="mr-2">fa-plus</v-icon>
        더 보기
      </v-btn>
    </v-flex>
</v-layout>
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
<v-snackbar
v-model="snackbar"
:multi-line="mode === 'multi-line'"
:timeout="timeout"
:top="true"
>
{{ text }}
<v-btn
  color="#FACC2E"
  flat
  @click="renewal()"
>
  Close
</v-btn>
</v-snackbar>
</div>
</template>

<script>
import Post from "@/components/Post";
import FirebaseService from "@/services/FirebaseService";
import YimoVueEditor from "yimo-vue-editor";

export default {
  name: "PostList",
  props: {
    column: { type: Number, default: 1 },
    limits: { type: Number, default: 3 },
    loadMore: { type: Boolean, default: false }
  },
  data() {
    return {
      years: [
        {
          color: "cyan"
        },
        {
          color: "green"
        },
        {
          color: "pink"
        },
        {
          color: "amber"
        },
        {
          color: "orange"
        }
      ],
      title: "",
      body: "",
      dialog: false,
      posts: [],
      myauth: false,
      windowSize: window.innerWidth,
      thisLimit: this.limits,
      loading: false,
      snackbar: false,
      y: "top",
      x: null,
      mode: "",
      timeout: 6000,
      text: "등록되었습니다.",
      error: false
    };
  },
  components: {
    Post,
    YimoVueEditor
  },
  mounted() {
    this.getPosts();
  },
  beforeUpdate() {
    this.curAuthChk();
  },
  computed: {
    chkMyauth() {
      return this.myauth;
    },
    chkUrl() {
      if (window.location.pathname == "/post") {
        return true;
      }
      else return false;
    },
    getLimits() {
      return this.posts.length > this.thisLimit ? this.thisLimit : this.posts.length;
    }
  },
  methods: {
    goHome() {
      this.$router.push("/home");
    },
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
    formatedDate(date) {
      return `${date.getFullYear()}. ${date.getMonth()}. ${date.getDate()}`;
    },
    async getPosts() {
      this.posts = await FirebaseService.getPosts();
    },
    loadMorePosts() {
      this.thisLimit += 6;
    },
    onUpload: async function() {
      if (this.title.length == 0) {
        alert("제목을 입력해주세요.");
        document.getElementById("title").focus();
        return false;
      } else if (this.body.length == 0) {
        alert("내용을 입력해주세요.");
        return false;
      }
      this.loading = true;
      setTimeout(() => (this.loading = false
      ), 2000);
      setTimeout(() => (this.snackbar = true
      ), 2000);
      setTimeout(() => (this.getPosts()
      ), 2000);
      var userName = "";
      if (this.$store.state.user.displayName == "") {
        userName = this.$store.state.user.email;
      }
      else {
        userName = this.$store.state.user.displayName;
      }
      FirebaseService.postPost(
        this.title,
        this.body,
        this.$store.state.uid,
        userName
      );
    },
    renewal() {
      this.dialog = false;
      this.snackbar = false;
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
  margin-bottom: 20px;
  border: 1px solid #bdbdbd;
  border-radius: 5px;
}
</style>
