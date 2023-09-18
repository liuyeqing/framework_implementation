let Vue
class VueRouter {
  constructor(options) {
    this.$options = options
    let initial = window.location.hash.slice(1)
    Vue.util.defineReactive(this, 'current', initial)
    this.current = '/home'
    window.addEventListener('hashchange', () => {
      this.current = window.location.hash.slice(1) || '/'
    })
  }
}
VueRouter.install = (_Vue) => {
  Vue = _Vue
  Vue.mixin({
    beforeCreate() {
      if(this.$options.router) {
        Vue.prototype.$router = this.$options.router
      }
    }
  })
  Vue.component('router-link', {
    render(h){
      return h('a', {
        attrs: {
          href: `#${this.$attrs.to}`
        },
      }, this.$slots.default)
    }
  })
  Vue.component('router-view', {
    render(h){
      let component = null
      const current = this.$router.current
      const route = this.$router.$options.routes.find(route => route.path === current)
      if(route) {
        component = route.component
      }
      return h(component)
    }
  })
}
export default VueRouter