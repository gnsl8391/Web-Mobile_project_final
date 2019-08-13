<template>
  <v-layout row style="width:100%">
    <v-dialog v-model="dialog" scrollable max-width="500px" height="70%">
      <template v-slot:activator="{ on }">
        <div v-if="radio == true">
          <span>이미지 선택 </span> <br />
          <v-radio-group v-model="switchInDialog">
            <v-radio
              v-for="n in radioSel"
              :key="n"
              :label="`${n}`"
              :value="n"
            />
          </v-radio-group>
        </div>
        <div v-else>
          <v-switch
            :label="`랜덤 이미지`"
            v-model="switch1"
            v-on:click="setUrl()"
          />
        </div>
      </template>
      <v-card>
        <v-card-title>
          <span>Select Image</span>
          <v-btn
            color="blue darken-1"
            style="margin-left:62%;"
            flat
            @click="dialog = false"
          >
            <i class="material-icons">clear</i>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text id="forCard">
          <img
            v-for="item in imgObj.data"
            v-bind:key="item.link"
            :src="item.link"
            class="cardImg"
            v-on:click="
              $EventBus.$emit('ImgSign', item.link);
              dialog = false;
            "
          />
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  name: "ImgUpload",
  data() {
    return {
      switch1: true,
      dialog: false,
      imgObj: [],
      radio: false,
      switchD: "Random",
      radioSel: ["Desktop", "Gallery", "Random"]
    };
  },
  mounted() {
    this.$EventBus.$on("radio", () => {
      this.radio = true;
    });
  },
  computed: {
    switchInDialog: {
      get() {
        return this.switchD;
      },
      set(newValue) {
        this.switchD = newValue;
        this.setUrl(this.switchD);
      }
    }
  },
  methods: {
    async setUrl(imgSelect) {
      if (
        (this.switch1 && imgSelect != "Gallery" && imgSelect != "Desktop") ||
        imgSelect == "Random"
      ) {
        this.$EventBus.$emit(
          "ImgSign",
          "https://source.unsplash.com/user/erondu/1600x900"
        );
      } else if (imgSelect == "Gallery" || !this.switch1) {
        const axios = require("axios");
        let formData = new FormData();
        formData.append("image", this.image);
        await axios({
          method: "GET",
          url: "https://api.imgur.com/3/album/4ZajK7e/images",
          headers: {
            Authorization: "Client-ID 031f94c0b39fe5f"
          }
        }).then(res => {
          this.imgObj = res.data;
          this.dialog = true;
        });
      } else if (imgSelect == "Desktop") {
        this.$EventBus.$emit("desktopImg");
      }
    }
  }
};
</script>

<style>
.cardImg {
  margin: 2%;
  max-width: 100%;
  width: auto;
  height: auto;
}
</style>
