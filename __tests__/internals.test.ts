/* eslint-disable @typescript-eslint/no-explicit-any */
import Log from '../src/index'

describe('test internals', () => {
  describe('blade tests', () => {
    test('info', () => {
      const bladeSpy = jest.spyOn(Log.prototype as any, 'blade')
      const getBladeImplementation = bladeSpy.getMockImplementation()
      expect(getBladeImplementation).toBeDefined()
      if (getBladeImplementation) {
        expect(getBladeImplementation('info')).toBe(console.info)
      }
      bladeSpy.mockClear()
    })
    test('warn', () => {
      const bladeSpy = jest.spyOn(Log.prototype as any, 'blade')
      const getBladeImplementation = bladeSpy.getMockImplementation()
      expect(getBladeImplementation).toBeDefined()
      if (getBladeImplementation) {
        expect(getBladeImplementation('warn')).toBe(console.warn)
      }
      bladeSpy.mockClear()
    })
    test('debug', () => {
      const bladeSpy = jest.spyOn(Log.prototype as any, 'blade')
      const getBladeImplementation = bladeSpy.getMockImplementation()
      expect(getBladeImplementation).toBeDefined()
      if (getBladeImplementation) {
        expect(getBladeImplementation('debug')).toBe(console.debug)
      }
      bladeSpy.mockClear()
    })
    test('error', () => {
      const bladeSpy = jest.spyOn(Log.prototype as any, 'blade')
      const getBladeImplementation = bladeSpy.getMockImplementation()
      expect(getBladeImplementation).toBeDefined()
      if (getBladeImplementation) {
        expect(getBladeImplementation('error')).toBe(console.error)
      }
      bladeSpy.mockClear()
    })
  })
})
