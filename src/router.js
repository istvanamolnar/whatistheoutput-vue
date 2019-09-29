import Vue from "vue";
import Router from "vue-router";
import SelectTheme from "./components/StartGame/SelectTheme.vue";
import QuizArea from "./components/QuizArea/QuizArea.vue";
import SummaryPage from "./components/FinishGame/SummaryPage.vue";
import ManageQuestions from "./components/ManageQuestions/ManageQuestions.vue";

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: "/",
      name: "start",
      component: SelectTheme
    },
    {
      path: "/letsplay",
      name: "quiz",
      component: QuizArea
    },
    {
      path: "/manage",
      name: "manage",
      component: ManageQuestions
    },
    {
      path: "/summary",
      name: "summary",
      component: SummaryPage
    }
  ]
});
