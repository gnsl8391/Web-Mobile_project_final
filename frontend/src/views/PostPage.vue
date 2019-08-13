<template>
  <div>
    <ImgBanner imgSrc="http://www.urbanbrush.net/web/wp-content/uploads/edd/2018/07/web-20180704072858108862.png
">
      <div id="bannerTxt" slot="text">
        Post
      </div>
    </ImgBanner>
    <v-container>
      <v-layout>
        <v-flex xs12>
          <PostList :limits="6" :load-more="true"></PostList>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import ImgBanner from "../components/ImgBanner";
import PostList from "../components/PostList";

export default {
  name: "PostPage",
  components: {
    ImgBanner,
    PostList
  }
};
</script>

<style>
#bannerTxt {
  line-height: 1.2em;
  font-size: 7vw;
  text-shadow: 6px 6px 6px gray;
  font-weight: bold;
  color: #ffffff;
}
</style>
