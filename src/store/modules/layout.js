/* 布局设置 */
const type = {
  SET_ACTIVE: 'SET_ACTIVE',
  SET_TAGS: 'SET_TAGS',
  ADD_TAGS: 'ADD_TAGS',
  DELETE_TAGS: 'DELETE_TAGS',
  SET_BREADCRUMB: 'SET_BREADCRUMB',
  SET_ScrollTop: 'SET_ScrollTop',
};

const state = {
  active: '首页',
  breadcrumb: [],
  tags: [{title: "首页", path: "home", index: []}],
  scrollTop: 0
};

const getters = {
  active: state => state.active,
  tags: state => state.tags,
  breadcrumb: state => state.breadcrumb,
  scrollTop: state => state.scrollTop
};

const mutations = {
  [type.SET_ACTIVE](state, active) {
    if (active) state.active = active;
    else state.active = '首页'
  },
  [type.SET_BREADCRUMB](state, breadcrumb) {
    if (breadcrumb) state.breadcrumb = breadcrumb;
    else state.breadcrumb = []
  },
  [type.SET_TAGS](state, tags) {
    if (tags) state.tags = tags;
    else state.tags = [{title: "首页", path: "home", index: []}]
  },
  [type.ADD_TAGS](state, tags) {
    let isExist = state.tags.some(item => {
      if (item.title === tags.title) {
        return true
      }
    });
    if (!isExist) state.tags.push(tags)
  },
  [type.DELETE_TAGS](state, index) {
    if (index) state.tags.splice(index, 1)
  },
  [type.SET_ScrollTop](state, scrollTop) {
    if (scrollTop) state.scrollTop = scrollTop;
    else state.scrollTop = 0
  }
};

const actions = {
  setActive: ({commit}, active) => {
    commit(type.SET_ACTIVE, active)
  },
  setTags: ({commit}, tags) => {
    commit(type.SET_TAGS, tags)
  },
  addTags: ({commit}, tags) => {
    commit(type.ADD_TAGS, tags)
  },
  deleteTags: ({commit}, index) => {
    commit(type.DELETE_TAGS, index)
  },
  setBreadcrumb: ({commit}, breadcrumb) => {
    commit(type.SET_BREADCRUMB, breadcrumb)
  },
  setScrollTop: ({commit}, scrollTop) => {
    commit(type.SET_ScrollTop, scrollTop)
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}

