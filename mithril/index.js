
;(() => {
  if (location.search) {
    var qs = location.search.replace('?', '').split('&')
      .reduce((qs, pair) => (
        ([key, value] = pair.split('=')) => (qs[key] = value, qs)
      )(), {})

    if (qs.login) {
      localStorage.setItem('v-login', qs.login)
    }
    if (qs.admin) {
      localStorage.setItem('v-admin', qs.admin)
    }
    if (qs.jwt) {
      localStorage.setItem('v-jwt', qs.jwt)
    }

    window.location = '/'
  }
})()


var v = {
  origin: 'https://simo.varnalab.org/api',
  prefix: '',

  module: {},
  route: {},
  view: {},
  component: {},

  state: {
    login: localStorage.getItem('v-login'),
    admin: localStorage.getItem('v-admin'),
    jwt: localStorage.getItem('v-jwt'),
    theme: localStorage.getItem('v-theme') || 'light',

    route: '',
    title: '',
    avatar: '/assets/images/logo.png',

    toolbar: [
      {path: '/whois', icon: 'directions_run'},
    ],
    menu: {
      items: [
        {theme: 'light', text: 'Светла'},
        {theme: 'shadow', text: 'Тъмна'},
        {theme: 'hacker', text: 'Хакер'},
      ]
    },
    drawer: {
      items: [
        [
          {path: '/', icon: 'refresh', text: '[ Начало ]', route: 'index'},
          {path: '/whois', icon: 'directions_run', text: '[ Хора ]', route: 'whois'},
          {path: '/events', icon: 'school', text: '[ Събития ]', route: 'events'},
          {path: '/lab', icon: 'lightbulb_outline', text: '[ За Лаба ]', route: 'lab'},
        ],
        [
          {path: '/login', icon: 'lock_open', text: '[ Влез ]', route: 'login'},
        ],
      ]
    },
    links: [
      [
        {id: 'location', title: 'гр. Варна', subtitle: 'ул. Пенчо Славейков № 50', url: 'https://www.google.com/maps/place/VarnaLab/@43.21669,27.904608,16z/data=!4m5!3m4!1s0x0:0xf9c0fd8622b636aa!8m2!3d43.2166902!4d27.9046083?hl=en-US', icon: 'location'},
        {id: 'hq-email', title: 'hq@varnalab.org', url: 'mailto:hq@varnalab.org', icon: 'email'},
        {id: 'website', title: 'WebSite', url: 'https://varnalab.org', icon: 'www'},
      ],
      [
        {id: 'facebook-page', title: 'Facebook Страница', url: 'https://www.facebook.com/varnalab', icon: 'facebook'},
        {id: 'facebook-group', title: 'Facebook Група', url: 'https://www.facebook.com/groups/varnalab/', icon: 'facebook'},
        {id: 'twitter', title: 'Twitter', url: 'https://twitter.com/varnalab', icon: 'twitter'},
        {id: 'group-email', title: 'varna-lab@googlegroups.com', url: 'mailto:varna-lab@googlegroups.com', icon: 'email'},
      ],
      [
        {id: 'github', title: 'GitHub', url: 'https://github.com/varnalab', icon: 'github'},
        {id: 'trello', title: 'Trello', url: 'https://trello.com/varnalab', icon: 'trello'},
        {id: 'slack', title: 'Slack', url: 'https://varnalab.slack.com', icon: 'slack'},
        {id: 'wiki', title: 'Wiki', url: 'https://wiki.varnalab.org', icon: 'wikipedia'},
      ],
      [
        {id: 'slack-invitation', title: 'Покана за Slack', url: 'https://slack.varnalab.org', icon: 'slack'},
        {id: 'github-invitation', title: 'Покана за GitHub', url: 'https://github.varnalab.org', icon: 'github'},
        {id: 'mobile-cordova', title: 'Cordova Приложение', url: 'https://play.google.com/store/apps/details?id=com.varnalab.app', icon: 'android'},
        {id: 'mobile-native', title: 'Native Приложение (Lite)', url: 'https://play.google.com/store/apps/details?id=com.varnalab.app.android', icon: 'android'},
      ],
    ],
    fab: {},
    snackbar: {},
    dialog: {},
  }
}


if (location.host === 'box.outofindex.com') {
  v.prefix = '/varnalab/app'
  m.route.prefix(v.prefix)
}

if (location.protocol === 'file:') {
  v.prefix = '/android_asset/www'
}

if (/ssd|192\.168\.1\.100:8001/.test(location.host)) {
  v.state.avatar = v.state.avatar.slice(1)
  v.origin = 'http://192.168.1.100:3000/varnalab/api'
}
if (/localhost:3000/.test(location.host)) {
  v.state.avatar = v.state.avatar.slice(1)
  v.origin = 'http://localhost:3000/api'
}

v.state.avatar = v.prefix + v.state.avatar


window.addEventListener('DOMContentLoaded', () => {

  m.route(document.querySelector('body'), '/', {

    '/': v.route.index(
      v.module.whois(v),
      v.module.event(v),
    ),

    '/whois': v.route.whois(
      v.module.whois(v)
    ),

    '/whois/:filter': v.route.whois(
      v.module.whois(v)
    ),

    '/user': v.route.edit(
      // v.module.whois(v),
      v.module.edit(v)
    ),

    '/user/:id': v.route.user(
      v.module.whois(v),
      v.module.user(v)
    ),

    '/events': v.route.events(
      v.module.event(v)
    ),

    '/event/:id': v.route.event(
      v.module.event(v)
    ),

    '/lab': v.route.lab(),

    '/lab/:view': v.route.lab(),

    '/login': {
      onmatch: () => window.location = v.origin + '/auth/login'
    },

  })
})
