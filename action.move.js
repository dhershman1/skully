const _ = require('lodash')

const move = (creep, room) => {
  let target = []

  const roomObjects = ['spawns', 'extensions', 'towers']
  
  if (room.hostiles.length) {
    target = room.towers.filter(({ energy }) => energy < 250)
  } else {
    for (let i = 0; i < roomObjects.length; i++) {
      if (!target.length) {
        target = room[roomObjects[i]].filter(({ energy, energyCapacity }) => energy !== energyCapacity)
      } else {
        break
      }
    }
  }

  if (target.length) {
    if (creep.transfer(target[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
      creep.moveTo(target[0])
    }

    return 'store'
  }

  return false
}

module.exports = move
