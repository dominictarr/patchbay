const fs = require('fs')
const h = require('../../h')
const ref = require('ssb-ref')

exports.needs = {
  helpers: { blob_url: 'first' }
}

exports.gives = {
  page: true,
  mcss: true
}

exports.create = (api) => {
  return {
    page,
    mcss: () => fs.readFileSync(__filename.replace(/js$/, 'mcss'), 'utf8')
  }

  function page (path) {
    if(!ref.isBlob(path)) return 
    
    return h('Blob', { id: path, title: path.slice(0, 9) + '...' }, [
      h('iframe', {
        src: api.helpers.blob_url(path),
        sandbox: ''
      })
    ])
  }
}

