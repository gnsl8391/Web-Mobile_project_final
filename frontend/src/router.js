import Vue from "vue";
import Router from "vue-router";
import store from "./store.js";
import FirebaseService from "@/services/FirebaseService";
import HomePage from "./views/HomePage.vue";
import PostPage from "./views/PostPage.vue";
import PortfolioPage from "./views/PortfolioPage.vue";
import LoginPage from "./views/LoginPage.vue";
import MyPage from "./views/MyPage.vue";
import SignUp from "./views/SignUp.vue";
import GitPage from "./views/GitPage.vue";
import AdminPage from "./views/AdminPage.vue";
import PortfolioDetail from "./views/PortfolioDetail.vue";
import PostDetail from "./views/PostDetail.vue";
import Calendar from "./views/Calendar";
import Schedule from "./views/Schedule.vue";

Vue.use(Router);

const requireAuth = () => (to, from, next) => {
  alert(store.state.accessToken);
  if (store.state.accessToken !== "") {
    return next();
  }
  next("/");
};
export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage
    },
    {
      path: "/post",
      name: "post",
      component: PostPage
    },
    {
      path: "/portfolio",
      name: "portfolio",
      component: PortfolioPage
    },
    {
      path: "/login",
      name: "login",
      component: LoginPage
    },
    {
      path: "/signup",
      name: "signup",
      component: SignUp
    },
    {
      path: "/mypage",
      name: "mypage",
      component: MyPage
    },
    {
      path: "/git",
      name: "git",
      component: GitPage
    },
    {
      path: "/Management",
      name: "Management",
      component: AdminPage,
      beforeEnter: (to, from, next) => {
        var uid = store.state.uid;
        var auth = FirebaseService.getOneMembers(uid);
        auth.then(r => {
          if (r.myauth == "admin") {
            next();
          } else {
            next("/");
          }
        });
      }
    },
    {
      path: "/portfolioDetail",
      name: "portfolioDetail",
      component: PortfolioDetail,
      props: true
    },
    {
      path: "/postDetail",
      name: "postDetail",
      component: PostDetail,
      props: true
    },
    {
      path: "/calendar",
      name: "calendar",
      component: Calendar
    },
    {
      path: "/schedule",
      name: "schedule",
      component: Schedule
    }
  ]
});
