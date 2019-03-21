export const state = () => ({
  list: []
})

export const mutations = {
  add(state, slide) {
    state.list.push(slide)
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
