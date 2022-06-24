/**
 * Get the winning team ID for assigning experience
 */
export const getWinningTeamID = (teams: Partial<{score: number, id: string}>[]): string | undefined => {
  if (teams[0].score > teams[1].score) {
    return teams[0].id
  } else if (teams[0].score < teams[1].score) {
    return teams[1].id
  }
}
