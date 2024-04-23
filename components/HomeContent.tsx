import { globalRankingType } from "@/pages";
import { contestRankingType } from "@/pages/api/ranking";
import {
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi";
import { useState } from "react";
import LeetcodeLogo from "./LeetcodeLogo";

export default function HomeContent(props: {
  data: globalRankingType | contestRankingType | undefined;
}) {
  const [page, setPage] = useState<number>(1);
  const { data } = props;
  let colWidth = data ? 1 / Object.keys(data[0]).length : 0;
  return (
    <div className="absolute ml-100 w-5/6 h-[100%] pt-10 dark:bg-neutral-850 z-10 right-0">
      <div className="flex w-full items-center h-14 mt-4 px-4 sm:px-14 lg:px-20">
        <span className="hidden dark:block">
          <LeetcodeLogo fill="white" />
        </span>
        <span className="dark:hidden">
          <LeetcodeLogo fill="black" />
        </span>
        <p className="dark:text-white text-xl ml-2 px-3">Leader Board</p>
      </div>

      <table className="w-full mt-5">
        <thead>
          <tr>
            {data &&
              Object.keys(data[0]).map((key, idx) => (
                <th
                  key={idx}
                  className={`w-[${colWidth * 100}%] text-xs text-[#6C707A]`}
                >
                  {key.toUpperCase()}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {data &&
            data.slice((page - 1) * 10, page * 10).map((c, idx) => (
              <tr
                key={idx}
                className="even:bg-neutral-150 even:dark:bg-neutral-750
              odd:dark:bg-neutral-850 text-neutral-800/30 dark:text-white/20"
              >
                {Object.values(c).map((v, idx) => (
                  <td
                    key={idx}
                    className={`w-[${
                      colWidth * 100
                    }%] text-xs  text-[#6C707A] py-5 h-[10%] text-center`}
                  >
                    {v}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
      {data && data.length > 10 && (
        <div className="flex absolute top-10 py-5 text-neutral-800/80 dark:text-white my-5 right-2 text-sm gap-1">
          <button onClick={() => setPage(1)}>
            <HiChevronDoubleLeft />
          </button>
          <button
            onClick={() => (page > 1 ? setPage(page - 1) : setPage(page))}
          >
            <HiChevronLeft />
          </button>
          <p className="text-xs px-2">{page}</p>
          <button
            onClick={() =>
              page < Math.ceil(data.length / 10)
                ? setPage(page + 1)
                : setPage(page)
            }
          >
            <HiChevronRight />
          </button>
          <button onClick={() => setPage(Math.ceil(data.length / 10))}>
            <HiChevronDoubleRight />
          </button>
        </div>
      )}
    </div>
  );
}
