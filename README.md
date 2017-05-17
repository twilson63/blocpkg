# BlocPkg

BlocPkg is the module you use to build create a blocpkg.

A blocpkg is a package of blocs of code. A bloc is:

* a single unit of executable code
* validates input
* has tests
* includes documentation
* returns bloc types for discovery

## Usage

    const blocpkg = require('blocpkg')
    module.exports = blocpkg({
      docs: fs.readFileSync('./README.md', 'utf-8'),
      blocs: {
        MYBLOC: {
          validate: payload => true,
          exec: payload => Promise.resolve({ text: 'OK'}),
          test: payload => true
        }
      }
    })

You can create your bloc then publish it on npm, lets say you call it blocpkg-mybloc

** using the blocpkg prefix will make sure your bloc is discoverable by other bloc users.

## Consumer

      const bus = require('nanobus')()
      const mybloc = require('blocpkg-mybloc')
      // no config
      const { blocs } = mybloc.register(null, bus)

      // ...
      const exec = require('bloc-promise')(bus)
      exec(blocs.MYBLOC, { hello: 'world' })
        .then(res => {
          if (res.ok) {
            console.log(res.text)
          }
        })

## Getting Started

...
