const actions = {
  attack: require('./attack'),
  build: require('./build'),
  harvest: require('./harvest'),
  heal: require('./heal'),
  move: require('./move'),
  repair: require('./repair'),
  transfer: require('./transfer'),
  upgrade: require('./upgrade')
}

const runner = (creep, room) => {
  creep.memory.last = creep.memory.actions.find(p => actions[p](creep, room))
}

const setAct = ({ memory, carry, carryCapacity }) => {
  const roleExclude = memory.role === 'attacker' || memory.role === 'healer'
  const noAct = memory.action && !carry.energy || roleExclude
  const act = !memory.action && carry.energy === carryCapacity

  memory.action = noAct || act
}

const tower = room => {
  const locActions = ['heal', 'attack', 'repair']

  room.towers.forEach(t => {
    const tow = Object.assign({}, t)

    tow.memory = {
      actions: locActions,
      minEnergy: 250
    }

    if (room.hostiles.length || tow.energy > 250) {
      runner(tow, room)
    }
  })
}

module.exports = {
  runner,
  setAct,
  tower
}
