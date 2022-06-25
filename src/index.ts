/*eslint no-console: 0*/
import { Context } from 'aws-lambda'

export interface LogConstruction {
  requestId?: string
  context?: Context
}
export type LogLevel = 'debug' | 'info' | 'warn' | 'error'

class Log<T> {
  private _requestId: string | undefined = undefined
  private _tags: string[] = []

  /**
   *
   * @param { requestId?: string, context?: Context } p requestId and context are optional, but if you want to capture the request ID (or use your own), you should pass them.  If you want to use AWS's requestId pass in the context, if you want to use your own requestId pass in 'requestId'
   */
  constructor({ requestId, context }: LogConstruction = {}) {
    this._requestId = requestId ?? context?.awsRequestId ?? undefined
    return this
  }
  /**
   * retrieve the request ID (typically AWS's requestId or your own requestId)
   */
  public get requestId(): string | undefined {
    return this._requestId
  }
  /**
   * set the request ID (typically AWS's requestId or your own requestId)
   * @param {string} id - the request ID
   */
  public set requestId(id: string | undefined) {
    this._requestId = id
  }
  /**
   * retrieve the list of tags in the current log messages
   */
  public get tags(): string[] {
    return this._tags
  }
  /**
   * set the request id
   * @param id - the id of the request
   * @returns this - for chaining
   */
  public setRequestId(id: string) {
    this._requestId = id
    return this
  }
  /**
   * add a tag message to the current log messages
   * @param tag - the tag to add to the current log messages
   * @returns this - for chaining
   */
  public addTag(tag: string) {
    this._tags.push(tag)
    return this
  }
  /**
   * removes the tag
   * @param tag - the tag to remove
   * @returns this - for chaining
   */
  public removeTag(tag: string) {
    this._tags = this._tags.filter((t) => t !== tag)
    return this
  }
  /**
   * cut the log message
   * @param level - the level of the message
   * @param message - the message to log
   * @param data - the data to log (object defined by the user)(typescript available via generic)
   * @returns this - for chaining
   */
  protected cut(level: LogLevel, message: string, data?: T) {
    return JSON.stringify({
      level,
      ...{ requestId: this.requestId },
      message,
      ...data,
      tags: this._tags.length > 0 ? this._tags : undefined
    })
  }
  /**
   * provides the actual console call to use for lambda
   * @param level - the level of the message
   * @returns this - for chaining
   */
  private blade(level: LogLevel) {
    switch (level) {
      case 'info':
        return console.info
      case 'debug':
        return console.debug
      case 'warn':
        return console.warn
      case 'error':
        return console.error
    }
  }
  /**
   * log a message with data and tags for lambda
   * @param level - the level of the message
   * @param message - the message to log
   * @param data - the data to log (object defined by the user)(typescript available via generic)
   * @returns this - for chaining
   */
  public log(level: LogLevel, message: string, data?: T) {
    this.blade(level)(this.cut(level, message, data))
    return this
  }
  /**
   * log an INFO message with data and tags for lambda
   * @param message - the message to log
   * @param data - the data to log (object defined by the user)(typescript available via generic)
   * @returns this - for chaining
   */
  public info(message: string, data?: T) {
    return this.log('info', message, data)
  }
  /**
   * log a DEBUG message with data and tags for lambda
   * @param message - the message to log
   * @param data - the data to log (object defined by the user)(typescript available via generic)
   * @returns this - for chaining
   */
  public debug(message: string, data?: T) {
    return this.log('debug', message, data)
  }
  /**
   * log a WARN message with data and tags for lambda
   * @param message - the message to log
   * @param data - the data to log (object defined by the user)(typescript available via generic)
   * @returns this - for chaining
   */
  public warn(message: string, data?: T) {
    return this.log('warn', message, data)
  }
  /**
   * log a ERROR message with data and tags for lambda
   * @param message - the message to log
   * @param data - the data to log (object defined by the user)(typescript available via generic)
   * @returns this - for chaining
   */
  public error(message: string, data?: T) {
    return this.log('error', message, data)
  }
}

export default Log
