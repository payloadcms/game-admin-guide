import { AfterChangeHook } from 'payload/dist/collections/config/types'
import { PayloadRequest } from 'payload/dist/express/types'
import { Game, Player } from '../payload-types'
import { getWinningTeamID } from './getWinningTeamID'
import { fetchAchievements } from '../achievements/fetchAchievements'
import { fetchPlayers } from '../players/fetchPlayers'
import { updatePlayerAfterGame } from './updatePlayerAfterGame'

type Args = {
  doc: Game
  req: PayloadRequest
}

export const gamesAfterChangeHook: AfterChangeHook = async ({ doc, req }: Args) => {
  const achievements = fetchAchievements(req.payload)
  const playerData: { [id: string]: Player } = {}
  const playerIDs: string[] = doc.teams.flatMap((team) => team.players).map((player) => (player.player as string))
  const players = await fetchPlayers(req.payload, playerIDs)
  const winners = getWinningTeamID(doc.teams)

  // structure the player data by id to reduce looping
  for (let player of players) {
    playerData[player.id] = player
  }

  // loop over each team their players
  doc.teams.forEach((team) => {
    team.players.forEach(async (teamPlayer: { player: string, score: number }) => {
      const player = playerData[teamPlayer.player as string]
      updatePlayerAfterGame(req.payload, await achievements, player, teamPlayer, team, winners);
    })
  })
}
