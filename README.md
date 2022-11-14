# Lambda Tree - a place for logs 🌳🪵

A lightweight library designed to make AWS Lambda logs easier and well formed. Kill sloppy logs by using lambda-tree.

## Motivation

Lambda debug can cause you to use more `console.log` calls than you want to admit. Admit it!! Eventually the logging gets messy. This library will help produce logs which are just easier to manage long term.

## Installation

The recommended way to install the anticipated.io SDK is through `npm` or `Yarn`. The library is exposed as CommonJS and ESM.

npm:

```sh
npm install lambda-tree
```

yarn:

```sh
yarn add lambda-tree
```

## Usage

The entire point of `lambda-tree` is simplicity with the goal of producing well-formed logs in JSON to AWS CloudWatch.

#### Example Usage:

```js
const log = new Log({ context })
log.info({ message: 'a simple log message' })
log.error({ error: 'oh no, bad' })
```

#### TypeScript example:

```typescript
interface LogInfo {
  user: string
  company: string
  operation: string
}

const log = new Log<LogInfo>({ context })
log.info({ message: 'customer enabled', user, company, operation })
```

## Output

Example output might be as follows:

```json
{ "level": "info", "requestId": "123", "message": "user enabled", "name": "John", "age": 30, "phone": "1234567890" }
```

Which was produced via:

```typescript
interface UserInfo {
  name: string
  age: number
  phone: string
}

const log = new Log<UserInfo>({ context })
const user: UserInfo = { name: 'John', age: 30, phone: '1234567890' }
log.info({ message: 'user enabled', user })
```

## Tagging

There is also a built-in system for tagging log entries. Methods `addTag` and `removeTag` are provided. A simple tagging might look like this:

```js
const log = new Log({ context }).addTag('user')
const user = { username: 'bob' }
log.info({ message: 'user added', user })
```

would produce the following:

```json
{ "level": "info", "requestId": "123", "message": "user added", "username": "bob", "tags": ["user"] }
```

## Tests

Tests are executed via Jest.

```shell script
npm run test
```
