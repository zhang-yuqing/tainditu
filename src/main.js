import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/common.css'
 
//引入cesium相关文件
var cesium = require('cesium/Cesium');
var widgets= require('cesium/Widgets/widgets.css');
 
Vue.prototype.cesium = cesium
Vue.prototype.widgets = widgets

Vue.config.productionTip = false
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
