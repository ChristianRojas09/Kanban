import { IconMoonStars, IconSun } from "@tabler/icons-react";
import React, { useState, useEffect } from "react";

const ToggleTheme = () => {
  const [toggle, setToggle] = useState("light");
  const handleChangedTheme = () => {
    const html = document.querySelector("html");
    html?.classList.toggle("dark");
    localStorage.setItem("theme", toggle === "dark" ? "light" : "dark");
    setToggle(toggle === "dark" ? "light" : "dark");
  };
  useEffect(() => {
    setToggle(localStorage.getItem("theme") || "light");
    return () => {};
  }, []);

  return (
    <div className="bg-[#F5E8DD] dark:bg-black3 w-full flex items-center  py-4 justify-center rounded-md gap-x-6">
      <IconSun />
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={toggle === "dark"}
          onChange={handleChangedTheme}
          className="sr-only peer"
        ></input>
        <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none rounded-full  dark:bg-gray-700 peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-white   after:rounded-full after:h-[14px] after:w-[14px] after:transition-all  bg-primary2"></div>
      </label>
      <IconMoonStars />
    </div>
  );
};

export default ToggleTheme;
