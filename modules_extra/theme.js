var h = require('hyperscript')
var pull = require('pull-stream')
var plugs = require('../plugs')
var cat = require('pull-cat')

var sbot_links2 = plugs.first(exports.sbot_links2 = [])
var avatar_name = plugs.first(exports.avatar_name = [])
var blob_url = require('../plugs').first(exports.blob_url = [])

var defaultTheme = {
  id: '&JFa42U6HtPm9k+s+AmpDIAoTJJI/PzoRC/J/WCfduDY=.sha256',
  name: 'patchbay-minimal.css'
}

var next = 'undefined' === typeof setImmediate ? setTimeout : setImmediate

if('undefined' !== typeof document)
  var link = document.head.appendChild(h('link', {rel: 'stylesheet'}))

var activeTheme

function useTheme(id) {
  activeTheme = id
  link.href = id ? blob_url(id) : ''
  var forms = [].slice.call(document.querySelectorAll('.themes__form'))
  forms.forEach(updateForm)

  var radios = [].slice.call(document.querySelectorAll('input[type=radio]'))
  radios.forEach(function (radio) {
    radio.checked = (radio.value === activeTheme)
  })
}

function useSavedTheme() {
  //enable setting "NONE" as your theme, and having that persist.
  useTheme(localStorage.themeId == null ? defaultTheme.id : localStorage.themeId)
}

next(useSavedTheme)

function themes() {
  return cat([
    pull.values([
      {
        id: '',
        name: 'none',
        feed: ''
      },
      defaultTheme,
    ]),
    pull(
      sbot_links2({
        query: [
          {$filter: {rel: ['mentions', {$prefix: 'patchbay-'}]}},
          {$filter: {dest: {$prefix: '&'}}},
          {$map: {id: 'dest', feed: 'source', name: ['rel', 1]}}
        ],
        live: true,
        sync: false,
      }),
      pull.filter(function (link) {
        return /\.css$/.test(link.name)
      })
    )
  ])
}

function onRadioClick(e) {
  if (this.checked) useTheme(this.value)
}

function updateForm(form) {
  var same = localStorage.themeId === activeTheme
  form.querySelector('.themes__id').value = activeTheme
  form.querySelector('.themes__reset').disabled = same
  form.querySelector('.themes__submit').disabled = same
  return form
}

function renderTheme(link) {
  return h('div.theme',
    h('input', {type: 'radio', name: 'theme',
      value: link.id, onclick: onRadioClick,
      checked: link.id === activeTheme
    }),
    link.id ? h('a', {href: '#'+link.id}, link.name) : link.name, ' ',
    link.feed ? h('a', {href: '#'+link.feed}, avatar_name(link.feed)) : ''
  )
}

function insertAfter(parentNode, newNode, referenceNode) {
  var nextSibling = referenceNode && referenceNode.nextSibling
  if (nextSibling) parentNode.insertBefore(newNode, nextSibling)
  else parentNode.appendChild(newNode)
}

function theme_view() {
  var themeInput
  var themesList = h('form.themes__list')
  var themesPerFeed = {/* feedid: {blobid||name: theme} */}

  pull(
    themes(),
    pull.drain(function (theme) {
      var map = themesPerFeed[theme.feed] || (themesPerFeed[theme.feed] = {})
      // replace old theme
      var prevByName = map[theme.name]
      var prevById = map[theme.id]
      theme.el = renderTheme(theme)
      map[theme.name] = theme
      map[theme.id] = theme
      if (prevById) {
        // remove theme which is having its id reused
        themesList.removeChild(prevById.el)
        // prevById.el.appendChild(document.createTextNode(' (renamed)'))
        if (prevById === prevByName) {
          prevByName = null
        }
      }
      if (prevByName) {
        // update theme
        if (prevByName.id === localStorage.themeId
         || prevByName.id === activeTheme) {
          // keep old version because the user is still using it
          prevByName.el.appendChild(document.createTextNode(' (old)'))
          insertAfter(themesList, theme.el, prevByName.el)
        } else {
          // replace old version
          themesList.replaceChild(theme.el, prevByName.el)
        }
      } else {
        // show new theme
        themesList.appendChild(theme.el)
      }
    }, function (err) {
      if (err) console.error(err)
    })
  )

  return h('div.column.scroll-y', h('div',
    updateForm(h('form.themes__form', {onsubmit: onsubmit, onreset: onreset},
      themeInput = h('input.themes__id', {placeholder: 'theme id',
        value: link.href}), ' ',
      h('input.themes__reset', {type: 'reset'}), ' ',
      h('input.themes__submit', {type: 'submit', value: 'Save'}))),
      themesList
  ))

  function onsubmit(e) {
    e.preventDefault()
    useTheme(localStorage.themeId = themeInput.value)
  }

  function onreset(e) {
    e.preventDefault()
    useSavedTheme()
  }
}

exports.menu_items = function () {
  return h('a', {href:'#/theme'}, '/theme')
}

exports.screen_view = function (path) {
  if(path === '/theme') return theme_view()
}
