import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import vuetify from './plugins/vuetify'
import Vuelidate from 'vuelidate'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import AOS from 'aos'
import VueAnimated from '@asika32764/vue-animate';
import 'aos/dist/aos.css'

Vue.config.productionTip = false
Vue.use(Vuelidate)
Vue.use(VueSweetalert2);
Vue.use(VueAnimated)

new Vue({
  router,
  store,
  vuetify,
  mounted(){
    AOS.init()
  },
  render: h => h(App)
}).$mount('#app')
