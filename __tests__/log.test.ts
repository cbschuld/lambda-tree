/* eslint-disable @typescript-eslint/no-empty-function */
import Log from '../src/index'

describe('logging (using logger)', () => {
  const log = new Log()
  test('info test', () => {
    const consoleSpy = jest.spyOn(console, 'info').mockImplementation(() => {})
    log.info('info message')
    expect(consoleSpy).toHaveBeenCalledWith('{"level":"info","message":"info message"}')
    consoleSpy.mockClear()
  })
  test('warn test', () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
    log.warn('warn message')
    expect(consoleSpy).toHaveBeenCalledWith('{"level":"warn","message":"warn message"}')
    consoleSpy.mockClear()
  })
  test('error test', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    log.error('error message')
    expect(consoleSpy).toHaveBeenCalledWith('{"level":"error","message":"error message"}')
    consoleSpy.mockClear()
  })
  test('debug test', () => {
    const consoleSpy = jest.spyOn(console, 'debug').mockImplementation(() => {})
    log.debug('debug message')
    expect(consoleSpy).toHaveBeenCalledWith('{"level":"debug","message":"debug message"}')
    consoleSpy.mockClear()
  })
})
