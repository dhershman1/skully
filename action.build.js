const build = (creep, room) => {
  const target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);

  if (target && creep.build(target) === ERR_NOT_IN_RANGE) {
    creep.moveTo(target)

    return 'build'
  }

  return false
}

module.exports = build
