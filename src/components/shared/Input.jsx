import React, { useEffect, useRef, useState } from "react";
import {  useController } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import * as slc from "@/components/ui/select";
import * as frm from "@/components/ui/form";
import * as Iotp from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export const PhoneNumberInput = ({
  name,
  label,
  control,
  required,
  description,
  info,
  placeholder,
  maxLength,
  ...props
}) => {
  const {
    field: { onChange, value, ...inputProps },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: { required, pattern: /^\d*\.?\d*$/ },
  });

  const handleChange = (e) => {
    const inputValue = e.target.value;
    if (/^\d*\.?\d*$/.test(inputValue)) {
      onChange(inputValue);
    }
  };
  const handleInput = (e) => {
    if (maxLength) {
      e.target.value = e.target.value.slice(0, maxLength);
    }
  };

  return (
    <frm.FormField
      control={control}
      name={name}
      render={({ field }) => (
        <frm.FormItem className="max-w-9xl mb-4">
          <div className="flex items-center justify-between">
            <frm.FormLabel className="mb-0">{label}</frm.FormLabel>
            <frm.FormDescription>{info}</frm.FormDescription>
          </div>
          <frm.FormControl>
            <Input
              type="text"
              placeholder={placeholder}
              onInput={handleInput}
              country="KE"
              required={required}
              value={value || ""}
              onChange={handleChange}
              {...inputProps}
              {...props}
            />
          </frm.FormControl>
          <frm.FormDescription>{description}</frm.FormDescription>
          {error && <FormMessage>{error.message}</FormMessage>}
        </frm.FormItem>
      )}
    />
  );
};

export const FormInput = ({
  name,
  type,
  placeholder,
  label,
  control,
  required,
  description,
  info,
  maxLength,
  ...props
}) => {
  const {
    field: { onChange, value, ...inputProps },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: {
      required,
      pattern: type === "number" ? /^[0-9]*$/ : undefined,
    },
  });

  const handleChange = (e) => {
    let inputValue = e.target.value;
    if (type === "number") {
      inputValue = inputValue.replace(/[^0-9]/g, ""); // Remove any non-numeric characters
    }
    onChange(inputValue);
  };

  const handleInput = (e) => {
    if (maxLength) {
      e.target.value = e.target.value.slice(0, maxLength);
    }
  };

  return (
    <frm.FormField
      control={control}
      name={name}
      render={({ field }) => (
        <frm.FormItem className="max-w-9xl mb-4">
          <div className="flex items-center justify-between">
            <frm.FormLabel className="mb-0">{label}</frm.FormLabel>
            <frm.FormDescription>{info}</frm.FormDescription>
          </div>
          <frm.FormControl>
            <Input
              type={type === "number" ? "number" : type}
              placeholder={placeholder}
              onInput={handleInput}
              required={required}
              value={value || ""}
              onChange={handleChange}
              {...inputProps}
              {...field}
              {...props}
            />
          </frm.FormControl>
          <frm.FormDescription>{description}</frm.FormDescription>
          {error && <frm.FormMessage>{error.message}</frm.FormMessage>}
        </frm.FormItem>
      )}
    />
  );
};

export const FileInput = ({
  control,
  type,
  name,
  required,
  accept,
  label,
  placeholder,
  info,
  description,
  ...props
}) => {
  return (
    <frm.FormField
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <frm.FormItem className="max-w-9xl mb-4">
          <div className="flex items-center justify-between">
            <frm.FormLabel className="mb-0">{label}</frm.FormLabel>
            <frm.FormDescription className="">{info}</frm.FormDescription>
          </div>
          <frm.FormControl>
            <input
              type={type}
              placeholder={placeholder}
              required={required}
              accept={accept}
              {...field}
            />
          </frm.FormControl>
          <frm.FormDescription>{description}</frm.FormDescription>
          <frm.FormMessage />
        </frm.FormItem>
      )}
    />
  );
};

export const FormSelect = ({
  name,
  info,
  label,
  isMulti,
  control,
  required,
  description,
  placeholder = "Select...",
  options = [
    {
      label: "Select...",
      value: "",
    },
  ],
  ...props
}) => {
  const [selectedValue, setSelectedValue] = useState(isMulti ? [] : options); // Stores the selected value(s)

  return (
    <frm.FormField
      control={control}
      name={name}
      render={({ field }) => (
        <frm.FormItem className="max-w-9xl mb-4">
          <div className="flex items-center justify-between">
            <frm.FormLabel className="mb-0">{label}</frm.FormLabel>
            <frm.FormDescription className="">{info}</frm.FormDescription>
          </div>
          <slc.Select
            onValueChange={field.onChange}
            value={field.value}
            defaultValue={field.value}
            required={required}
          >
            <frm.FormControl>
              <slc.SelectTrigger className="w-full">
                <slc.SelectValue placeholder={placeholder || "Select..."} />
              </slc.SelectTrigger>
            </frm.FormControl>

            <slc.SelectContent>
              {selectedValue.map((option, index) => (
                <slc.SelectItem key={index} value={option.value}>
                  {option.label}
                </slc.SelectItem>
              ))}

              {/* <SelectSeparator />
              <Button
                className="w-full px-2"
                variant="secondary"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  // setSelectedValue({
                  //   label: "Select...",
                  //   value: "",
                  // });
                  console.log(values);
                  return selectedValue.filter((o) => o.value !== option.value);
                }}
              >
                Clear
              </Button> */}
            </slc.SelectContent>
          </slc.Select>
          <frm.FormDescription>{description}</frm.FormDescription>
          <frm.FormMessage />
        </frm.FormItem>
      )}
    />
  );
};

export const FormOTP = ({
  name,
  type = "password",
  placeholder,
  label,
  control,
  required,
  description,
  info,
  ref,
  maxLength = 6,
  validationPattern = /[0-9]{1}/,
  ...props
}) => {
  const inputRefs = useRef([]);

  // Create an array based on the size.
  const arr = new Array(maxLength).fill("-");

  //show hide password
  const [showPass, setShowPass] = useState(false);
  const [passType, setPassType] = useState("password");

  useEffect(() => {
    if (showPass) {
      setPassType("text");
    } else {
      setPassType("password");
    }
  }, [showPass]);

  return (
    <frm.FormField
      control={control}
      name={name}
      render={({ field }) => (
        <frm.FormItem className="max-w-9xl mb-4">
          <div className="flex items-center justify-between">
            <frm.FormLabel className="mb-0">{label}</frm.FormLabel>
            <frm.FormDescription className="">{info}</frm.FormDescription>
          </div>
          <div className="flex">
            <frm.FormControl>
              <Iotp.InputOTP
                id={"otpInput"}
                inputMode="numeric"
                maxLength={maxLength}
                {...field}
                {...props}
              >
                {arr.map((_, index) => {
                  return (
                    <Iotp.InputOTPGroup key={index}>
                      <Iotp.InputOTPSlot
                        index={index}
                        ref={(el) => el && (inputRefs.current[index] = el)}
                        className="h-12 w-12 text-xl"
                        style={{
                          WebkitTextSecurity: `${type === passType ? "disc" : "none"}`,
                        }}
                      />
                    </Iotp.InputOTPGroup>
                  );
                })}
              </Iotp.InputOTP>
            </frm.FormControl>
            <Button
              className={`p-3 ml-3 mt-2`}
              variant="ghost"
              size="icon"
              type="button"
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? (
                <EyeOff className="size-6 text-cyan-600" aria-hidden="true" />
              ) : (
                <Eye className="size-4 text-cyan-600" aria-hidden="true" />
              )}
            </Button>
          </div>
          <frm.FormDescription>{description}</frm.FormDescription>
          <frm.FormMessage />
        </frm.FormItem>
      )}
    />
  );
};

export const FormTextInput = ({
  name,
  type,
  placeholder,
  label,
  control,
  required,
  description,
  info,
  id,
  maxLength,
  ...props
}) => {
  const handleInput = (e) => {
    if (maxLength) {
      e.target.value = e.target.value.slice(0, maxLength);
    }
  };
  return (
    <frm.FormField
      control={control}
      name={name}
      render={({ field }) => (
        <frm.FormItem className="max-w-9xl mb-4">
          <div className="flex items-center justify-between">
            <frm.FormLabel className="mb-0">{label}</frm.FormLabel>
            <frm.FormDescription className="">{info}</frm.FormDescription>
          </div>
          <frm.FormControl>
            <Textarea
              onInput={handleInput}
              placeholder={placeholder}
              id={id}
              required={required}
              {...field}
            />
          </frm.FormControl>
          <frm.FormDescription>{description}</frm.FormDescription>
          <frm.FormMessage />
        </frm.FormItem>
      )}
    />
  );
};
