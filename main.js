const spawner = require('spawner')
const lib = require('lib')

module.exports.loop = () => {
  const data = lib.getData()

  if (data.clear) {
    spawner.clear()
  }

  for (const room in data.rooms) {
    const r = data.rooms[room]

    if (data.spawn) {
      spawner.generate(r)
    }

    for (const name in r.reeps) {
      const creep = r.creeps[name]

      if (creep.fatigue === 0) {
        lib.creepRole(creep, r)
      }
    }

    lib.panic(r)
    lib.tower(r)
    lib.link(r)
  }
}
