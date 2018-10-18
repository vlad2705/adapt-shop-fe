import * as selectors from './config'

describe('config selectors', () => {
  it('can select state', () => {
    expect(selectors.getConfig({ config: 'foo' })).toEqual('foo')
  })
})
