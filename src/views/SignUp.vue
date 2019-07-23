<template>
  <div>
    <ImgBanner v-bind:imgSrc="imgBannerUrl" id="ImgBanner">
      <div id="banner" slot="text" class="animated bounceInDown">
        Sign Up
      </div>
    </ImgBanner>
    <ImgUpload style="margin-left:2%; width : 98%;" />
    <v-container>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
        ></v-text-field>
        <v-layout row wrap>
          <v-flex xs12 sm5>
            <v-text-field
              :append-icon="show3 ? 'visibility' : 'visibility_off'"
              :rules="[rules.required, rules.min]"
              :type="show3 ? 'text' : 'password'"
              label="비밀번호"
              hint="At least 8 characters"
              class="input-group--focused"
              @click:append="show3 = !show3"
            ></v-text-field>
          </v-flex>
          <v-flex hidden-xs-only sm2 />
          <v-flex xs12 sm5>
            <v-text-field
              :append-icon="show4 ? 'visibility' : 'visibility_off'"
              :rules="[rules.required, rules.emailMatch]"
              :type="show4 ? 'text' : 'password'"
              label="비밀번호 확인"
              hint="비밀번호가 일치하지 않"
              value="Pa"
              error
              @click:append="show4 = !show4"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-text-field
          v-model="name"
          :counter="10"
          :rules="nameRules"
          label="이름"
          required
        ></v-text-field>
        <v-text-field
          v-model="name"
          :counter="10"
          :rules="nameRules"
          label="전화번호"
          required
        ></v-text-field>
        <v-checkbox
          v-model="checkbox"
          :rules="[v => !!v || 'You must agree to continue!']"
          label="Do you agree?"
          required
        ></v-checkbox>
        <v-btn :disabled="!valid" color="success" @click="validate">
          Validate
        </v-btn>
        <v-btn color="error" @click="reset">
          Reset Form
        </v-btn>
        <v-btn color="warning" @click="resetValidation">
          Reset Validation
        </v-btn>
      </v-form>
    </v-container>
  </div>
</template>

<script>
import ImgBanner from "../components/ImgBanner";
import ImgUpload from "../components/ImgUpload";
export default {
  name: "signup",
  data: () => ({
    valid: true,
    name: "",
    nameRules: [
      v => !!v || "Name is required",
      v => (v && v.length <= 10) || "Name must be less than 10 characters"
    ],
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ],
    checkbox: false,
    imgBannerUrl: "https://source.unsplash.com/user/erondu/1600x900",
    password: "Password",
    show3: false,
    show4: false,
    rules: {
      required: value => !!value || "Required.",
      min: v => v.length >= 8 || "Min 8 characters",
      emailMatch: () => "The email and password you entered don't match"
    }
  }),
  components: {
    ImgBanner,
    ImgUpload
  },
  created() {
    this.$EventBus.$on("ImgSign", link => {
      this.imgBannerUrl = link;
    });
  },
  methods: {
    getImgUrl(img) {
      return require("../assets/" + img);
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    }
  }
};
</script>
<style>
#banner {
  line-height: 1.2em;
  font-size: 5vw;
  text-shadow: 6px 6px 6px gray;
  font-weight: bold;
  color: #ffffff;
}
</style>
