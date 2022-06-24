import { buildConfig } from 'payload/config';
import path from 'path';
import { admins } from './admins/admins.collection'
import { players } from './players/players.collection'
import { games } from './games/games.collection'
import { achievements } from './achievements/achievement.collection'
import { images } from './images/images.collection'
import { purchases } from './purchases/purchases.collection'
import { playerPurchases } from './players/purchases/playerPurchases.collection'

export default buildConfig({
  admin: {
    user: admins.slug,
  },
  collections: [
    admins,
    players,
    games,
    achievements,
    purchases,
    playerPurchases,
    images,
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts')
  },
});
