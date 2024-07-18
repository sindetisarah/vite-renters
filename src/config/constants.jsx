import { BsHouseFill } from "react-icons/bs";
import { FaFileSignature, FaUser, FaWallet, FaTable } from "react-icons/fa";
import { MdOutlineSmsFailed } from "react-icons/md";

export const Navbar = [
  {
    title: "Home",
    path: "/home",
    icon: "",
  },
];

export const MenusList = [
  {
    path: "/dashboard",
    title: "Dashboard",
    icon: BsHouseFill,
  },
  {
    title: "Property",
    path: "/property",
    icon: FaUser,
  },

  {
    title: "Tenant",
    path: "/tenant",
    icon: FaUser,
  },

  {
    title: "Landlord",
    path: "/landlord",
    icon: FaUser,
  },

  {
    title: "Lease",
    path: "/lease",
    icon: FaUser,
  },
  {
    title: "Invoice",
    path: "/invoice",
    icon: FaUser,
  },
  {
    title: "Payments",
    path: "/payments",
    icon: FaUser,
  },
];
