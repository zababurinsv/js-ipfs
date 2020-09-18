'use strict'

const configure = require('../lib/configure')
const toUrlSearchParams = require('../lib/to-url-search-params')
const toCamel = require('../../lib/object-to-camel')

module.exports = configure(api => {
  return async (path, options = {}) => {
    const res = await api.post('pin/remote/ls', {
      timeout: options.timeout,
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: path,
        ...options
      }),
      headers: options.headers
    })
    const pins = await res.json()
    return pins.map(toCamel)
  }
})
