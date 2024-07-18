import React from "react";
import { motion } from "framer-motion";
import ReactLoading from "react-loading";
import { ReloadIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
 
export const Loading = () => (
  <ReactLoading type="bars" color="#20ad4f" height={10} width={30} />
);

export const Loader = () => {
  return (
    <div
      className="fixed inset-0 flex h-full w-full items-center justify-center transition-opacity duration-300"
      style={{ zIndex: 6000 }}
    >
      <div className="relative flex flex-col items-center justify-around">
        <ReactLoading type="bars" color="#20ad4f" height={47} width={45} />
      </div>
    </div>
  );
};

export const ThemedSuspense = () => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={{
        initial: {
          opacity: 0,
        },
        animate: {
          opacity: 1,
        },
      }}
      className="h-screen w-screen mx-auto text-base font-medium themeText"
    >
      Loading...
    </motion.div>
  );
};

