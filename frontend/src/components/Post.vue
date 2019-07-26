<template>
  <v-layout py-4 h-100>
    <v-flex row>
      <div class="caption">{{ formatedDate }}</div>
      <h2 class="color-333 headline font-weight-light postTitle">
        {{ title }}
      </h2>
      <p class="mb-1 color-666 font-weight-light subheading postContent">
        {{ body }}
      </p>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "Post",
  props: {
    date: { type: Date },
    title: { type: String },
    body: { type: String }
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
    formatedDate() {
      return `${this.date.getFullYear()}년 ${this.date.getMonth()}월 ${this.date.getDate()}일`;
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

.postTitle {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.postContent {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* 라인수 */
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  line-height: 1.2em;
  height: 3.6em;
}
</style>
