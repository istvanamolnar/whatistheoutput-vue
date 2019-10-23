import Vuex from 'vuex';
import Vue from 'vue';
import currentGame from './modules/currentGame';
import manageQuestions from './modules/manageQuestions';
import themes from './modules/themes';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    currentGame,
    manageQuestions,
    themes
  }
})