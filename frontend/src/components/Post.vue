<template>
  <div class="py-3" @click="getDetail">
    <h2 :class="`headline font-weight-light mb-3 ${color}--text`" id="postTitle">{{ title }}</h2>
    <div class="postContent">
        {{ getBody }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Post",
  props: {
    color: { type: String },
    pid: { type: String },
    date: { type: String },
    title: { type: String },
    body: { type: String },
    uid: { type: String },
    writer: { type: String }
  },
  data() {
    return {
      lang: "ko"
    };
  },
  created() {
    this.$EventBus.$on("click-icon", () => {
      if (this.lang == "ko") {
        this.lang = "en";
      } else {
        this.lang = "ko";
      }
      var tagId = ["caption", "postTitle", "postContent"];
      for (var i = 0; i < tagId.length; i++) {
        var tag = document.getElementsByClassName(tagId[i]);
        for (var j = 0; j < tag.length; j++) {
          this.translateText(tag[j].innerHTML, tagId[i], j, this.lang);
        }
      }
    });
  },
  computed: {
    getBody() {
      return this.body.replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/ig, "");
    }
  },
  methods: {
    translateText(sourceText, tagId, tagIdIdx, target) {
      var url =
        "https://www.googleapis.com/language/translate/v2?key=AIzaSyA0_KdshFIp0aoX7fbaKVTZmuvk3GBrlls&target=" +
        target +
        "&format=html&q=" +
        sourceText;
      this.$http.post(url).then(response => {
        document.getElementsByClassName(tagId)[tagIdIdx].innerHTML =
          response.data.data.translations[0].translatedText;
      });
    },
    async getDetail() {
      this.$router.push({name: "postDetail",
        params: {
          pid: this.pid,
          date: this.date,
          title: this.title,
          body: this.body,
          uid: this.uid,
          writer: this.writer
        }});
    }
  }
};
</script>

<style>
.color-666 {
  color: #666;
}
.color-333 {
  color: #333;
}
.h-100 {
  height: 100%;
}
#postTitle {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.postContent {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  line-height: 1.2em;
  height: 3.6em;
}
</style>
