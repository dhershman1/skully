const _ = require('lodash')

const repair = (creep, room) => {
  let targets = []

  if (creep.memory.minEnergy && creep.energy < creep.memory.minEnergy) {
    return false
  }

  if (room.hostiles.length) {
    targets = targets.concat(room.walls, room.ramparts)
  } else {
    targets = targets.concat(room.walls, room.ramparts, room.spawns, room.extensions, room.containers, room.links, room.roads)
  }


  if (targets.length) {
    const min = _.min(_.filter(targets, ({ structureType, hits, hitsMax }) =>
      structureType !== STRUCTURE_ROAD && hits < 4000 || hits !== hitsMax),
      ({ hits }) => hits)

    if (creep.repair(min) === ERR_NOT_IN_RANGE) {
      creep.moveTo(min)
    }
    return 'repair'
  }

  return false
}

module.exports = repair
