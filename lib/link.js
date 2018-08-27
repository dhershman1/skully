const _ = require('lodash')

const link = room => {
  const ID = '47faaefee81d9d7'
  const main = Game.getObjectById(ID)

  if (main.energy > 0 && main.cooldown === 0) {

    const targets = _.filter(room.links, ({ id, energy, energyCapacity }) =>
      id !== ID || energy !== energyCapacity)

    if (targets.length) {
      main.transferEnergy(_.min(targets, ({ energy }) => energy))
    }
  }
}

module.exports = link
