module.exports = blocpkg => {
  return Object.freeze({
    register(config, bus) {
      mapObj(createListener(config, bus), blocpkg.blocs)
      return { blocs: Object.keys(blocpkg.blocs), docs: blockpkg.docs }
    }
  })
}

function createListener(config, bus) {
  return function(bloc, blockType) {
    bus.on(blockType, payload => {
      const { target, ...rest } = payload
      if (bloc.validate(rest)) {
        bloc
          .exec(config, rest)
          .then(res => bus.emit(target, { ...res, ok: true }))
          .catch(err => bus.emit(target, { ...err, ok: false }))
      }
    })
  }
}

function mapObj(fn, o) {
  return Object.keys(o).map(key => fn(o[key], key))
}
