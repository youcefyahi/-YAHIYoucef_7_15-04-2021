import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex, axios)

export default new Vuex.Store({
    state: {
        posts: [],
        gets: [],
        profil: []
    },
    mutations: {

    },

    actions: {},
    modules: {}
})