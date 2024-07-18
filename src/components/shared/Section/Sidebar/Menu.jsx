import React from "react";
import { NavLink, Link, useLocation, useRoutes } from "react-router-dom";
import Ripple from "material-ripple-effects";
import { motion } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";
import { useStateContext } from "@/context/ContextProvider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const Menu = ({ path, icon, Icon, menu }) => {
  const rippleEffect = new Ripple();
  const { isTabletMid, activeMenu, screenSize, currentColor, setActiveMenu } =
    useStateContext();

  return (
    <>
      <NavLink
        to={path}
        onMouseUp={(e) => {
          rippleEffect.create(e, "dark");
        }}
        onClick={() => {
          if (screenSize <= 900 && activeMenu) {
            setActiveMenu(!activeMenu);
          }
        }}
        style={({ isActive }) => ({
          backgroundColor: isActive ? currentColor : "",
        })}
        className={({ isActive }) =>
          `  ${
            isActive && `text-white bg-green-100 hover:bg-green-200 `
          } group flex items-center text-base gap-5 font-medium p-2 hover:bg-slate-100 rounded-md dark:hover:bg-white dark:hover:text-black  ${screenSize >= 900 && !activeMenu && "group-hover:visible group-hover:opacity-100 group-hover:translate-x-0"} `
        }
      >
        {activeMenu ? (
          <>
            {Icon ? (
              <Icon
                size={20}
                className={`${activeMenu || isTabletMid ? "" : "pl-2"} min-w-max`}
              />
            ) : (
              <i
                className={`${icon} text-xl ${
                  activeMenu || isTabletMid ? "" : "pl-4"
                }`}
              />
            )}
            {/* Render the menu text */}
            <p
              className={`ml-1 select-none whitespace-pre transition-all duration-500 ${
                !activeMenu && "translate-x-28 overflow-hidden opacity-0"
              }`}
            >
              {menu}
            </p>
          </>
        ) : (
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className="flex items-center justify-center active:text-muted-foreground transition-colors hover:text-foreground"
                >
                  {Icon ? (
                    <Icon
                      size={20}
                      className={`${activeMenu || isTabletMid ? "" : "pl-2"} min-w-max`}
                    />
                  ) : (
                    <i
                      className={`${icon} text-xl ${
                        activeMenu || isTabletMid ? "" : "pl-4"
                      }`}
                    />
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent side="right" className="ml-5 p-2 text-[13px]">
                {menu}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </NavLink>
    </>
  );
};
