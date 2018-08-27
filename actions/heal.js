const heal = (creep, room) => {
  const target = room.creeps.filter(creep => creep.hits < 200)

  if (target.length) {
    if (creep.heal(target[0]) === ERR_NOT_IN_RANGE) {
      creep.moveTo(target[0])
    }
    return 'heal'
  }
  return false
}

module.exports = heal
