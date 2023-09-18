let Vue
class Vuex {
}
Vuex.install = (_Vue) => {
  Vue = _Vue
}
Vuex.Store = function(options) {
  Vue.prototype.$store = options
  Vue.util.defineReactive(this, '$store', options)
  Vue.prototype.$store.commit = function(commitName) {
    // 遍历options.mutations
    for(let mutation in options.mutations) {
      if(mutation === commitName) {
        options.mutations[commitName](options.state)
      }
    }
  }
}
export default Vuex