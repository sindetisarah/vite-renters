import OtpImg from "@/assets/images/login.jpg";
import { FormOTP } from "@/components/shared/Input";
import React from "react";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

const OTPScreen = () => {
  
  const form = useForm();
  const onSubmit = async (values) => {
    const formData = {
      OTP: values.otp,
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
              src={OtpImg}
              alt="otp_img"
            />
          </div>

          {/* Right side form */}
          <div className="w-full lg:w-1/2 p-8  grid grid-cols-1  justify-center items-center">
            <div className="grid gap-2 text-center">
              {/* //header */}
              <CardHeader className="space-y-2">
                <CardTitle className="text-2xl text-center">
                  One-Time Password
                </CardTitle>
                <CardDescription className="text-center text-sm text-muted-foreground">
                  Please input the one-time password sent to your Phone number
                  or email
                </CardDescription>
              </CardHeader>
            </div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="">
                <CardContent className="space-y-3 items-center">
                  <div className=" px-10 flex justify-center items-center">
                    <FormOTP
                      name="otp"
                      maxLength={5}
                      required={true}
                      control={form.control}
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center items-center">
                  <Button
                    // disabled={loading}
                    className=" w-[50%] text-sm h-8 lg:flex justify-center align-middle items-center"
                    variant="default"
                    size="sm"
                    type="submit"
                  >
                    Verify
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

export default OTPScreen;
