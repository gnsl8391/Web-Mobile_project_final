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
            <v-icon size="25" class="mr-2">fa-google</v-icon>
            Google 로그인
          </v-btn>
          <v-btn
            round
            color="#3b5998"
            dark
            v-on:click="loginWithFacebook"
            style="width: 100%;"
          >
            <v-icon size="25" class="mr-2">fa-facebook-square</v-icon>
            Facebook 로그인
          </v-btn>
        </v-flex>
      </v-layout>
    </v-flex>
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
      password: ""
    };
  },
  component: {
    signup
  },
  methods: {
    async loginWithGoogle() {
      const result = await FirebaseService.loginWithGoogle();
      this.$store.state.accessToken = result.credential.accessToken;
      this.$store.state.user = result.user;
      this.$router.push("/");
    },
    async loginWithFacebook() {
      const result = await FirebaseService.loginWithFacebook();
      this.$store.state.accessToken = result.credential.accessToken;
      this.$store.state.user = result.user;
      this.$router.push("/");
    },
    async createAccount() {
      await FirebaseService.createAccount(this.email, this.password);
    },
    async loginWithEmail() {
      const result = FirebaseService.loginWithEmail(this.email, this.password);
      this.$store.state.user = result;
      this.$router.push("/");
    },
    async logout() {
      firebase
        .auth()
        .signOut()
        .then(function() {
          alert("Logged out!");
        });
    }
  }
};
</script>
