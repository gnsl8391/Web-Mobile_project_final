<template>
  <div>
    <v-img :src="imgSrc" id="ImgBanner" aspect-ratio="1.7">
      <v-layout align-center justify-center row fill-height>
        <v-flex text-xs-center>
          <span class="text-shadow display-2 font-weight-light">
            <slot name="text" />
            <slot name="image" />
          </span>
        </v-flex>
      </v-layout>
    </v-img>
  </div>
</template>

<script>
export default {
  name: "ImgBanner",
  props: {
    imgSrc: { type: String },
    text: { type: String }
  },
  components: {},
  methods: {}
};
</script>
<style>
.text-shadow {
  text-shadow: 0 0 15px rgb(255, 255, 255);
}
</style>
