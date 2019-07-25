<template>
  <div style="background: #5e717d;">
    <ImgBanner>
      <div id="bannerTxt" slot="text">Members</div>
    </ImgBanner>
  <v-card>
    <v-card-title>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
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
        <td>{{ props.item.email }}</td>
        <td class="text-xs-right">{{ props.item.uid }}</td>
        <td class="text-xs-right">{{ props.item.myauth }}</td>
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
    data () {
      return {
        search: '',
        headers: [
          { text: 'Email', value: 'email' },
          { text: 'UID', value: 'uid' },
          { text: 'Auth', value: 'myauth' },
        ],
        members : []
      }
    },
    mounted() {
      this.getdata()
    },
    methods:{
      async getdata() {
        this.members = await FirebaseService.getAllMembers();
      }
    },
    components: {
      ImgBanner
    }
  }
</script>
