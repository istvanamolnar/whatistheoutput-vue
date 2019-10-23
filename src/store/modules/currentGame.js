import axios from 'axios';

const state = {
  answers: [],
  currentQuestion: null,
  dogPhoto: null,
  game: 'whatistheoutput',
  leaderboardData: null,
  name: 'Enter your name',
  numOfQuestions: 4,
  questions: [],
  score: 0
};

const getters = {
  answers: state => state.answers,
  currentQuestion: state => state.questions[0],
  dogPhoto: state => state.dogPhoto,
  leaderboardData: state => state.leaderboardData,
  name: state => state.name,
  numOfQuestions: state => state.numOfQuestions,
  questions: state => state.questions,
  score: state => state.score
};

const actions = {
  addAnswer({ commit }, payload) {
    commit('addAnswer', payload)
  },

  async fetchSomeQuestions({ commit }) {
    const response = await axios.get(`${process.env.VUE_APP_BACKEND_SERVER_URL}/whatistheoutput?numOfQuestions=${state.numOfQuestions}`);
    commit('fetchSomeQuestions', response.data);
  },

  async getDogPhoto({ commit }) {
    const response = await axios.get('https://dog.ceo/api/breeds/image/random')
    commit('getDogPhoto', response.data.message);
  },

  async getLeaderboard({ commit }) {
    const response = await axios.get(`${process.env.VUE_APP_BACKEND_SERVER_URL}/user/leaderboard`)
    commit('getLeaderboard', response.data.sort((a, b) => b.score - a.score));
  },

  getNewQuestion({ commit }) {
    commit('getNewQuestion');
  },

  increaseScore({ commit }, value) {
    commit('increaseScore', value);
  },

  async saveGame({ commit }) {
    const response = await axios({
      headers: { "x-api-key": process.env.VUE_APP_API_KEY },
      method: 'post',
      url: `${process.env.VUE_APP_BACKEND_SERVER_URL}/user`,
      data: {
        name: state.name,
        score: state.score,
        userAnswers: state.answers,
        numOfQuestions: state.numOfQuestions,
        game: state.game
      }
    });
    commit('saveGame', response.data);
  },

  setName: ({ commit }, payload) => {
    commit('setName', payload);
  },

  setNumOfQuestions({ commit }, value) {
    commit('setNumOfQuestions', value);
  }
};

const mutations = {
  addAnswer: (state, payload) => state.answers.push(payload),
  fetchSomeQuestions: (state, payload) => state.questions = payload,
  getDogPhoto: (state, payload) => state.dogPhoto = payload,
  getLeaderboard: (state, payload) => state.leaderboardData = payload,
  getNewQuestion: (state) => state.questions.shift(),
  increaseScore: (state, value) => state.score += value,
  // eslint-disable-next-line
  saveGame: () => (console.log('game saved')),
  setName: (state, payload) => state.name = payload,
  setNumOfQuestions: (state, value) => state.numOfQuestions = value
};

export default {
  state,
  getters,
  actions,
  mutations
};
