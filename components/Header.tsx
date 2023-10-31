import { FiSearch } from "react-icons/fi";
import { BsBell, BsFillMoonStarsFill, BsSunFill } from "react-icons/bs";
export default function Header() {
  return (
    <div className="flex w-full top-0 bg-[#1D212C] absolute h-20 z-20 px-10 items-center justify-between">
      <div className="w-1/5 flex items-center">
        <img
          className="w-10 h-10 rounded-full"
          src="https://static.vecteezy.com/system/resources/previews/008/214/517/original/abstract-geometric-logo-or-infinity-line-logo-for-your-company-free-vector.jpg"
          alt=""
        />
        <h1 className="font-bold text-xl text-[#fff] ml-3">Rezza.mem</h1>
      </div>
      <div className="flex items-center w-full justify-between mx-12">
        <div className="bg-[#2C3340] rounded-full w-1/4 h-10 items-center flex justify-between px-5">
          <p className="text-xs text-white">Search...</p>
          <FiSearch className="text-white" />
        </div>
        <div className="flex items-center px-5 h-10">
          <BsBell className="text-white m-5" />
          <div className="flex items-center bg-[#2C3340] rounded-full">
            <BsSunFill className="text-white m-3" />
            <span className="bg-[#3E4553] rounded-full">
              <BsFillMoonStarsFill className="text-white rounded-full m-3" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
