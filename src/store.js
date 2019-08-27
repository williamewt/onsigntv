import Vue from 'vue'
import Vuex from 'vuex'

const GET_LATLNG = 'GET_LATLNG'
const SET_LATLNG = 'SET_LATLNG'
const GET_TEMPERATURE = 'GET_TEMPERATURE'
const SET_TEMPERATURE = 'SET_TEMPERATURE'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lat: '',
    lng: '',
    temperature: ''
  },
  mutations: {

  },
  actions: {

  }
})
