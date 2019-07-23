<template>
  <div class="py-3">
    <v-layout>
      <v-flex xs8 style="font-size : 14px;">
        <p class="text-truncate">@{{ repos.namespace.name }}</p>
        <v-tooltip right>
          <template v-slot:activator="{ on }">
            <span
              flat
              class="font-weight-regular text-truncate"
              v-on="on"
              style="font-size:18px;"
              @click="openUrl"
              >{{ repos.path_with_namespace }}</span
            >
          </template>
          <span>클릭시 이동합니다.</span>
        </v-tooltip>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import GitlabService from "@/services/GitlabService";

export default {
  name: "Repository",
  props: {
    repos: { type: null }
  },
  data() {
    return {
      stats: {},
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
      var tagId = ["text-truncate"];
      for (var i = 0; i < tagId.length; i++) {
        var len = document.getElementsByClassName(tagId[i]);
        for (var j = 0; j < len.length; j++) {
          this.translateText(len[j].innerHTML, tagId[i], j, this.lang);
        }
      }
    });
  },
  mounted() {
    this.drawStatGraph();
  },
  methods: {
    async drawStatGraph() {
      this.commits = await GitlabService.getCommits(this.repos.id, 1);
    },
    openUrl() {
      window.open(this.repos.http_url_to_repo);
    },
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
