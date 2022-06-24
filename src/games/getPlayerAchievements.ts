import { Achievement } from '../payload-types'

/**
 * get player achievements based on experience, wins and losses
 */
export const getPlayerAchievements = (playerStats: {[key: string]: number}, achievements: Achievement[]) => {
  const playerAchievements = []
  achievements.forEach((achievement) => {
    if (playerStats[achievement.type] >= achievement.amount) {
      playerAchievements.push(achievement.id)
    }
  })
  return playerAchievements
}
