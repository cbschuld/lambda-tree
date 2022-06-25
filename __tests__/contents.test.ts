import Log from '../src/index'

describe('test setter/getter components', () => {
  test('requestId should be undefined by default', () => {
    const log = new Log()
    expect(log.requestId).toBeUndefined()
  })
  test('requestId set and get', () => {
    const log = new Log()
    log.requestId = 'ARequestId'
    expect(log.requestId).toBe('ARequestId')
  })
  test('requestId should be able to reset', () => {
    const log = new Log()
    log.requestId = 'ARequestId'
    log.requestId = undefined
    expect(log.requestId).toBeUndefined()
  })
})

describe('tags', () => {
  test('add tag', () => {
    const log = new Log()
    log.addTag('tag1')
    expect(log.tags).toEqual(['tag1'])
  })
  test('add multiple tags', () => {
    const log = new Log()
    log.addTag('tag1')
    log.addTag('tag2')
    log.addTag('tag3')
    expect(log.tags).toEqual(['tag1', 'tag2', 'tag3'])
  })
  test('remove tags', () => {
    const log = new Log()
    log.addTag('tag1')
    log.addTag('tag2')
    log.addTag('tag3')
    log.removeTag('tag2')
    expect(log.tags).toEqual(['tag1', 'tag3'])
  })
})
