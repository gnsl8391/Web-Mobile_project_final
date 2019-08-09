import Vue from "vue";
import Router from "vue-router";
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
import Test from "./views/test.vue";

Vue.use(Router);

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
      component: AdminPage
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
      path: "/test",
      name: "test",
      component: Test
    }
  ]
});
