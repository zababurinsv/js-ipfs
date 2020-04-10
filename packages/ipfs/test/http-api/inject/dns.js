/* eslint-env mocha */
'use strict'

const { expect } = require('interface-ipfs-core/src/utils/mocha')
const testHttpMethod = require('../../utils/test-http-method')

module.exports = (http) => {
  describe('/dns', () => {
    let api

    before(() => {
      api = http.api._httpApi._apiServers[0]
    })

    it('only accepts POST', () => {
      return testHttpMethod('/api/v0/dns?arg=ipfs.io')
    })

    it('resolve ipfs.io DNS', async () => {
      const res = await api.inject({
        method: 'POST',
        url: '/api/v0/dns?arg=ipfs.io'
      })

      expect(res.result).to.have.property('Path')
    })

    it('resolve ipfs.enstest.eth ENS', async function () {
      const res = await api.inject({
        method: 'POST',
        url: '/api/v0/dns?arg=ipfs.enstest.eth'
      })

      // TODO: eth.link domains have no SLA yet and are liable to be down...
      // Remove skip when reliable!
      if (res.statusCode === 500) {
        return this.skip()
      }

      expect(res.result).to.have.property('Path')
    })
  })
}
