import Vue from "vue";
import Router from "vue-router";
import StartGame from "./components/Select/StartGame.vue";
import QuizArea from "./components/QuizArea/QuizArea.vue";
import ClaimReward from "./components/FinishGame/ClaimReward.vue"
import ManageQuestions from "./components/ManageQuestions/ManageQuestions.vue";

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: "/",
      name: "start",
      component: StartGame
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
      path: "/claimreward",
      name: "claimreward",
      component: ClaimReward
    }
  ]
});
