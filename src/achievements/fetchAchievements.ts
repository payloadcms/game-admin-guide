import { Payload } from 'payload'
import { Achievement } from '../payload-types'

export const fetchAchievements = async (payload: Payload): Promise<Achievement[]> => {
  const result = await payload.find({
    collection: 'achievements',
    pagination: false,
    where: {
      type: {
        in: ['experience', 'played', 'wins', 'losses']
      },
    },
  })
  return result.docs
}
