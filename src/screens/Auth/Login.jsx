import LoginImg from "@/assets/images/login.jpg";
import { FormInput } from "@/components/shared/Input";
import React, { useEffect } from "react";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Message } from "@/components/shared/Alert";
import { useNavigate } from "react-router-dom";
import { LoginSchema } from "@/lib/validationSchema";

const Login = () => {
  const navigate = useNavigate();

  const form = useForm({
    resolver: LoginSchema,
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    const formData = {
      email: values.email,
      password: values.password,
    };

    console.log(formData);
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex flex-col lg:flex-row bg-white rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-2/3">
          {/* Left side image (hidden on small screens) */}
          <div className="hidden lg:flex lg:w-1/2 rounded h-full">
            <img
              className=" h-[420px] rounded-l-lg w-full  bg-cover object-cover dark:brightness-[0.2] dark:grayscale"
              src={LoginImg}
              alt="login_img"
            />
          </div>

          {/* Right side form */}
          <div className="w-full lg:w-1/2 p-8  grid grid-cols-1  justify-center items-center">
            <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
            <div className="text-center text-lg font-medium capitalize">
              {/* {isError ? (
                <Message>Error: {error?.status?.message}</Message>
              ) : ( */}
              <>Sign in to your account</>
              {/* )} */}
            </div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="">
                <CardContent className="space-y-3">
                  <FormInput
                    name="email"
                    label="Email"
                    type="email"
                    required={true}
                    control={form.control}
                  />

                  <FormInput
                    name="password"
                    label="Password"
                    type="password"
                    maxLength={40}
                    required={true}
                    control={form.control}
                  />
                </CardContent>
                <CardFooter className="flex flex-col pl-4 pr-4 pb-2">
                  <div className="w-full flex items-center justify-between px-3 mb-3 "></div>

                  {/* <Button
                    disabled={loading}
                    className=" w-full text-sm h-8 lg:flex justify-center align-middle items-center"
                    variant="default"
                    size="sm"
                    type="submit"
                  >
                    {loading ? (
                      <span className=" flex items-center">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Please wait
                      </span>
                    ) : (
                      `Sign In`
                    )}
                  </Button> */}
                  <Button
                    // disabled={loading}
                    className=" w-full text-sm h-8 lg:flex justify-center align-middle items-center"
                    variant="default"
                    size="sm"
                    type="submit"
                  >
                    Sign In
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
