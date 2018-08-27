const checker = (creep, task, src) => {
  const run = creep[task](src.data, src.res)

  if (run === ERR_NOT_IN_RANGE) {
    creep.moveTo(src.data)
  }
}

const harvest = (creep, room) => {
  if (creep.memory.dropped && room.dropped.length) {
    return checker(creep, 'pickup', { data: room.dropped[0], res: RESOURCE_ENERGY })
  }

  if (creep.memory.container) {
    const places = [].concat(room.links, room.containers)
    const containers = places.filter(({ id, energy, store }) => {
      if (id === '47faaefee81d9d7') {
        return false
      }

      if (!isNaN(energy)) {
        return energy > 0
      }

      return store.reduce((total, v) => total + v, 0) > 0
    })
    const target = creep.pos.findClosestByRange(containers)

    if (target) {
      return checker(creep, 'withdraw', { data: target, res: RESOURCE_ENERGY })
    }
  }

  const source = room.sources.filter(({ id, _energy }) => {
    if (creep.memory.resourceId && id !== creep.memory.resourceId) {
      return false
    }

    return _energy > 0
  })

  if (source.length) {
    return checker(creep, 'harvest', { data: source[0] })
  }
}

module.exports = harvest
