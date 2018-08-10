const nest = require('depnest')
const extend = require('xtend')
const { isFeed } = require('ssb-ref')

exports.gives = nest('message.html.render')

exports.needs = nest({
  'about.html.link': 'first',
  'message.html': {
    decorate: 'reduce',
    layout: 'first'
  }
})

exports.create = function (api) {
  return nest('message.html.render', follow)

  function follow (msg, opts) {
    const { type, contact, following, blocking } = msg.value.content
    if (type !== 'contact') return
    if (!isFeed(contact)) return

    const element = api.message.html.layout(msg, extend({
      content: renderContent({ contact, following, blocking }),
      layout: 'mini'
    }, opts))

    return api.message.html.decorate(element, { msg })
  }

  function renderContent ({ contact, following, blocking }) {
    const name = api.about.html.link(contact)

    if (blocking !== undefined) {
      return [
        blocking ? 'blocked ' : 'unblocked ',
        name
      ]
    }
    if (following !== undefined) {
      return [
        following ? 'followed ' : 'unfollowed ',
        name
      ]
    }
  }
}
