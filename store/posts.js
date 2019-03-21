export const state = () => ({
  list: []
})

export const mutations = {
  add(state, post) {
    state.list.push(post)
  },
  emptyList(state) {
    state.list = []
  }
}

export const getters = {
  list: state => {
    return state.list
  }
}
