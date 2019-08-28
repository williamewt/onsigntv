import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import { getUserLocation, getLocationInfoAndWeatherData } from './lib/geolocation'

const SET_LOCATION = 'SET_LOCATION'
const SET_LAT_LNG = 'SET_LAT_LNG'
const SET_TEMPERATURE = 'SET_TEMPERATURE'
const START_LOADING = 'START_LOADING'
const END_LOADING = 'END_LOADING'
const SET_ERROR = 'SET_ERROR'
const CLEAR_ERROR = 'CLEAR_ERROR'
const SET_STATE = 'SET_STATE'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  plugins: [createLogger()],
  state: {
    loading: false,
    error: false,
    lat: '',
    lng: '',
    location: '',
    temperature: ''
  },
  mutations: {
    /**
     * Changes latitude and longitude state
     * @param {Vuex.store.state} state 
     * @param {Number} lat 
     * @param {Number} lng 
     */
    [SET_LAT_LNG](state, { lat, lng, location }) {
      state.lat = lat
      state.lng = lng
      state.location = location
    },
    /**
     * Changes latitude and longitude state
     * @param {Vuex.store.state} state 
     * @param {String} location
     */
    [SET_LOCATION](state, location) {
      state.location = location
    },

    /**
     * Changes temperature state
     * @param {Vuex.store.state} state 
     * @param {String} temperature 
     */
    [SET_TEMPERATURE](state, temperature) {
      state.temperature = temperature
    },

    /**
     * Start loading State
     * @param {Vuex.store.state} state 
     */
    [START_LOADING](state) {
      state.loading = true
    },

    /**
     * End loading State
     * @param {Vuex.store.state} state 
     */
    [END_LOADING](state) {
      state.loading = false
    },
    /**
     * Set Error state
     * @param {Vuex.store.state} state 
     */
    [SET_ERROR](state, error) {
      state.error = error
    },

    /**
     * Clear Error State
     * @param {Vuex.state} state
     */
    [CLEAR_ERROR](state) {
      state.error = false
    },

    /**
     * 
     * @param {Vuex.state} state 
     * @param {String} key 
     * @param {*} value 
     */
    [SET_STATE](state, { key, value }) {
      state[key] = value
    },

  },
  actions: {

    /**
     * Get current location of user
     * @param {Vuex.store.state} state 
     * @param {Vuex.store.commit} commit
     */
    getCurrentLocation({ state, commit }) {

      getUserLocation().then(data => {
        const { lat, lng } = data

        commit('SET_LAT_LNG', { lat, lng });
      }, err => {
        commit('SET_ERROR', err)
      })

    },

    /**
     * Get the temperature and location info
     * @param {Vuex.store.state} state 
     * @param {Vuex.store.commit} commit
     */
    getTemperatureAndLocationInfo ({state, commit}) {
      const {lat, lng} = state

      if (!lat || !lng) {
        return commit('SET_ERROR', 'Latitude and longitude not informed!');        
      }

      commit('START_LOADING')

      getLocationInfoAndWeatherData({ lat, lng }).then(data => {

        const { location, weather} = data

        let city = location.address_components.find(a => a.types.indexOf('administrative_area_level_2') === 0)

        let stateLocation = location.address_components.find(a => a.types.indexOf('administrative_area_level_1') === 0)

        commit('SET_LOCATION', city.long_name + ' - ' + stateLocation.long_name)
        commit('SET_TEMPERATURE', Math.round(weather.main.temp) + 'ºC')

      }, err => {
        commit('SET_ERROR', err)

      }).finally(() => {
        commit('END_LOADING')
      })
    }
  },
  strict: debug
})
