import React from "react";
import { useStateContext } from "@/context/ContextProvider";

const Footer = () => {
  const { isTabletMid, activeMenu, screenSize, currentColor, setActiveMenu } =
  useStateContext();
  return (
    <footer className="relative mt-10 flex flex-1 flex-col py-2">
      <div className="absolute bottom-2">
        <p className="themeText text-start text-xs font-semibold md:text-left">
          Copyright © {new Date().getFullYear()}{" "}
          <a
            target="_blank"
            href="https://www.sbo.co.ke/"
            className={` text-xs font-semibold text-green-600 `}
            rel="noreferrer"
          >
            Simon
          </a>{" "}
          All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
