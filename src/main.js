import Vue from 'vue'
import App from './App.vue'
import router from './router'
//import jQuery from 'jquery'
//import { fb } from './firebase'
import VueFirestore from 'vue-firestore'
require('firebase/firestore')

Vue.use(VueFirestore, {
    // O nome da propriedade. O padrão é '.key'.
    key: 'id',
    // se é enumerável ou não. O padrão é verdadeiro.
    enumerable: true
})
Vue.use(VueFirestore)


import Vue2Filters from 'vue2-filters'
Vue.use(Vue2Filters)



//window.$ = window.jQuery = jQuery;
//window.$ = window.jQuery = require('jquery')
global.jQuery = require('jquery');
var $ = global.jQuery;
window.$ = $;

import 'popper.js';
import 'bootstrap';
import './assets/app.scss'

import Swal from 'sweetalert2'
import { fb } from './firebase'

window.Swal = Swal

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
})

window.Toast = Toast

import store from './store.js';

Vue.component('Navbar', require('./components/Navbar.vue').default)
Vue.component('add-no-carrinho', require('./components/AddNoCarrinho.vue').default)
Vue.component('mini-carrinho', require('./components/MiniCarrinho.vue').default)
Vue.component('produtos-lista', require('./sections/ProdutoLista.vue').default)

import VueCarousel from 'vue-carousel';
Vue.use(VueCarousel);

Vue.config.productionTip = false

let app = ''

fb.auth().onAuthStateChanged(function(usuario) {
    if (!app) {
        new Vue({
            router,
            store,
            render: h => h(App)
        }).$mount('#app')
        console.log(usuario);
    }
})