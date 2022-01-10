import Vue from 'vue'
import axios from 'axios'

const baseURL = 'https://humportal.org'
const apiURL = 'https://brough.io/humportal-data'
const analyticsURL = 'https://stats.codeforiati.org'

export const state = () => ({
  stats: {
    signatories: null,
    iati: null,
    humanitarian: null
  },
  signatoryData: [],
  signatoryProgressData: [],
  metadata: {},
  analyticsURL: analyticsURL,
  apiURL: apiURL
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
  },
  setMetadata(state, data) {
    state.metadata = data
  }
}

export const actions = {
  async loadHomepageStats({ commit, state }) {
    if (state.stats.signatories != null) {
      return true
    }
    const { data } = await axios
      .get(`${apiURL}/homepage.json`)
    commit("setHomepageStats", data)
  },
  async loadSignatoryData({ commit, state }) {
    if (state.signatoryData.length != 0) {
      return true
    }
    const { data } = await axios
      .get(`${apiURL}/signatories.json`)
    commit("setSignatoryData", data)
  },
  async loadSignatoryProgressData({ commit, state }) {
    if (state.signatoryProgressData.length != 0) {
      return true
    }
    const { data } = await axios
      .get(`${apiURL}/signatories-progress.json`)
    commit("setSignatoryProgressData", data)
  },
  async loadMetadata({ commit, state }) {
    if (Object.keys(state.metadata).length != 0) {
      return true
    }
    const { data } = await axios
      .get(`${apiURL}/metadata.json`)
    commit("setMetadata", data)
  }
}
