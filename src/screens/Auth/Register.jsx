import LoginImg from "@/assets/images/login.jpg";
import { FormInput, PhoneNumberInput } from "@/components/shared/Input";
import React, { useEffect } from "react";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Message } from "@/components/shared/Alert";
import { useNavigate } from "react-router-dom";
import { registerSchema } from "@/lib/validationSchema";
import { parsePhoneNumber } from "libphonenumber-js";

const Register = () => {
  const navigate = useNavigate();
  
  const form = useForm({
    resolver: registerSchema,
    defaultValues: {
      name: "",
      email: "",
      msisdn: "",
      role: "landlord",
      isLandlordUser: "",
      isAgentUser: "",
      password: "",
      confirmPassword: "",
    },
  });

  const NavtoLogin = () => navigate(`/login`);

  const onSubmit = async (values) => {
    const formData = {
      name: values.name,
      email: values.email,
      msisdn: parsePhoneNumber(phone, "KE").number?.replace("+", ""),
      password: values.password,
      isLandlordUser: values.role === "landlord" ? true : false,
      isAgentUser: values.role === "agent" ? true : false,
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
              className=" h-[555px] rounded-l-lg w-full  bg-cover object-cover dark:brightness-[0.2] dark:grayscale"
              src={LoginImg}
              alt="login_img"
            />
          </div>

          {/* Right side form */}
          <div className="w-full lg:w-1/2 p-8  grid grid-cols-1  justify-center items-center">
            <h2 className="text-2xl font-semibold text-center mb-6">
              Register
            </h2>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="">
                <CardContent className="space-y-3">
                  <FormInput
                    name="name"
                    label="Name"
                    type="text"
                    required={true}
                    control={form.control}
                  />

                  <FormInput
                    name="email"
                    label="Email"
                    type="email"
                    required={true}
                    control={form.control}
                  />

                  <PhoneNumberInput
                    name="phone"
                    maxLength={12}
                    control={form.control}
                    label="Phone Number"
                    required={true}
                    placeholder={"254*********"}
                  />
                  <div className="themeSideBackground themeText mb-4 flex flex-col">
                    <h2 className="mb-2 block text-base font-semibold text-gray-600 dark:text-gray-400">
                      Select Role{" "}
                      <abbr title="required" className="ml-1 text-sm">
                        *
                      </abbr>
                    </h2>
                    <div className="themeSideBackground themeText grid grid-cols-2 gap-5"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-5">
                    <FormInput
                      name="password"
                      label="Password"
                      type="password"
                      maxLength={40}
                      required={true}
                      control={form.control}
                      placeholder="************"
                    />
                    <FormInput
                      name="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      maxLength={40}
                      required={true}
                      control={form.control}
                      placeholder="************"
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col pl-4 pr-4 -mt-8 pb-2">
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
                    Register
                  </Button>
                  <p className="mt-4 flex items-center justify-center px-8">
                    <Button
                      className=" w-full text-sm h-8 lg:flex justify-center align-middle items-center"
                      variant="default"
                      size="sm"
                      type="submit"
                      onClick={NavtoLogin}
                    >
                      Go Back to Login
                    </Button>
                  </p>
                </CardFooter>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
