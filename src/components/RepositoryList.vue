<template>
  <v-layout column>
    <h1 style="color:#6666ff;">Git Project</h1>
    <v-flex
      :key="i"
      v-for="i in repositories.length > limits ? limits : repositories.length"
    >
      <v-divider v-if="i === 1"></v-divider>
      <Repository :repos="repositories[i - 1]"></Repository>
      <v-divider></v-divider>
    </v-flex>
  </v-layout>
</template>

<script>
import Repository from "@/components/Repository";
import GitlabService from "@/services/GitlabService";

export default {
  name: "RepositoryList",
  props: {
    limits: { type: Number, default: 10 },
    loadMore: { type: Boolean, default: false }
  },
  data() {
    return {
      repositories: [],
      commits: [],
      members: ["gayeong", "gnsl8391", "EunJu"]
    };
  },
  components: {
    Repository
  },
  mounted() {
    this.getGitlabProjects("6081", "1");
    this.getGitlabRepos();
  },
  methods: {
    async getGitlabRepos() {
      for (var n of this.members) {
        const response = await GitlabService.getRepos(n);
        if (response.status !== 200) {
          return;
        }
        for (var e of response.data) {
          this.repositories.push(e);
        }
      }
    },
    async getGitlabProjects(project_id, page) {
      const response = await GitlabService.getCommits(project_id, page);
      if (response.status !== 200) {
        return;
      }

      this.commits = response.data;
    }
  }
};
</script>
