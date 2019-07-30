<template>
  <v-layout row wrap mw-700>
    <v-flex
      v-for="i in posts.length > limits ? limits : posts.length"
      v-bind:key="i"
      xs12
      sm8
      md6
      px-3
    >
      <Post
        :date="posts[i - 1].created_at"
        :title="posts[i - 1].title"
        :body="posts[i - 1].body"
      />
      <v-divider></v-divider>
    </v-flex>
    <v-flex xs12 text-xs-center round my-5 v-if="loadMore">
      <v-btn color="info" dark v-on:click="loadMorePosts">
        <v-icon size="25" class="mr-2">fa-plus</v-icon>
        더 보기
      </v-btn>
      <!--글작성-->
      <v-dialog v-model="dialog" persistent max-width="800px">
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
</template>

<script>
import Post from "@/components/Post";
import FirebaseService from "@/services/FirebaseService";
import YimoVueEditor from "yimo-vue-editor";

export default {
  name: "PostList",
  props: {
    column: { type: Number, default: 1 },
    limits: { type: Number, default: 4 },
    loadMore: { type: Boolean, default: false }
  },
  data() {
    return {
      title: "",
      body: "",
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
      posts: []
    };
  },
  components: {
    Post,
    YimoVueEditor
  },
  mounted() {
    this.getPosts();
  },
  methods: {
    async getPosts() {
      this.posts = await FirebaseService.getPosts();
    },
    loadMorePosts() {
      this.limits += 2;
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

      FirebaseService.postPost(this.title, this.body);
      alert("저장완료");
      this.dialog = false;
      window.location.reload();
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
