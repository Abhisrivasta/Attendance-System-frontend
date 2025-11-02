import axiosClient from "./axiosClient";


export const createColleg = (data : any) => axiosClient.post("/college/create-college",data)
export const getColleg = () => axiosClient.get("/college")