<template>
  <div>
    <ImgBanner imgSrc="https://i0.wp.com/static.vecteezy.com/system/resources/previews/000/117/397/original/free-summer-beach-vector-illustration.jpg">
      <div id="bannerTxt" slot="text">Portfolio</div>
    </ImgBanner>
    <v-container>
      <v-layout>
        <v-flex xs12>
          <PortfolioList :limits="6" :load-more="true"></PortfolioList>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import ImgBanner from "../components/ImgBanner";
import PortfolioList from "../components/PortfolioList";

export default {
  name: "PortfolioPage",
  components: {
    ImgBanner,
    PortfolioList
  }
};
</script>
<style>
#bannerTxt {
  line-height: 1.2em;
  font-size: 5vw;
  text-shadow: 6px 6px 6px gray;
  font-weight: bold;
  color: #ffffff;
}
</style>
