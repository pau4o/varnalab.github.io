
v.component['card-events'] = {
  view: (vnode) =>
    vnode.attrs.events.map((event) =>
      m('a.mdc-card v-card', {
        href: '/event/' + event.id,
        oncreate: m.route.link
        },
        m('section.mdc-card__media', {
          style: 'background-image: url(' + event.photo + ')'
        }),
        m('section.mdc-card__primary',
          m('h1.mdc-card__title mdc-card__title--large',
            event.name
          ),
          m('h2.mdc-card__subtitle',
            new Date(event.start_time).toLocaleString('bg-BG', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
            }) + ' ч.'
          )
        )
      )
    )
}
