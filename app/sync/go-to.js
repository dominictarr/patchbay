const nest = require('depnest')

exports.gives = nest({ 'app.sync.goTo': true })

exports.needs = nest({
  'app.html.tabs': 'first',
  'app.sync.locationId': 'first',
  'history.obs.store': 'first',
  'history.sync.push': 'first',
  'router.async.normalise': 'first',
  'router.async.router': 'first',
  'settings.obs.get': 'first',
  'settings.sync.set': 'first'
})

exports.create = function (api) {
  return nest('app.sync.goTo', goTo)

  // TODO consider rolling single arg:
  //   goTo({ ...location, tmp: { openBackground, split, position } })
  //
  // prune `tmp` before pushing into history
  // allows a refactor of catch-keyboard-shortcut + patch-inbox
  //   - extracts scrollToMessage into app.page.thread
  //   - router.sync.router would take (location, { position }) ?

  function goTo (location, options = {}) {
    if (!location) return
    const {
      openBackground = false,
      split = false
    } = options

    const tabs = api.app.html.tabs()

    // currently do normalisation here only to generate normalised locationId
    api.router.async.normalise(location, (err, loc) => {
      if (err) return console.error(err)

      const locationId = api.app.sync.locationId(loc)

      var page = tabs.get(locationId)

      if (page) {
        tabs.select(locationId)
        api.history.sync.push(loc)

        if (loc.action === 'quote' && page.firstChild && page.firstChild.addQuote) {
          page.firstChild.addQuote(loc.value)
          tabs.currentPage().keyboardScroll('last')
        } else if (loc.action === 'reply') { tabs.currentPage().keyboardScroll('last') }

        return true
      }

      api.router.async.router(loc, (err, page) => {
        if (err) throw err

        if (!page) return

        page.id = page.id || locationId
        tabs.add(page, !openBackground, split)

        // Save Tabs: If enabled then add it to default tabs.
        const saveTabs = api.settings.obs.get('patchbay.saveTabs', false)
        if (saveTabs()) {
          const openTabs = api.settings.obs.get('patchbay.openTabs', [])
          var _tabs = openTabs()

          var newTab = Object.values(loc)[0]
          if (loc.page) {
            newTab = '/' + newTab
          }

          if (_tabs.indexOf(newTab) === -1) {
            _tabs.push(newTab)

            api.settings.sync.set({ patchbay: { openTabs: _tabs } })
          }
        }

        if (openBackground) {
          const history = api.history.obs.store()
          var _history = history()
          var current = _history.pop()

          history.set([ ..._history, loc, current ])
        } else {
          api.history.sync.push(loc)
        }
      })
    })
  }
}
