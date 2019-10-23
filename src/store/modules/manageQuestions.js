import axios from 'axios';

const state = {
  allQuestions: [],
  pickedQuestion: {
    answers: [
      { answer: '' },
      { answer: '' },
      { answer: '' },
      { answer: '' },
    ],
    correctOne: null,
    description: [],
    question: [], 
    reference: ''
  }
};

const getters = {
  allQuestions: state => state.allQuestions,
  pickedQuestion: state => state.pickedQuestion
};

const actions = {
  async addNew({ commit }, payload) {
    const response = await axios({
      data: payload,
      headers: { "x-api-key": process.env.VUE_APP_API_KEY },
      method: 'post',
      url: `${process.env.VUE_APP_BACKEND_SERVER_URL}/questions`
    })
    commit('newAdded', response.data)
  },

  async deleteSelected({ commit }, payload) {
    const response = await axios({
      headers: { 
        'x-api-key': process.env.VUE_APP_API_KEY,
        'kulcs': payload.secretCode
      },
      method: 'delete',
      url: `${process.env.VUE_APP_BACKEND_SERVER_URL}/questions?questionId=${payload.id}`,
    });
    commit('deleteSelected', response)
  },

  async editSelected({ commit }, payload) {
    const response = await axios({
      data: payload,
      headers: { "x-api-key": process.env.VUE_APP_API_KEY },
      method: 'put',
      url: `${process.env.VUE_APP_BACKEND_SERVER_URL}/questions`
    })
    commit('editSelected', response.data)
  },

  async fetchAllQuestions({ commit }) {
    const response = await axios({
      headers: { "x-api-key": process.env.VUE_APP_API_KEY },
      method: 'get',
      url: process.env.VUE_APP_BACKEND_SERVER_URL + '/whatistheoutput'
    })
    commit('fetchAllQuestions', response.data)
  },

  openNewQuestion({ commit }) {
    commit('openNewQuestion');
  },

  setPickedQuestion({ commit }, payload) {
    commit('setPickedQuestion', payload);
  }

};

const mutations = {
  // eslint-disable-next-line
  deleteSelected: (state, response) => console.log(response.message),
  // eslint-disable-next-line
  editSelected: (state, response) => console.log(response.message),
  fetchAllQuestions: (state, allQuestions) => state.allQuestions = allQuestions,
  newAdded: (state, question) => state.allQuestions.unshift(question),
  openNewQuestion: (state) => {
    state.pickedQuestion = {
      answers: [
        { answer: '' },
        { answer: '' },
        { answer: '' },
        { answer: '' },
      ],
      correctOne: null,
      description: [],
      question: [], 
      reference: ''
    }
  },
  setPickedQuestion: (state, payload) => state.pickedQuestion = payload
};

export default {
  state,
  getters,
  actions,
  mutations
};
