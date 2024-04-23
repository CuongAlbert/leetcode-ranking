import Image from "next/image";
import Logo from "../public/avatar-vuadu.png";
import {
  BsChevronDown,
  BsFillMoonStarsFill,
  BsGearFill,
  BsSunFill,
} from "react-icons/bs";
import { useEffect, useState } from "react";

export default function Header() {
  const [isThemeDropdownOpen, setIsThemeDropdownOpen] =
    useState<boolean>(false);
  const [theme, setTheme] = useState<"dark" | "light" | "system">("light");

  useEffect(() => {
    const darkModePrefers = window.matchMedia("(prefers-color-scheme: dark)");
    const eventHandler = (event: { matches: any }) => {
      event.matches
        ? (document.documentElement.className = "dark")
        : (document.documentElement.className = "light");
    };

    if (theme === "system") {
      eventHandler(darkModePrefers);
      darkModePrefers.addEventListener("change", eventHandler);
      return () => darkModePrefers.removeEventListener("change", eventHandler);
    }
    if (theme === "dark") {
      document.documentElement.className = "dark";
    }
    if (theme === "light") {
      document.documentElement.className = "light";
    }
  }, [theme]);

  return (
    <header className="w-full h-20 flex items-center bg-white dark:bg-neutral-800 px-4 sm:px-14 lg:px-20 z-40">
      <div className="w-full h-20 flex items-center top-0 left-0">
        <Image
          className="rounded-full"
          src={Logo}
          alt="vuadu' logo"
          width={36}
        />
        <h1 className="font-bold text-xl text-neutral-500 dark:text-neutral-100 ml-3">
          Rezza.mem
        </h1>
      </div>
      <span className="dark:text-white mx-2">
        {theme === "system" ? (
          <BsGearFill />
        ) : theme === "dark" ? (
          <BsFillMoonStarsFill />
        ) : (
          <BsSunFill />
        )}
      </span>

      <div className="relative inline-block">
        <button
          type="button"
          className="inline-flex w-6 h-6 justify-center items-center gap-x-1 rounded-md bg-neutral-150 dark:bg-neutral-500 px-2 py-2 text-sm font-semibold text-dark dark:text-white shadow-sm ring-1 ring-inset ring-neutral-100 hover:bg-neutral-450"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={() => {
            setIsThemeDropdownOpen(!isThemeDropdownOpen);
          }}
        >
          <BsChevronDown />
        </button>

        {isThemeDropdownOpen && (
          <div
            className="absolute w-14 right-0 z-10 mt-2 origin-top-right rounded-md bg-neutral-150 shadow-lg ring-1 ring-neutral-800 ring-opacity-5 focus:outline-none"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabIndex={-1}
          >
            <button
              className="text-neutral-750 w-full text-md hover:bg-neutral-350 px-2 py-1 rounded-md flex justify-center items-center"
              tabIndex={-1}
              id="menu-item-0"
              onClick={() => {
                setIsThemeDropdownOpen(!isThemeDropdownOpen);
                setTheme("system");
              }}
            >
              <BsGearFill className="m-3 " />
            </button>
            <button
              className="text-neutral-750 w-full text-md hover:bg-neutral-350 px-2 py-1 rounded-md flex justify-center items-center"
              tabIndex={-1}
              id="menu-item-1"
              onClick={() => {
                setIsThemeDropdownOpen(!isThemeDropdownOpen);
                setTheme("light");
              }}
            >
              <BsSunFill className="m-3 " />
            </button>
            <button
              className="text-neutral-750 w-full text-md hover:bg-neutral-350 px-2 py-1 rounded-md flex justify-center items-center"
              tabIndex={-1}
              id="menu-item-2"
              onClick={() => {
                setIsThemeDropdownOpen(!isThemeDropdownOpen);
                setTheme("dark");
              }}
            >
              <BsFillMoonStarsFill className="m-3" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
