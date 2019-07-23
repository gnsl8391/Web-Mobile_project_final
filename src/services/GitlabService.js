import Api from "@/services/Api";

const BASE_URL = "https://lab.ssafy.com/api/v4";

export default {
  getRepos(userName) {
    return Api(BASE_URL).get(`/users/${userName}/projects`);
  },
  getMembers() {
    return Api(BASE_URL).get(`/projects/6081/members`);
  },
  getCommits(userName) {
    let d = new Date();
    d.setMonth(d.getMonth() - 1);
    return Api(BASE_URL).get(
      `/projects/${userName}/repository/commits?all&since=${d.toISOString()}&page=1&per_page=10000`
    );
  },
  getBranches(userName, page) {
    return Api(BASE_URL).get(
      `/projects/${userName}/events?page=${page}&per_page=10000`
    );
  },
  getMerges(userName) {
    return Api(BASE_URL).get(
      `/projects/${userName}/merge_requests?page=1&per_page=10000`
    );
  }
};
