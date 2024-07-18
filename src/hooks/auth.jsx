import { setStorageData } from "@/lib/utils";
import api from "../lib/api";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useAuthLogin(formData, options) {
  return useMutation({
    queryKey: ["login", formData],
    mutationFn: async (formData) => {
      try {
        const { data } = await api.post(`/auth/login`, formData);
        let dataItem = data?.data[0];

        console.log("first", data);
        let successLogin = data?.status.message.includes("successfully")
          ? true
          : false;

        if (successLogin) {
          setStorageData("name", dataItem?.userName);
          setStorageData("userId", dataItem?.userId);
          setStorageData("userInfo", dataItem);
          setStorageData("email", dataItem?.email);
          setStorageData("token", dataItem?.token);
          setStorageData("isLogedIn", successLogin);
        }
        return data;
      } catch (error) {
        throw error.response?.data || new Error("An unexpected error occurred");
      }
    },
    enabled: true,
    ...options,
  });
}
