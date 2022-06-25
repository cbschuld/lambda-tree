import Log, { LogLevel } from '../src/index'

class LogTest<T> extends Log<T> {
  public cutter(level: LogLevel, message: string, data?: T) {
    return this.cut(level, message, data)
  }
}

interface TestData {
  name: string
  age: number
  phone: string
}

describe('output', () => {
  test('simple message', () => {
    const log = new LogTest()
    log.requestId = 'ARequestId'
    expect(JSON.parse(log.cutter('info', 'a message'))).toMatchObject({
      level: 'info',
      requestId: 'ARequestId',
      message: 'a message'
    })
  })
  test('chained instantiation with message with a tag', () => {
    const log = new LogTest().addTag('tag1').setRequestId('ARequestId')
    expect(JSON.parse(log.cutter('info', 'a message'))).toMatchObject({
      level: 'info',
      requestId: 'ARequestId',
      message: 'a message'
    })
  })
  test('message with data', () => {
    const log = new LogTest<TestData>()
    const td: TestData = {
      name: 'John',
      age: 30,
      phone: '1234567890'
    }
    log.requestId = 'ARequestId'
    log.info('a message', td)
    expect(JSON.parse(log.cutter('info', 'a message', td))).toMatchObject({
      level: 'info',
      requestId: 'ARequestId',
      message: 'a message',
      ...td
    })
  })
})
