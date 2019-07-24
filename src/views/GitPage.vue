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
      const projectID = "6081";
      const event_3 = GitlabService.getBranches(projectID, 3);
      this.commits.push(event_3);
      const event_2 = GitlabService.getBranches(projectID, 2);
      this.commits.push(event_2);
      const event_1 = GitlabService.getBranches(projectID, 1);
      this.commits.push(event_1);
      const response2 = GitlabService.getMerges(projectID);
      this.merges = response2;
      console.log(this.merges);
    },
    init() {
      let branches = [];
      const graphContainer = document.getElementById("gitGraph");
      const gitgraph = createGitgraph(graphContainer, {
        orientation: "vertical-reverse"
      });
      const master = gitgraph.branch({
        name: "master",
        author: "tastera <SONG KUNHEE>"
      });
      master.commit({
        subject: "Start project",
        author: "tastera <SONG KUNHEE>"
      });
      const develop = gitgraph.branch({
        name: "develop",
        author: "tastera <SONG KUNHEE>"
      });
      develop.commit({
        subject: "Develop branch generate",
        author: "tastera <SONG KUNHEE>"
      });
      const commits = this.commits;
      for (let k = 0; k < commits.length; k++) {
        commits[k].then(response => {
          for (let i = response.data.length - 1; i > -1; i--) {
            console.log(response.data[i]);
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
              branches.forEach(e_branch => {
                if (e_branch.name == response.data[i].push_data.ref) {
                  console.log(e_branch);
                  e_branch.commit({
                    subject: response.data[i].push_data.commit_title,
                    author: `${response.data[i].author.username} <${
                      response.data[i].author.name
                    }>`
                  });
                  e_branch.checkout();
                  return false;
                }
              });
            } else if (response.data[i].action_name == "accepted") {
              const merges = this.merges;
              branches.forEach(e_branch => {
                merges.then(e_merge => {
                  for (let j = 0; j < e_merge.data.length; j++) {
                    if (
                      response.data[i].target_title == e_merge.data[j].title
                    ) {
                      if (e_branch.name == e_merge.data[j].source_branch) {
                        develop.merge({
                          branch: e_branch.name,
                          commitOptions: {
                            subject: response.data[i].target_title,
                            author: `${response.data[i].author.username} <${
                              response.data[i].author.name
                            }>`
                          }
                        });
                      }
                    }
                  }
                });
              });
            }
          }
        });
      //   commits[k].then(r => {
      //     for (let i = r.data.length - 1; i >= 0; i--) {
      //       if (r.data[i].action_name == "pushed new") {
      //         var b = gitgraph.branch(r.data[i].push_data.ref);
      //         b.commit({
      //           subject: r.data[i].push_data.commit_title,
      //           author: r.data[i].author.username,
      //           onClick() {
      //             window.open(
      //               `https://lab.ssafy.com/tastera/webmobile-sub2/commit/${
      //                 r.data[i].push_data.commit_to
      //               }`
      //             );
      //           },
      //           onMessageClick() {
      //             window.open(
      //               `https://lab.ssafy.com/tastera/webmobile-sub2/commit/${
      //                 r.data[i].push_data.commit_to
      //               }`
      //             );
      //           }
      //         });
      //         b.checkout();
      //         branches.push(b);
      //       } else if (r.data[i].action_name == "accepted") {
      //         branches.forEach(e => {
      //           const merges = this.merges;
      //           merges.then(m => {
      //             for (let j = 0; j < m.data.length; j++) {
      //               if (r.data[i].target_title == m.data[j].title) {
      //                 if (e.name == m.data[j].source_branch) {
      //                   master.merge({
      //                     branch: e,
      //                     commitOptions: {
      //                       subject: r.data[i].target_title,
      //                       author: r.data[i].author.username
      //                     },
      //                     onClick() {
      //                       window.open(`https://lab.ssafy.com/tastera/webmobile-sub2/commit/
      //                             ${r.data[i].push_data.commit_to}`);
      //                     },
      //                     onMessageClick() {
      //                       window.open(`https://lab.ssafy.com/tastera/webmobile-sub2/commit/
      //                             ${r.data[i].push_data.commit_to}`);
      //                     }
      //                   });
      //                   return false;
      //                 }
      //                 return false;
      //               }
      //             }
      //           });
      //         });
      //       } else if (r.data[i].action_name == "pushed to") {
      //         branches.forEach(e => {
      //           if (e.name == r.data[i].push_data.ref) {
      //             var title = r.data[i].push_data.commit_title;
      //             if (title.substr(0, 5) != "Merge") {
      //               e.commit({
      //                 subject: r.data[i].push_data.commit_title,
      //                 author: r.data[i].author.username,
      //                 onClick() {
      //                   window.open(`https://lab.ssafy.com/tastera/webmobile-sub2/commit/
      //                       ${r.data[i].push_data.commit_to}`);
      //                 },
      //                 onMessageClick() {
      //                   window.open(`https://lab.ssafy.com/tastera/webmobile-sub2/commit/
      //                       ${r.data[i].push_data.commit_to}`);
      //                 }
      //               });
      //               e.checkout();
      //               return false;
      //             }
      //             return false;
      //           }
      //         });
      //       }
      //     }
      //   });
      }
      console.log(branches)
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
  margin-top: -750px;
}
</style>
