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

  const clickHandle = () => {
    setIsRanking(!isRanking);
    setIsGlobal(!isGlobal);
  };

  props.changeSideBar(isGlobal, isRanking);

  return (
    <div className="absolute w-1/6 h-[100%] pt-20 bg-[#181A25] left-0 z-10 mx-auto">
      <div className="w-[80%] bg-[#2A2F3B] rounded-lg flex items-center justify-center h-12 mt-5 mx-auto">
        <BsBraces className="text-[#257CDC] text-sm mr-3" />
        <p className="text-white text-sm">Leetcode Contest</p>
      </div>
      <p
        className={`w-[70%] rounded-lg my-2 h-10 m-auto mt-2 bg-[${
          isRanking ? "#2A2F3B" : ""
        }] hover:bg-[#2A2F3B] cursor-pointer text-white text-xs flex justify-center items-center`}
        onClick={clickHandle}
      >
        Contest
      </p>
      <p
        className={`w-[70%] rounded-lg my-2 h-10 m-auto mt-2 bg-[${
          isGlobal ? "#2A2F3B" : ""
        }] hover:bg-[#2A2F3B] cursor-pointer text-white text-xs flex justify-center items-center`}
        onClick={clickHandle}
      >
        Global Ranking
      </p>
    </div>
  );
}
