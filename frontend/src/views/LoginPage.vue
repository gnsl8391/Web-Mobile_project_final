<template>
  <v-layout align-center justify-center row fill-height>
    <v-flex xs12 sm12 text-xs-center>
      <v-layout
        align-center
        justify-center
        row
        fill-height
        style="min-height:350px;"
        white
        pa-4
      >
        <v-flex xs10 sm7 text-xs-center>
          <v-card-text>
            <v-text-field v-model="email" placeholder="e-mail" />
            <v-text-field
              type="password"
              v-model="password"
              placeholder="password"
            />
          </v-card-text>
          <v-card-actions class="justify-center">
            <span>
              <v-btn href="signup" class="mx-2">
                Register
              </v-btn>
            </span>
            <span>
              <v-btn v-on:click="loginWithEmail" class="mx-2">
                Login
              </v-btn>
            </span>
          </v-card-actions>
          <br />
          <br />
          <v-btn
            round
            color="#df4a31"
            dark
            v-on:click="loginWithGoogle"
            style="width: 100%;"
          >
            <v-icon size="25" class="mr-2">fab fa-google</v-icon>
            Google 로그인
          </v-btn>
          <v-btn
            round
            color="#3b5998"
            dark
            v-on:click="loginWithFacebook"
            style="width: 100%;"
          >
            <v-icon size="25" class="mr-2">fab fa-facebook-square</v-icon>
            Facebook 로그인
          </v-btn>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-snackbar
      v-model="snackbar"
      :multi-line="mode === 'multi-line'"
      :timeout="timeout"
      :top="true"
    >
      {{ text }}
      <v-btn
        color="pink"
        flat
        @click="moveHome()"
      >
        Close
      </v-btn>
    </v-snackbar>
  </v-layout>
</template>

<script>
import FirebaseService from "@/services/FirebaseService";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import signup from "./SignUp";

export default {
  name: "LoginPage",
  data() {
    return {
      email: "",
      password: "",
      snackbar: false,
      y: "top",
      x: null,
      mode: "",
      timeout: 6000,
      text: "처리되었습니다.",
      error: false
    };
  },
  component: {
    signup
  },
  methods: {
    moveHome() {
      this.snackbar = false;
      if (!this.error) {
        this.$router.push("/home");
      }
    },
    async loginWithGoogle() {
      const result = await FirebaseService.loginWithGoogle();
      this.$store.commit("authChk", {
        accessToken: result.credential.accessToken,
        user: result.user,
        uid: result.user.uid
      });
      await FirebaseService.updateUserDeviceToken(result.user.uid);
      const chk = FirebaseService.getOneMembers(result.user.uid);
      chk.then(r => {
        if (!r) {
          FirebaseService.postAuth(
            result.user.uid,
            "visitor",
            this.$store.state.user.email,
            "google"
          );
        };
        this.text = "로그인되었습니다.";
        this.snackbar = true;
      });
    },
    async loginWithFacebook() {
      const result = await FirebaseService.loginWithFacebook();
      this.$store.commit("authChk", {
        accessToken: result.credential.accessToken,
        user: result.user,
        uid: result.user.uid
      });
      await FirebaseService.updateUserDeviceToken(result.user.uid);
      const chk = FirebaseService.getOneMembers(result.user.uid);
      chk.then(r => {
        if (!r) {
          if (this.$store.state.user.email) {
            FirebaseService.postAuth(
              result.user.uid,
              "visitor",
              this.$store.state.user.email,
              "facebook"
            );
          } else {
            FirebaseService.postAuth(
              result.user.uid,
              "visitor",
              this.$store.state.user.displayName,
              "facebook"
            );
          }
        } else {
        }
        this.text = "로그인되었습니다.";
        this.snackbar = true;
      });
    },
    async loginWithEmail() {
      const result = await FirebaseService.loginWithEmail(this.email, this.password);
      if (result.user == null) {
        this.text = result;
        this.snackbar = true;
        this.error = true;
      } else {
        this.$store.commit("authChk", {
          accessToken: this.email,
          user: result.user,
          uid: result.user.uid
        });
        FirebaseService.updateUserDeviceToken(result.user.uid);
        this.text = "로그인되었습니다.";
        this.snackbar = true;
      }
    },
    async logout() {
      firebase
        .auth()
        .signOut()
        .then(function() {
          this.text = "로그아웃되었습니다.";
          this.snackbar = true;
        });
    }
  }
};
</script>
