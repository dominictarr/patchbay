const combine = require('depject')
const entry = require('depject/entry')
const nest = require('depnest')
const bulk = require('bulk-require')

// polyfills
require('setimmediate')

const patchbay = { 
  patchbay: {
    about: bulk(__dirname, [ 'about/**/*.js' ]),
    app: bulk(__dirname, [ 'app/**/*.js' ]),
    blob: bulk(__dirname, [ 'blob/**/*.js' ]),
    channel: bulk(__dirname, [ 'channel/**/*.js' ]),
    contact: bulk(__dirname, [ 'contact/**/*.js' ]),
    message: bulk(__dirname, [ 'message/**/*.js' ]),
    router: bulk(__dirname, [ 'router/**/*.js' ]),
    styles: bulk(__dirname, [ 'styles/**/*.js' ]),

    config: require('./config'), // shouldn't be in here ?
    contextMenu: require('patch-context'),
    suggestions: require('patch-suggest'),
    inbox: require('patch-inbox'),
    history: require('patch-history'),
  }
}


// from more specialized to more general
const sockets = combine(
  //require('ssb-horcrux'),
  //require('patch-hub'),

  require('ssb-chess'),
  require('patchbay-gatherings'),
  require('patchbay-book'),
  // require('patch-network),
  require('patch-settings'), // might need to be in patchbay
  require('patch-drafts'),
  patchbay,
  require('patchcore')
)

const api = entry(sockets, nest('app.html.app', 'first'))
const app = api.app.html.app

module.exports = patchbay

// for electro[n]
if (typeof window !== 'undefined') {
  document.body.appendChild(app())
}

