import Vue from 'vue'
import axios from "axios";
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store'

import moment from 'moment'

Vue.prototype.moment = moment

Vue.config.productionTip = false

Vue.use(Vuelidate)

axios.interceptors.response.use((response) => {
    console.log('the response status is:', response.status);
    return response;
}, (error) => {
    if (error.response.status === 401) {
        console.log('the error response status is:', error.response.status);
        document.location.href = "/page401";
    } else if (error.response.status === 404) {
        document.location.href = "/page404";
    }


});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')