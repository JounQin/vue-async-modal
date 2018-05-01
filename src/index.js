import Vue from 'vue'

import App from 'App'

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  render: h => h(App),
})

if (module.hot) {
  module.hot.accept()
}
