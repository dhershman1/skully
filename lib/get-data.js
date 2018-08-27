const _ = require('lodash')

const getData = () => {
  const rooms = Object.keys(Game.rooms)
  const data = {
    rooms: {}
  };

  rooms.forEach(r => {
    const currRoom = Game.rooms[r]
    const structures = currRoom.find(FIND_STRUCTURES)

    const filterBy = type => structures.filter(({ structureType }) => structureType === type)

    data.rooms[r] = {
      room: r,
      controller: _.first(filterBy(STRUCTURE_CONTROLLER)),
      towers: filterBy(STRUCTURE_TOWER),
      walls: filterBy(STRUCTURE_WALL),
      ramparts: filterBy(STRUCTURE_RAMPART),
      containers: filterBy(STRUCTURE_CONTAINER),
      linked: filterBy(STRUCTURE_LINK),
      spawns: filterBy(STRUCTURE_SPAWN),
      extensions: filterBy(STRUCTURE_EXTENSION),
      roads: filterBy(STRUCTURE_ROAD),
      sources: currRoom.find(FIND_SOURCES),
      dropped: currRoom.find(FIND_DROPPED_RESOURCES),
      creeps: currRoom.find(FIND_MY_CREEPS),
      hostiles: currRoom.find(FIND_HOSTILE_CREEPS),
      construction: currRoom.find(FIND_CONSTRUCTION_SITES)
    }
  })

  data.spawn = (Game.time % 10 === 0)
  data.clear = (Game.time % 20 === 0)


  return data
}

module.exports = getData
