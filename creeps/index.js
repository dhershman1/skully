const roles = require('./roles')

const generate = room => {
  const condition = room.hostiles.length ? 'war' : 'peace'
  const types = roles[condition]

  const found = Object.keys(types).find(n => {
    const creeps = room.creeps.filter(({ memory }) => memory.role === n)

    return creeps.length < types[n].min
  })

  if (found) {
    const name = room.spawns[0].createCreep(types[found].body, null, types[found])

    if (name !== ERR_NOT_ENOUGH_ENERGY && name !== ERR_BUSY) {
      console.log(`Created ${name} with role ${n}`)
    }
  }
}

const clear = () => {
  const memNames = Object.keys(Memory.creeps)
  const gameNames = Object.keys(Game.creeps)


  Memory.creeps = memNames.filter(n => gameNames.includes(n))
}

module.exports = {
  clear,
  generate
}
