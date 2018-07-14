const _ = require('lodash')
const actions = require('action')

const getData = () => {
  const data = {
    rooms: {}
  };

  for (const room in Game.rooms) {
    const structures = Game.rooms[room].find(FIND_STRUCTURES)
    data.rooms[room] = {
      room: room,
      controller: _.first(_.filter(structures, (structure) => {
        return structure.structureType === STRUCTURE_CONTROLLER
      })),
      towers: _.filter(structures, (structure) => {
        return structure.structureType === STRUCTURE_TOWER
      }),
      walls: _.filter(structures, (structure) => {
        return structure.structureType === STRUCTURE_WALL
      }),
      ramparts: _.filter(structures, (structure) => {
        return structure.structureType === STRUCTURE_RAMPART
      }),
      containers: _.filter(structures, (structure) => {
        return structure.structureType === STRUCTURE_CONTAINER
      }),
      links: _.filter(structures, (structure) => {
        return structure.structureType === STRUCTURE_LINK
      }),
      spawns: _.filter(structures, (structure) => {
        return structure.structureType === STRUCTURE_SPAWN
      }),
      extensions: _.filter(structures, (structure) => {
        return structure.structureType === STRUCTURE_EXTENSION
      }),
      roads: _.filter(structures, (structure) => {
        return structure.structureType === STRUCTURE_ROAD
      }),
      sources: Game.rooms[room].find(FIND_SOURCES),
      dropped: Game.rooms[room].find(FIND_DROPPED_RESOURCES),
      creeps: Game.rooms[room].find(FIND_MY_CREEPS),
      hostiles: Game.rooms[room].find(FIND_HOSTILE_CREEPS),
      construction: Game.rooms[room].find(FIND_CONSTRUCTION_SITES)
    }
  }

  data.spawn = (Game.time % 10 === 0)
  data.clear = (Game.time % 20 === 0)


  return data
}

const harvestNearestResource = (creep, room) => {
  if (creep.memory.dropped) {
    if (room.dropped.length) {
      if (creep.pickup(room.dropped[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(room.dropped[0])
      }
      return
    }
  }
  if (creep.memory.container){
    const places = [].concat(room.links, room.containers)
    const containers = _.filter(places, (structure) => {
      if (structure.id === '47faaefee81d9d7') return false
      if (!isNaN(structure.energy)) return structure.energy > 0
      return _.sum(structure.store) > 0
    })
    const target = creep.pos.findClosestByRange(containers)
    if (target){
      if (creep.withdraw(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE){
        creep.moveTo(target)
      }
      return
    }
  }

  const source = _.filter(room.sources, (structure) => {
    if (creep.memory.resourceId && structure.id !== creep.memory.resourceId) return false;
    return structure._energy > 0
  })

  if (source.length) {
    if (creep.harvest(source[0]) === ERR_NOT_IN_RANGE) {
      creep.moveTo(source[0])
    }
  }
}

const actionRunner = (creep, room) => {
  const priority = creep.memory.actions

  for (let i = 0, len = priority.length; i < len; i++) {
    if (actions[priority[i]](creep, room)) {
      creep.memory.last = priority[i]
      return
    }
  }
}

const tower = room => {
  const locActions = ['heal', 'attack', 'repair']

  for (let i = 0, len = room.towers.length; i < len; i++) {
    const t = room.towers[i]
    t.memory = {
      actions: locActions,
      minEnergy: 250
    }
    if (room.hostiles.length || t.energy > 250) {
      actionRunner(t, room)
    }
  }
}

const panic = room => {
  const MIN_HEALTH = 5000
  const controller = room.controller

  if (room.hostiles.length && !controller.safeMode && controller.safeModeAvailable && !controller.safeModeCooldown){
    const walls = _.filter(room.walls, (structure) => {
      return structure.hits <= MIN_HEALTH
    })
    const ramparts = _.filter(room.ramparts, (structure) => {
      return structure.hits <= MIN_HEALTH
    });

    if (walls.length || ramparts.length) {
      controller.activateSafeMode()
    }
  }
}

const setAction = creep => {
  if (creep.memory.action && creep.carry.energy === 0 || creep.memory.role === 'attacker' || creep.memory.role === 'healer'){
    creep.memory.action = false
  }
  if (!creep.memory.action && creep.carry.energy === creep.carryCapacity){
    creep.memory.action = true
  }
}

const creepRole = (creep, room) => {
  setAction(creep)

  if (creep.memory.action) {
    actionRunner(creep, room)
  } else {
    harvestNearestResource(creep, room)
  }
}

const link = room => {
  const ID = '47faaefee81d9d7'
  const main = Game.getObjectById(ID)

  if (main.energy > 0 && main.cooldown === 0) {

    const targets = _.filter(room.links, (structure) => {
      if (structure.id === ID) return false
      if (structure.energy === structure.energyCapacity) return false
      return true
    });

    if (targets.length){
      const min = _.min(targets, (link) => {
        return link.energy
      });
      main.transferEnergy(min)
    }
  }
}

module.exports = {
  getData,
  setAction,
  harvestNearestResource,
  actionRunner,
  tower,
  panic,
  creepRole,
  link
}
