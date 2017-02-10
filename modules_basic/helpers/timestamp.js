const fs = require('fs')
const h = require('../../h')
const human = require('human-time')

exports.gives = {
  helpers: { timestamp: true }
}

exports.create = function () {
  setInterval(function () {
    var els = [].slice.call(document.querySelectorAll('.Timestamp'))
    els.forEach(updateTimestampEl)
  }, 60e3)

  return {
    helpers: { timestamp }
  }

  function updateTimestampEl (el) {
    var timestamp = Number(el.getAttribute('data-timestamp'))
    var display = human(new Date(timestamp)).replace(/minutes/, 'mins')
    el.querySelector('a').firstChild.nodeValue = display
    return el
  }

  function timestamp (msg) {
    var { key, value } = msg
    var { timestamp } = value
    var el = h('Timestamp', {
      attributes: {
        'data-timestamp': timestamp
      }
    }, [
      h('a', {
        href: `#${key}`,
        title: new Date(timestamp)
      }, '')
    ])
    updateTimestampEl(el)
    return el
  }
}
