<template>
  <v-card @click="getDetail()" >
    <v-img :src="imgSrc" height="200px" />
    <v-card-title primary-title>
      <div style="margin:5px;">
        <div class="headline pfTitle">{{ title }}</div>
        <span class="grey--text pfContent">{{ body }}</span>
      </div>
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  name: "Portfolio",
  props: {
    pfid: { type: String },
    date: { type: String },
    title: { type: String },
    body: { type: String },
    imgSrc: { type: String },
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
      var tagId = ["pfTitle", "pfContent"];
      for (var i = 0; i < tagId.length; i++) {
        var tag = document.getElementsByClassName(tagId[i]);
        for (var j = 0; j < tag.length; j++) {
          this.translateText(tag[j].innerHTML, tagId[i], j, this.lang);
        }
      }
    });
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
      this.$router.push({name: "portfolioDetail",
        params: {
          pfid: this.pfid,
          date: this.date,
          title: this.title,
          body: this.body,
          imgSrc: this.imgSrc,
          uid: this.uid,
          writer: this.writer
        }});
    }
  }
};
</script>
<style>
.pfTitle {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.pfContent {
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
