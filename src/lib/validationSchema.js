import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { isValidPhoneNumber } from "libphonenumber-js";

const phoneRegex = RegExp(/^(2547|2541)[0-9]{8}$/);
const phoneRegexB = RegExp(/^(07|01)[0-9]{8}$/);
const name = RegExp(/^[a-zA-Z '.-]*$/);
const KRA = RegExp(/^[A]{1}[0-9]{9}[a-zA-Z]{1}$/);
const number = RegExp(/^[0-9]*$/);
const IDNumber = RegExp(/^[0-9]{6,9}$/);
const passport = RegExp(/^[A-Z]{2}[0-9]{7}$/);
let plateNumber = /[A-Z]{3}\d{3}\S$/g;



export const LoginSchema = yupResolver(
  Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .min(4, "Password must be at least 4 characters.")
      .max(40, "Password must not exceed 40 characters")
      .required("Password Required!"),
    // types: Yup.string().required("Types is required"),
  })
);

export const forgotPasswordSchema = yupResolver(
  Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
  })
);

export const registerSchema = yupResolver(
  Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .required("Email address is required")
      .email("Email entered is invalid"),
    msisdn: Yup.string()
      .required("Phone number is required")
      .test("isValid", "Phone number is not valid", (value) =>
        isValidPhoneNumber(`${value}`, "KE")
      ),
    password: Yup.string()
      .required("Password is empty")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
    confirmPassword: Yup.string()
      .required("Password is empty")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters")
      .when("password", {
        is: (val) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("password")],
          "Password does not match"
        ),
      }),
  })
);
