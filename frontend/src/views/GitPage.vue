<template>
  <v-layout row wrap>
    <v-flex xs12 sm12>
      <RepositoryList id="repo" />
    </v-flex>
    <v-flex sm12 hidden-xs-only>
      <h1 style="color:#6666ff; margin-left : 10%">Git Graph</h1>
      <div id="gitGraph"></div>
    </v-flex>
  </v-layout>
</template>

<script>
import RepositoryList from "../components/RepositoryList";
import GitlabService from "@/services/GitlabService";
import { createGitgraph } from "@gitgraph/js";

export default {
  name: "GitPage",
  data: () => ({
    commits: [],
    merges: ""
  }),
  components: {
    RepositoryList
  },
  mounted() {
    this.go();
    this.init();
  },
  methods: {
    go() {
      const projectID = "7547";
      const event_3 = GitlabService.getBranches(projectID, 3);
      this.commits.push(event_3);
      const event_2 = GitlabService.getBranches(projectID, 2);
      this.commits.push(event_2);
      const event_1 = GitlabService.getBranches(projectID, 1);
      this.commits.push(event_1);
      const response2 = GitlabService.getMerges(projectID);
      this.merges = response2;
    },
    async init() {
      let branches = [];
      const graphContainer = document.getElementById("gitGraph");
      const gitgraph = createGitgraph(graphContainer, {
        orientation: "vertical-reverse"
      });
      const master = gitgraph.branch({
        name: "master",
        author: "gayeong <정가영>"
      });
      master.commit({
        subject: "Start project",
        author: "gayeong <정가영>"
      });
      const develop = gitgraph.branch({
        name: "develop",
        author: "gayeong <정가영>"
      });
      develop.commit({
        subject: "Develop branch generate",
        author: "gayeong <정가영>"
      });
      const commits = this.commits;
      const merges = this.merges;
      for (let k = 0; k < commits.length; k++) {
        await commits[k].then(async function(response) {
          for (let i = response.data.length - 1; i > -1; i--) {
            if (
              response.data[i].action_name == "pushed new" &&
              response.data[i].push_data.ref != "master" &&
              response.data[i].push_data.ref != "developers" &&
              response.data[i].push_data.ref != "develop"
            ) {
              var exbranch = gitgraph.branch(response.data[i].push_data.ref);
              exbranch.checkout();
              branches.push(exbranch);
            } else if (response.data[i].action_name == "pushed to") {
              branches.forEach(function(e_branch) {
                if (e_branch.name == response.data[i].push_data.ref) {
                  e_branch.commit({
                    subject: response.data[i].push_data.commit_title,
                    author: `${response.data[i].author.username} <${
                      response.data[i].author.name
                    }>`,
                    onClick() {
                      window.open(
                        `https://lab.ssafy.com/gayeong/webmobile-final/commit/${
                          response.data[i].push_data.commit_to
                        }`
                      );
                    },
                    onMessageClick() {
                      window.open(
                        `https://lab.ssafy.com/gayeong/webmobile-final/commit/${
                          response.data[i].push_data.commit_to
                        }`
                      );
                    }
                  });
                  e_branch.checkout();
                  return false;
                }
              });
            } else if (response.data[i].action_name == "accepted") {
              await branches.forEach(async function(e_branch, i_branch) {
                await merges
                  .then(function(e_merge) {
                    for (let j = 0; j < e_merge.data.length; j++) {
                      if (
                        response.data[i].target_title == e_merge.data[j].title
                      ) {
                        if (e_branch.name == e_merge.data[j].source_branch) {
                          develop.merge({
                            branch: e_branch.name,
                            commitOptions: {
                              subject: `MergeRequest / ${
                                response.data[i].target_title
                              }`,
                              author: `${response.data[i].author.username} <${
                                response.data[i].author.name
                              }>`
                            }
                          });
                          branches.splice(branches.indexOf(i_branch), 1);
                        }
                      }
                    }
                  })
                  .catch(function(err) {
                    console.log(err);
                  });
              });
            }
          }
        });
      }
      master.merge({
        branch: develop,
        commitOptions: {
          subject: "final develop => master merge",
          author: "gnsl8391 <KimHoon>"
        }
      });
    }
  }
};
</script>

<style>
@media screen and (max-width: 598px) {
  #repo {
    margin: 10%;
    margin-top: 25%;
  }
}
@media screen and (min-width: 599px) {
  #repo {
    margin: 10%;
  }
}
path {
  stroke-width: 7 !important;
}
svg {
  transform: scale(0.5);
  margin-left: -380px;
  margin-top: -1050px;
}
</style>
