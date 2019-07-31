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
          v-model="name"
          :counter="10"
          :rules="nameRules"
          label="이름"
          required
        ></v-text-field>
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
        ></v-text-field>
        <v-layout row wrap>
          <v-flex xs12 sm5>
            <v-text-field
              :append-icon="show3 ? 'fas fa-eye' : 'fas fa-eye-slash'"
              :rules="[rules.required, rules.min]"
              :type="show3 ? 'text' : 'password'"
              label="비밀번호"
              hint="At least 8 characters"
              class="input-group--focused"
              @click:append="show3 = !show3"
              v-model="password"
            ></v-text-field>
          </v-flex>
          <v-flex hidden-xs-only sm2 />
          <v-flex xs12 sm5>
            <v-text-field
              :append-icon="show4 ? 'fas fa-eye' : 'fas fa-eye-slash'"
              :rules="[rules.required, passChk]"
              :type="show4 ? 'text' : 'password'"
              label="비밀번호 확인"
              @click:append="show4 = !show4"
              v-model="passwordChk"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout style="float:right; margin : 10px 0px;">
          <v-btn
          :disabled="!valid"
          outline color="indigo"
          @click="validate"
          >회원가입</v-btn>
          <v-btn outline color="warning" @click="reset">
            초기화
          </v-btn>
        </v-layout>
        <div style="clear:both;" />
      </v-form>
    </v-container>
  </div>
</template>

<script>
import FirebaseService from "@/services/FirebaseService";
import ImgBanner from "../components/ImgBanner";
import ImgUpload from "../components/ImgUpload";
export default {
  name: "SignUp",
  data: () => ({
    valid: true,
    name: "",
    nameRules: [
      v => !!v || "Name is required",
      v => (v && v.length <= 10) || "Name must be less than 10 characters"
    ],
    phone: "",
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ],
    checkbox: false,
    imgBannerUrl: "https://source.unsplash.com/user/erondu/1600x900",
    password: "",
    passwordChk: "",
    show3: false,
    show4: false,
    rules: {
      required: value => !!value || "Required.",
      min: v => (v && v.length >= 8) || "Min 8 characters",
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
    passChk(value) {
      if (this.password == value) {
        return true;
      } else {
        return "password don't match!";
      }
    },
    getImgUrl(img) {
      return require("../assets/" + img);
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
      const result = FirebaseService.createAccount(this.email, this.passwordChk);
      result.then(r => {
        FirebaseService.postAuth(r.user.uid, "visitor", r.user.email, "email");
        FirebaseService.updateProfile(r.user, this.name);
      });
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
