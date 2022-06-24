import { Player } from '../payload-types'
import { Payload } from 'payload'

/**
 * Get player documents
 */
export const fetchPlayers = async (payload: Payload, playerIDs: string[]): Promise<Player[]> => {
  const result = await payload.find({
    collection: 'players',
    depth: 0,
    pagination: false,
    where: {
      id: {
        in: playerIDs,
      },
    },
  })
  return result.docs;
}
