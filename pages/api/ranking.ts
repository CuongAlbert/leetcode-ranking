import type { NextApiRequest, NextApiResponse } from "next";
import { usersData } from "@/public/constants";
export type contestRankingType = {
  userName: string;
  fullName: string;
  ranking: number[];
}[];
[];

function getContestNameData(data: { data: any }): string[] {
  const dataContestName = data.data.userContestRankingHistory.slice(438);
  return dataContestName.map(
    (d: { contest: { title: string } }) => d.contest.title
  );
}

function getRankingData(data: any): number[] {
  const dataRank = data.data.userContestRankingHistory.slice(438);
  return dataRank.map((d: { ranking: number }) => d.ranking);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // contest name
  const contestNameRes = await fetch(
    "https://leetcode.com/graphql?query=query%20userContestRankingInfo%28%24username%3A%20String%21%29%20%7B%0A%20%20userContestRanking%28username%3A%20%24username%29%7B%0AglobalRanking%0A%7D%0A%20%20userContestRankingHistory%28username%3A%20%24username%29%20%7B%0A%20%20%20%20contest%20%7B%0A%20%20%20%20%20%20title%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A&variables=%7B%22username%22%3A%22cinoss%22%7D&r=2"
  );
  const contestNameData = await contestNameRes.json();
  const contestName = getContestNameData(contestNameData);

  // contest ranking
  const contestRanking: contestRankingType = await Promise.all(
    usersData.map(async (u) => {
      const contestRankRes = await fetch(
        `https://leetcode.com/graphql?query=query%20userContestRankingInfo%28%24username%3A%20String%21%29%20%7B%0A%20%20userContestRanking%28username%3A%20%24username%29%7B%0AglobalRanking%0A%7D%0A%20%20userContestRankingHistory%28username%3A%20%24username%29%20%7B%0A%20%20%20%20ranking%0A%20%20%7D%0A%7D%0A&variables=%7B%22username%22%3A%22${u.userName}%22%7D&r=2`
      );
      const contestRankData = await contestRankRes.json();
      const contestRankKing = getRankingData(contestRankData);
      return {
        userName: u.userName,
        fullName: u.fullName,
        ranking: contestRankKing,
      };
    })
  );

  // merge contest name and user's ranking to array data
  let rankingTable: Record<string, number | string>[] = [];

  for (let i = 0; i < contestName.length; i++) {
    let rankingEl = { contest: contestName[i] };
    for (let j = 0; j < contestRanking.length; j++) {
      let user = contestRanking[j].userName;
      Object.assign(rankingEl, { [user]: contestRanking[j].ranking[i] });
    }
    rankingTable.push(rankingEl);
  }

  res.status(200).json(rankingTable.reverse());
}
