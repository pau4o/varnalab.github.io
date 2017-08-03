
v.route.user = (whois, known) => {
  var state

  var onmatch = (args, url) => {
    state = Object.assign({}, v.state, {
      route: 'known',
      title: '',
      avatar: '',
      known: {},
      social: [],
    })

    window.scrollTo(0, 0)

    whois.get().then((data) => {

      state.known = whois.known(data)
        .find((known) => known.id === args.id)

      whois.loaded = true

      state.title = '[ ' + state.known.name + ' ]'
      state.avatar = 'https://gravatar.com/avatar/'
        + state.known.gravatar + '?size=150&d=monsterid'
      document.title = state.title

      state.social = known.social(state.known)
      m.redraw()
    })
    .catch((err) => console.error(err))
  }

  var render = (vnode) => [
    m(v.component.toolbar, state),
    m(v.component.drawer, state),
    m(v.view.user, state)
  ]

  return {onmatch, render}
}