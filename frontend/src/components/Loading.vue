<template>
  <div class="loading-container" v-if="loading">
    <div class="loading"></div>
    <div id="loading-text">처리 중..</div>
  </div>
</template>

<script>
import Loading from "../css/loading.css";
export default {
  name: "Loading",
  data() {
    return {
      loading: false
    };
  },
  created() {
    this.$EventBus.$on("runLoading", () => {
      this.loading = true;
      setTimeout(function() {
        this.loading = false;
      }, 2000);
    });
  }
};
</script>
