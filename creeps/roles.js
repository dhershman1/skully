const peace = {
  harvester: {
    min: 1,
    body: [WORK, CARRY, MOVE],
    actions: ['harvest', 'transfer', 'repair'],
    container: false,
    role: 'harvester',
    resourceIds: []
  },
  upgrader: {
    min: 2,
    body: [WORK, CARRY, MOVE],
    actions: ['upgrade'],
    priority: [],
    container: true,
    role: 'upgrader'
  },
  builder: {
    min: 2,
    body: [WORK, CARRY, CARRY, MOVE],
    actions: ['build', 'repair', 'upgrade'],
    priority: [],
    container: true,
    role: 'builder'
  },
  scavenger: {
    min: 1,
    body: [CARRY, CARRY, MOVE],
    actions: ['move'],
    priority: [],
    container: true,
    dropped: true,
    role: 'scavenger'
  }
}

const war = {
  harvester: {
    min: 1,
    body: [WORK, CARRY, MOVE],
    actions: ['transfer', 'build', 'repair', 'upgrade'],
    container: false,
    role: 'harvester'
  },
  mover: {
    min: 1,
    body: [CARRY, CARRY, MOVE, MOVE],
    actions: ['move'],
    priority: [],
    container: true,
    role: 'mover'
  },
  attacker: {
    min: 3,
    body: [ATTACK, ATTACK, TOUGH, TOUGH, TOUGH, MOVE, MOVE],
    actions: ['attack'],
    priority: [],
    container: true,
    role: 'attacker'
  },
  healer: {
    min: 2,
    body: [HEAL, HEAL, MOVE, MOVE],
    actions: ['heal'],
    priority: [],
    container: true,
    role: 'healer'
  }
}

module.exports = {
  peace,
  war
}
