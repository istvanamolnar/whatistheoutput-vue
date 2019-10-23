const state = {
  themes: ['d-bicycles', 'd-shattered', 'l-alchemy', 'l-ahoy'],
  theme: 'd-bicycles',
};

const getters = {
  theme: (state) => state.theme,
  themes: state => state.themes
};

const actions = {
  setTheme: ({ commit }, payload) => {
    commit('setTheme', payload);
  }
};

const mutations = {
  setTheme: (state, payload) => state.theme = payload
};

export default {
  state,
  getters,
  actions,
  mutations
};
