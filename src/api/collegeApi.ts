import axiosClient from "./axiosClient";


export const createCollege = (data : any) => axiosClient.post("/college/create-college",data)
export const getCollege = () => axiosClient.get("/college")