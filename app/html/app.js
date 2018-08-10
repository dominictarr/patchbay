const nest = require('depnest')
const { h } = require('mutant')

exports.gives = nest('app.html.app')

exports.needs = nest({
  'app.html.tabs': 'first',
  'app.page.errors': 'first',
  'app.sync.goTo': 'first',
  'app.sync.initialise': 'first',
  'app.sync.window': 'reduce',
  'history.obs.location': 'first',
  'history.sync.push': 'first',
  'settings.sync.get': 'first'
})

exports.create = function (api) {
  return nest('app.html.app', app)

  function app () {
    console.log('STARTING app')

    const appWindow = api.app.sync.window(appWindow)

    const initialTabs = api.settings.sync.get('patchbay.defaultTabs')
    const App = h('App', api.app.html.tabs(initialTabs))

    api.app.sync.initialise(App)
    // runs all the functions in app/sync/initialise

    api.history.obs.location()(loc => api.app.sync.goTo(loc || {}))

    return App
  }
}

