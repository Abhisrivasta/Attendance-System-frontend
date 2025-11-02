import axiosClient from "./axiosClient";

export const getUniversities = () => axiosClient.get("/university");
export const createUniversity = (data: any) => axiosClient.post("/university/create-university", data);
export const deleteUniversity = (id: number) => axiosClient.delete(`/university/${id}`);
export const restoreUniversity = (id: number) => axiosClient.patch(`/university/${id}/restore`);
