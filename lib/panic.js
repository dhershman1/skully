const panic = room => {
  const minHealth = 5000
  const controller = room.controller
  const safeReady = !controller.safeMode && controller.safeModeAvailable && !controller.safeModeCooldown
  const filterHits = data => data.filter(({ hits }) => hits <= minHealth)
  const lowHp = filterHits(room.walls).length || filterHits(room.ramparts).length

  if (room.hostiles.length && safeReady && lowHp) {
    controller.activateSafeMode()
  }
}

module.exports = panic
