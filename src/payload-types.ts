/* tslint:disable */
/**
 * This file was automatically generated by Payload CMS.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "admins".
 */
export interface Admin {
  id: string;
  email?: string;
  resetPasswordToken?: string;
  resetPasswordExpiration?: string;
  enableAPIKey?: boolean;
  apiKey?: string;
  apiKeyIndex?: string;
  loginAttempts?: number;
  lockUntil?: string;
  createdAt: string;
  updatedAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "players".
 */
export interface Player {
  id: string;
  email?: string;
  resetPasswordToken?: string;
  resetPasswordExpiration?: string;
  loginAttempts?: number;
  lockUntil?: string;
  handle: string;
  name: string;
  banned?: boolean;
  customer?: string;
  achievements?: (string | Achievement)[];
  stats?: {
    experience: number;
    played: number;
    wins: number;
    losses: number;
  };
  createdAt: string;
  updatedAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "achievements".
 */
export interface Achievement {
  id: string;
  name: string;
  image?: string | Image;
  description?: string;
  type: 'experience' | 'played' | 'wins' | 'losses';
  amount?: number;
  createdAt: string;
  updatedAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "images".
 */
export interface Image {
  id: string;
  url?: string;
  filename?: string;
  mimeType?: string;
  filesize?: number;
  width?: number;
  height?: number;
  sizes?: {
    mobile?: {
      url?: string;
      width?: number;
      height?: number;
      mimeType?: string;
      filesize?: number;
      filename?: string;
    };
  };
  createdAt: string;
  updatedAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "games".
 */
export interface Game {
  id: string;
  teams: {
    score: number;
    players?: {
      player: string | Player;
      score: number;
      id?: string;
    }[];
    id?: string;
  }[];
  createdAt: string;
  updatedAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "purchases".
 */
export interface Purchasable {
  id: string;
  name: string;
  description?: string;
  image?: string | Image;
  price: number;
  gameItem: string;
  createdAt: string;
  updatedAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "player-purchases".
 */
export interface PlayerPurchase {
  id: string;
  purchase: string | Purchasable;
  players: string | Player;
  price?: number;
  charge?: string;
  createdAt: string;
  updatedAt: string;
}
