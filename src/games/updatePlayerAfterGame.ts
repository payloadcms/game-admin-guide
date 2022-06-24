import { Payload } from 'payload'
import { getPlayerAchievements } from './getPlayerAchievements'
import { Achievement, Player } from '../payload-types'

/**
 *  Assign experience amounts for player outcomes
 */
const exp = {
  winner: 500,
  played: 100,
  playerScore: 10,
  teamScore: 5,
}

/**
 * Update players with accumulated stats and achievements based on game outcomes
 */
export const updatePlayerAfterGame = (payload: Payload, achievements: Achievement[], player: Player, teamPlayer: Partial<{score: number, player: string}>, team: Partial<{ score: number, id: string}>, winners: string) => {
  const experience = player.stats.experience
    + (winners === team.id ? exp.winner : 0)
    + (team.score * exp.teamScore)
    + (teamPlayer.score * exp.playerScore)
    + exp.played

  const stats = {
    experience,
    played: player.stats.played + 1,
    wins: (winners === team.id ? 1 : 0) + player.stats.wins,
    losses: (winners === team.id ? 0 : 1) + player.stats.losses,
  }

  // update player collection
  const ignoreResult = payload.update({
    collection: 'players',
    id: player.id,
    data: {
      achievements: getPlayerAchievements(stats, achievements),
      stats,
    },
  })
}
