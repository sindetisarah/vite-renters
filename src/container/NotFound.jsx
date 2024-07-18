import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <section className="grid h-screen place-content-center dark:bg-gray-900 dark:text-gray-100 px-4">
      <div className="text-center">
        <h1 className="text-9xl font-black text-gray-300">404</h1>

        <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Uh-oh!
        </p>

        <p className="font-normal text-xl mt-4 text-gray-500">
          Sorry, we couldn't find this page.
        </p>

        <Button
          type="button"
          onClick={goBack}
          className="mt-6 duration-200 transition ease-in hover:scale-105"
        >
          Go Back{" "}
        </Button>
      </div>
    </section>
  );
};

export default NotFound;
