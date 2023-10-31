import type { NextApiRequest, NextApiResponse } from "next";

import { usersData } from "@/public/constants";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const contestRanking = await Promise.all(
    usersData.map(async (u) => {
      const contestRankRes = await fetch(
        `https://leetcode.com/graphql?query=query%20userContestRankingInfo%20%7B%0A%20%20userContestRanking%28username%3A%20%22${u.userName}%22%29%20%7B%0A%20%20%20%20globalRanking%0A%20%20%7D%0A%7D`
      );
      const contestRankData = await contestRankRes.json();
      return {
        userName: u.userName,
        fullName: u.fullName,
        "global ranking": contestRankData.data.userContestRanking.globalRanking,
      };
    })
  );
  res
    .status(200)
    .json(
      contestRanking.sort((a, b) => a["global ranking"] - b["global ranking"])
    );
}
