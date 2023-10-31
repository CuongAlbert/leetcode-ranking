import Header from "@/components/Header";
import HomeContent from "@/components/HomeContent";
import Sidebar from "@/components/Sidebar";
// import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { RequestInfo } from "undici-types";
import useSWR from "swr";
import { useState } from "react";
import { contestRankingType } from "./api/ranking";

export type globalRankingType = {
  userName: string;
  fullName: string;
  "global ranking": number;
}[];

const fetcher = (url: RequestInfo) => fetch(url).then((r) => r.json());

//  const getServerSideProps = (async () => {
//   const res = await fetch("http://localhost:3000/api/globalRanking");
//   const globalRankingData: globalRanking = await res.json();
//   return { props: { globalRankingData } };
// }) satisfies GetServerSideProps<{
//   globalRankingData: globalRanking;
// }>;

export default function Home() {
  const [data, setData] = useState<
    globalRankingType | contestRankingType | undefined
  >();
  const res1 = useSWR("/api/globalRanking", fetcher);
  const res2 = useSWR("/api/ranking", fetcher);

  const changeSidebarHandle = (isGlobal: boolean, isRanking: boolean) => {
    if (isGlobal) {
      setData(res1.data);
    }
    if (isRanking) {
      setData(res2.data);
    }
  };

  return (
    <div className="flex flex-col h-full w-full">
      <Header />
      <div className="flex justify-between h-[100%]">
        <Sidebar changeSideBar={changeSidebarHandle} />
        <HomeContent data={data} />
      </div>
    </div>
  );
}
