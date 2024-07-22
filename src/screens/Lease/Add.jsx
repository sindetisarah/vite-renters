import {
  FormInput,
  FormTextInput,
  PhoneNumberInput,
} from "@/components/shared/Input";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Dialog } from "@/components/shared/Dialog";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { parsePhoneNumber } from "libphonenumber-js";

const Add = ({ tableData }) => {
  const [openDialog, setOpenDialog] = useState(false);

  const form = useForm({
    // resolver: addLeaseSchema,
    defaultValues: {
      phone: "",
      description: "",
      amount: "",
    },
  });
  const onSubmit = async (values) => {
    let msisdn = String(values.phone);

    const formData = {
      payload: [
        {
          phone: parsePhoneNumber(msisdn, "KE").number?.replace("+", ""),
          description: values.description,
          amount: values.amount,
        },
      ],
    };

    console.log(formData);
    tableData();
  };
  return (
    <>
      <Dialog
        triggerButton={
          <Button variant="outline" size="sm" className="h-8 lg:flex">
            <Plus
              className="sm:mr-2 size-4 text-green-700"
              aria-hidden="true"
            />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Request
            </span>
          </Button>
        }
        title={"Add Request"}
        open={openDialog}
        onOpenChange={setOpenDialog}
        content={
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="">
              <div className="space-y-2">
                <PhoneNumberInput
                  name="phone"
                  maxLength={12}
                  control={form.control}
                  label="Phone Number"
                  required={true}
                  placeholder={"254*********"}
                />
                <FormInput
                  name="amount"
                  label="Amount"
                  type="number"
                  pattern="^\d*\.?\d*$"
                  required={true}
                  maxLength={8}
                  control={form.control}
                />

                <FormTextInput
                  name="description"
                  label="Description"
                  type="text"
                  id="description"
                  maxLength={150}
                  required={true}
                  control={form.control}
                />
              </div>
              <div className="flex space-x-2 justify-end mt-6 ">
                <div className="mb-6 hidden items-center justify-start">
                
                </div>

                <Button
                  size="sm"
                  type="button"
                  variant="outline"
                  onClick={() => setOpenDialog(!openDialog)}
                  className="text-sm h-8 justify-center align-middle items-center lg:flex "
                >
                  Cancel
                </Button>

                <Button
                  //   disabled={loading}
                  className="text-sm h-8 lg:flex justify-center align-middle items-center"
                  variant="default"
                  size="sm"
                  type="submit"
                >
                Submit
                </Button>
              </div>
            </form>
          </Form>
        }
      />
    </>
  );
};

export default Add;
