const type = {
  SET_USER_ID: 'SET_USER_ID'
};

const state = {
  userId: {}
};

const getters = {
  userId: state => state.userId
};

const mutations = {
  [type.SET_USER_ID](state, userId) {
    if (userId) state.userId = userId;
    else state.userId = 0
  }
};

const actions = {
  setUserId: ({commit}, userId) => {
    commit(type.SET_USER_ID, userId)
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}
