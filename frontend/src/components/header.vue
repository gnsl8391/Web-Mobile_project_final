<template>
  <div id="header">
    <v-toolbar fixed id="headerBar">
      <v-spacer>
        <a href="/" v-on:click.native="chkUrl" style="text-decoration:none;">
          <img src="../assets/mainlogo.png" id="logoImg" />
        </a>
      </v-spacer>
      <span class="hidden-md-and-down">
        <span v-if="this.$store.state.user == ''">
          로그인을 해주세요
        </span>
        <span v-else-if="this.$store.state.user.displayName != undefined">
          {{ this.$store.state.user.displayName }}
        </span>
        <span v-else>
          {{ this.$store.state.accessToken }}
        </span>
      </span>
      <v-toolbar-items>
        <v-btn flat @click="Trans" v-on:click="$EventBus.$emit('click-icon')">
          <v-badge v-model="show" color="cyan" transition>
            <template v-slot:badge>
              <span v-if="lang == 'ko'" style="font-size:11px;" class="txt">
                한
              </span>
              <span v-else style="font-size:11px; " class="txt">
                영
              </span>
            </template>
            <v-icon size="18px">fas fa-redo-alt</v-icon>
          </v-badge>
        </v-btn>
        <v-btn
          flat
          @click="bookmarksite('포트폴리오', '/portfolio')"
          class="hidden-xs-only"
        >
          <v-icon size="18px">fas fa-bookmark</v-icon>
        </v-btn>
        <v-btn
          flat
          v-if="chkUrlRes"
          class="hidden-xs-only"
          @click="$vuetify.goTo('#aboutMe', options)"
        >
          About Me
        </v-btn>
        <v-btn
          v-if="chkUrlRes"
          flat
          class="hidden-xs-only linkText"
          @click="$vuetify.goTo('#portfolio', options)"
        >
          Portfolio
        </v-btn>
        <v-btn v-else flat class="hidden-xs-only linkText" to="portfolio">
          Portfolio
        </v-btn>
        <v-btn
          v-if="chkUrlRes"
          flat
          class="hidden-xs-only linkText"
          @click="$vuetify.goTo('#post', options)"
        >
          Post
        </v-btn>
        <v-btn v-else flat class="hidden-xs-only linkText" to="post">
          Post
        </v-btn>
        <v-btn
          v-if="chkUrlRes"
          flat
          class="hidden-xs-only linkText"
          @click="$vuetify.goTo('#github', options)"
        >
          Git Project
        </v-btn>
        <v-btn v-else flat class="hidden-xs-only linkText" to="git">
          Git Project
        </v-btn>
        <!-- 로그인 Modal Popup -->
        <v-dialog
          v-model="dialog"
          persistent
          max-width="500px"
          v-if="this.$store.state.accessToken == ''"
        >
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" flat class="hidden-xs-only linkText">
              Login
            </v-btn>
          </template>
          <v-card style="height:60%">
            <v-card-text>
              <app-loginPop />
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="dialog = false">
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-btn flat class="hidden-xs-only linkText" v-else @click="logout">
          Logout
        </v-btn>
        <v-btn flat class="hidden-sm-and-up" @click.stop="drawer = !drawer">
          <v-icon size="18px">fas fa-bars</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <!-- login navigation -->
    <v-navigation-drawer v-model="drawer" fixed temporary>
      <v-list class="pa-1">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <v-icon size="30px">far fa-laugh-wink</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title v-if="this.$store.state.user == ''">
              <span>로그인을 해주세요</span>
            </v-list-tile-title>
            <v-list-tile-title
              v-else-if="this.$store.state.user.displayName != undefined"
            >
              {{ this.$store.state.user.displayName }}
            </v-list-tile-title>
            <v-list-tile-title v-else>
              {{ this.$store.state.accessToken }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <!-- mobile sidebar -->
      <v-list class="pt-0" dense>
        <v-divider></v-divider>
        <v-list-tile v-for="item in items" :key="item.title">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              <router-link :to="{ path: item.title }" class="linkText">
                {{ item.title }}
              </router-link>
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <!-- login condition in sidebar -->
          <v-list-tile-action>
            <v-icon>fas fa-user</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              <router-link
                :to="{ path: '/login' }"
                class="linkText"
                v-if="this.$store.state.user == ''"
              >
                login
              </router-link>
              <router-link
                :to="{ path: '/' }"
                class="linkText"
                v-else-if="this.$store.state.user != undefined"
              >
                <span @click="logout">logout</span>
              </router-link>
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import FirebaseService from "@/services/FirebaseService";
import LoginPage from "../views/LoginPage.vue";
// import animateCss from "../css/animate.css";
// import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

export default {
  data() {
    return {
      isFixed: false,
      drawer: null,
      dialog: false,
      last_known_scroll_position: 0,
      ticking: false,
      items: [
        {
          title: "portfolio",
          icon: "fas fa-edit"
        },
        {
          title: "post",
          icon: "far fa-sticky-note"
        },
        {
          title: "git",
          icon: "fab fa-github"
        }
      ],
      loc: "",
      locRes: true,
      show: true,
      lang: "ko",
      duration: 750,
      offset: 55,
      easing: "easeOutQuad"
    };
  },
  components: {
    "app-loginPop": LoginPage
  },
  computed: {
    options() {
      return {
        duration: this.duration,
        offset: this.offset,
        easing: this.easing
      };
    },
    chkUrlRes: function() {
      if (window.location.pathname == "/") return true;
      else return false;
    }
  },
  created() {
    FirebaseService.authChk();
  },
  mounted() {
    var header = document.getElementById("headerBar");
    if (this.last_known_scroll_position == 0 && window.location.pathname == "/") {
      console.log("here");
      header.classList.add("elevation-0");
      header.style.backgroundColor = "#ffffff00";
    } else {
      header.style.backgroundColor = "#F7D358";
    }
    window.addEventListener("scroll", function() {
      this.last_known_scroll_position = window.scrollY;
      var header = document.getElementById("headerBar");
      if (this.last_known_scroll_position > 0) {
        header.classList.remove("elevation-0");
        header.style.backgroundColor = "#F7D358";
      } else if (this.last_known_scroll_position == 0 && window.location.pathname == "/") {
        header.classList.add("elevation-0");
        header.style.backgroundColor = "#ffffff00";
      }
    });
  },
  methods: {
    Trans: function() {
      if (this.lang == "ko") {
        this.lang = "en";
        const element = document.querySelector(".txt");
        element.classList.add("animated", "bounceIn");
        setTimeout(function() {
          element.classList.remove("animated", "bounceIn");
        }, 1000);
      } else {
        this.lang = "ko";
        const element = document.querySelector(".txt");
        element.classList.add("animated", "bounceIn");
        setTimeout(function() {
          element.classList.remove("animated", "bounceIn");
        }, 1000);
      }
    },
    bookmarksite: function(title, url) {
      // Internet Explorer
      if (document.all) {
        window.external.AddFavorite(url, title);
      }
      // Google Chrome
      else if (window.chrome) {
        alert(
          "현재 주소 : " +
            window.location.href +
            "\nCtrl+D키를 누르시면 즐겨찾기에 추가하실 수 있습니다."
        );
      }

      // Firefox
      else if (window.sidebar) {
        window.sidebar.addPanel(title, url, "");
      }

      // Opera
      else if (window.opera && window.print) {
        var elem = document.createElement("a");
        elem.setAttribute("href", url);
        elem.setAttribute("title", title);
        elem.setAttribute("rel", "sidebar");
        elem.click();
      } else if (window.external) {
        window.external.AddFavorite(url, title);
      }
    },
    logout: async function() {
      this.$store.state.user = "";
      this.$store.state.accessToken = "";
      FirebaseService.logout();
    }
  }
};
</script>

<style>
.linkText {
  text-decoration: none;
  color: black;
}
@media screen and (max-width: 550px) {
  #logoImg {
    width: 50%;
  }
}
@media screen and (min-width: 550px) and (max-width: 599px) {
  #logoImg {
    width: 40%;
  }
}
@media screen and (min-width: 599px) and (max-width: 750px) {
  #logoImg {
    width: 100%;
  }
}
@media screen and (min-width: 750px) and (max-width: 1050px) {
  #logoImg {
    width: 50%;
  }
}
@media screen and (min-width: 1050px) and (max-width: 1000px) {
  #logoImg {
    width: 40%;
  }
}
@media screen and (min-width: 1000px) and (max-width: 1200px) {
  #logoImg {
    width: 30%;
  }
}
@media screen and (min-width: 1200px) {
  #logoImg {
    width: 21%;
  }
}
</style>
