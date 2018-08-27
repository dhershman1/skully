const getData = require('./lib/get-data')
const panic = require('./lib/panic')
const link = require('./lib/link')
const { runner, setAct, tower } = require('./actions')
const { generate, clear } = require('./creeps')

module.exports.loop = () => {
  const data = getData()
  const rooms = Object.keys(data.rooms)

  if (data.clear) {
    clear()
  }

  rooms.forEach(room => {
    const r = data.rooms[room]
    const creeps = Object.keys(r.creeps)

    if (data.spawn) {
      generate(r)
    }

    creeps.forEach(name => {
      const c = r.creeps[name]

      if (!c.fatigue) {
        setAct(c)

        runner(c, r)
      }
    })

    panic(r)
    tower(r)
    link(r)
  })
}
