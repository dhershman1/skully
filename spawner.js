const roles = require('roles')

const generate = room => {
  let condition = 'peace'

  if (room.hostiles.length) {
    condition = 'war'
  }

  const types = roles[condition]

  for (const n in types) {
    const creeps = room.creeps.filter(creep => creep.memory.role === n)

    if (creeps.length < types[n].min) {
      const name = room.spawns[0].createCreep(types[n].body, null, types[n])

      
      if (name !== ERR_NOT_ENOUGH_ENERGY && name !== ERR_BUSY) {
        console.log('name', name)
        console.log(`Created ${name} with role ${n}`)
      }

      break
    }
  }
}

const clear = () => {
  for (const name in Memory.creeps) {
    if (!Game.creeps[name]) {
      delete Memory.creeps[name]
      console.log('Clearing out non-existing creep memory', name)
      
      return true
    }
  }

  return false
}

module.exports = {
  generate,
  clear
}
