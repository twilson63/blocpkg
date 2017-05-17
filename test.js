const test = require('tape')

const bus = require('nanobus')()

const blocpkg = require('./')

const { register } = blocpkg({
  docs: `
# Hello World Block

A block that waits a half second then returns hello world

`,
  blocs: {
    HELLO: {
      validate() {
        return true
      },
      exec() {
        return Promise.resolve({ hello: 'world' })
      },
      test() {
        return true
      }
    }
  }
})

test('successfully create a blocpkg', t => {
  const { blocs, docs } = register(null, bus)
  t.equals('HELLO', blocs.HELLO)

  bus.on('WORLD', msg => {
    t.equals('world', msg.hello)
    t.end()
  })

  bus.emit(blocs.HELLO, { target: 'WORLD' })
})
