<template>
  <div style="background: #040024;" xs12 sm8>
    <ImgBanner>
      <div id="bannerTxt" slot="text">Members</div>
    </ImgBanner>
  <v-card>
    <v-card-title>
      <i class="fas fa-file-invoice" style="margin-right: 10px; margin-left: 10px;"></i>
      portfolio : {{ portfolio }}
      <i class="fas fa-file-signature" style="margin-right: 10px; margin-left: 20px;"></i>
      post : {{ post }}
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="fas fa-search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="members"
      :search="search"
    >
      <template v-slot:items="props">
        <td>{{ props.item.id }}</td>
        <td>{{ props.item.root }}</td>
        <td>{{ props.item.uid }}</td>
        <td>
          <template>
    <div>
      <v-menu
      bottom
      origin="center center"
      transition="scale-transition"
    >
      <template v-slot:activator="{ on }">
        <v-btn flat
          color="primary"
          dark
          v-on="on"
        >
          {{ props.item.myauth }}
        </v-btn>
      </template>

      <v-list>
        <v-list-tile
          v-for="(item, i) in items"
          :key="i"
          @click="setAuth(item.title, props.item.uid)"
        >
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
    </div>
  </template>
        </td>
      </template>
      <template v-slot:no-results>
        <v-alert :value="true" color="error" icon="warning">
          Your search for "{{ search }}" found no results.
        </v-alert>
      </template>
    </v-data-table>
  </v-card>
</div>
</template>

<script>
import ImgBanner from "../components/ImgBanner";
import FirebaseService from "@/services/FirebaseService";

export default {
  data: () => ({
    portfolio: "",
    post: "",
    search: "",
    headers: [
      { text: "ID", value: "id" },
      { text: "Root", value: "root" },
      { text: "UID", value: "uid" },
      { text: "Auth", value: "myauth" }
    ],
    members: [],
    items: [
      { title: "admin" },
      { title: "visitor" },
      { title: "member" }
    ]
  }),
  mounted() {
    this.getdata();
    this.getNum();
  },
  methods: {
    getNum() {
      var pf = FirebaseService.getPortfolios();
      pf.then(r => {
        this.portfolio = r.length;
      });
      var p = FirebaseService.getPosts();
      p.then(r => {
        this.post = r.length;
      });
    },
    async getdata() {
      this.members = await FirebaseService.getAllMembers();
    },
    async setAuth(title, uid) {
      const user = await FirebaseService.getOneMembers(uid);
      const admin = await FirebaseService.getAdminCnt();

      if (admin[0].adminCnt == 1 && user.myauth == "admin" && title != "admin") {
        alert("관리자는 한명 이상이어야 합니다.");
      }
      else {
        await FirebaseService.postAuth(uid, title, user.id, user.root);
        this.getdata();
        if (user.myauth != "admin" && title == "admin") {
          await FirebaseService.cngAdminCnt(admin[0].adminCnt, "+");
        } else if (user.myauth == "admin" && title != "admin") {
          await FirebaseService.cngAdminCnt(admin[0].adminCnt, "-");
        }
      }
    }
  },
  components: {
    ImgBanner
  }
};
</script>
<style>
tbody td {
  font-size: 15px;
}
#bannerTxt {
  line-height: 1.2em;
  font-size: 5vw;
  text-shadow: 6px 6px 6px grey;
  font-weight: bold;
  color: #ffffff;
}
</style>
