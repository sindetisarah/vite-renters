import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import * as Pov from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useStateContext } from "@/context/ContextProvider";
import { IoLogOutOutline } from "react-icons/io5";
import { FaBarsStaggered } from "react-icons/fa6";
import { User } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
// import { Customizer } from "@/container/ThemeCustomizer";

import { BreadCrumbs } from "../BreadCrumbs";

const Header = () => {
  const { pathname } = useLocation();
  const { activeMenu, toggleSidebar, currentColor } = useStateContext();

  const [showDiv, setShowDiv] = useState(false);

  // Javascript methods
  let Location = pathname
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace("/", "")
    .replace("%20", " ")
    .split("/")[0];

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch.AuthLogout.logout();
  };

  return (
    <header className={`relative w-full  py-6 md:static`}>
      <div className={`flex h-full items-center justify-between px-0`}>
        <Button
          style={{ color: currentColor }}
          className={`menuBtn mx-2 -ml-1 mr-5 flex p-0 h-10 w-10 cursor-pointer items-center justify-center rounded-full transition duration-150 ease-in hover:scale-105  focus:outline-none ${
            !activeMenu && "rotate-180"
          } `}
          onClick={toggleSidebar}
          aria-label="Menu"
          variant="ghost"
          size={"icon"}
        >
          <FaBarsStaggered className={`text-black text-lg dark:text-white`} />
        </Button>
        <div className="flex flex-1 justify-start lg:mr-32">
          {/* <h2 className="themeText text-lg font-normal leading-9">
            {Location}
            </h2> */}
          <BreadCrumbs />
        </div>
        <motion.ul className="flex flex-shrink-0 items-center ">
          <motion.li className="relative space-x-4">
            <Pov.Popover>
              <Pov.PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="overflow-hidden rounded-full"
                >
                  <User
                    src="/placeholder-user.jpg"
                    width={20}
                    height={20}
                    alt="Avatar"
                    className="overflow-hidden rounded-full"
                  />
                </Button>
              </Pov.PopoverTrigger>
              <Pov.PopoverContent align="end" className={`p-0 pt-3 w-44`}>
                <Label className="items-center justify-center text-center pb-3 px-3 text-sm font-semibold">
                  My Account
                </Label>
                <Separator className="mt-1 w-full -mx-1 h-px bg-muted" />
                <div className="p-1">
                  <Button
                    className="w-full justify-start border-none shadow-none"
                    variant="outline"
                    onClick={() => setShowDiv(!showDiv)}
                  >
                    Themes
                  </Button>
                  {showDiv && (
                    <div className=" p-2  shadow-none">
                      add later
                      {/* <Customizer closeDiv={() => setShowDiv(false)} /> */}
                    </div>
                  )}
                </div>
                <Separator className=" w-full -mx-1 h-px bg-muted" />
                <div className="p-1">
                  <Button
                    className="w-full justify-start shadow-none border-none"
                    variant="outline"
                    onClick={logoutHandler}
                  >
                    Log out <IoLogOutOutline className="text-xl ml-3" />
                  </Button>
                </div>
              </Pov.PopoverContent>
            </Pov.Popover>
          </motion.li>
        </motion.ul>
      </div>
    </header>
  );
};

export default Header;
