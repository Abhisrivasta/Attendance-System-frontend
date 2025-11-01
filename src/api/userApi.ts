import axiosClient from "./axiosClient";

export const getProfile = async () => {
    const res = await axiosClient.get("/auth/profile");
    console.log("User profile:", res.data);
    return res.data;
}