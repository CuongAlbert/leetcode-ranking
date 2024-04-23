import { useState } from "react";
import { BsBraces } from "react-icons/bs";

interface SidebarProps {
  changeSideBar: (changeData: boolean) => void;
}

export default function Sidebar(props: {
  changeSideBar: (arg0: boolean, arg1: boolean) => void;
}) {
  const [isGlobal, setIsGlobal] = useState(false);
  const [isRanking, setIsRanking] = useState(true);

  const contestRankingHandle = () => {
    setIsRanking(true);
    setIsGlobal(false);
  };
  const globalRankingHandle = () => {
    setIsRanking(false);
    setIsGlobal(true);
  };

  props.changeSideBar(isGlobal, isRanking);

  return (
    <div className="absolute w-1/6 h-[100%] pt-10 dark:bg-neutral-850 left-0 z-10 mx-auto">
      <div className="w-[80%] dark:bg-neutral-650 bg-neutral-150 rounded-lg flex items-center justify-center h-12 mt-5 mx-auto">
        <BsBraces className="text-[#257CDC] text-sm mr-3" />
        <p className="dark:text-neutral-350 text-neutral-850 text-sm">
          Leetcode Contest
        </p>
      </div>
      <p
        className={`w-[70%] rounded-lg my-2 h-10 m-auto mt-2 hover:bg-neutral-750 dark:hover:bg-neutral-250 cursor-pointer text-neutral-550 ${
          isRanking
            ? "dark:bg-neutral-550 bg-neutral-350 dark:text-neutral-350"
            : "dark:bg-neutral-650 bg-neutral-150"
        }  text-xs flex justify-center items-center`}
        onClick={contestRankingHandle}
      >
        Contest
      </p>
      <p
        className={`w-[70%] rounded-lg my-2 h-10 m-auto mt-2 hover:bg-neutral-750 dark:hover:bg-neutral-250 cursor-pointer text-neutral-550 ${
          isGlobal
            ? "dark:bg-neutral-550 bg-neutral-350 dark:text-neutral-350"
            : "dark:bg-neutral-650 bg-neutral-150"
        } text-xs flex justify-center items-center`}
        onClick={globalRankingHandle}
      >
        Global Ranking
      </p>
    </div>
  );
}
