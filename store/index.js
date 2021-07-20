import Vue from 'vue'
import axios from 'axios'

const baseURL = 'https://davidmegginson.github.io/iati3w-data'

export const state = () => ({
  stats: {
    signatories: null,
    iati: null,
    humanitarian: null
  },
  signatoryData: [],
  signatoryProgressData: []
})

export const mutations = {
  setHomepageStats (state, data) {
    state.stats = data
  },
  setSignatoryData (state, data) {
    state.signatoryData = data
  },
  setSignatoryProgressData(state, data) {
    state.signatoryProgressData = data
  }
}

export const actions = {
  async loadHomepageStats({ commit, state }) {
    if (state.stats.signatories != null) {
      return true
    }
    const { data } = await axios
      .get(`/output/homepage.json`)
    commit("setHomepageStats", data)
  },
  async loadSignatoryData({ commit, state }) {
    if (state.signatoryData.length != 0) {
      return true
    }
    const { data } = await axios
      .get(`/output/signatories.json`)
    commit("setSignatoryData", data)
  },
  async loadSignatoryProgressData({ commit, state }) {
    if (state.signatoryProgressData.length != 0) {
      return true
    }
    const { data } = await axios
      .get(`/output/signatories-progress.json`)
    commit("setSignatoryProgressData", data)
  }
}
