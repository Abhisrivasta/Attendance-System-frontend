import axiosClient from "./axiosClient";

export const createBatch = (batchData: any) => {
  return axiosClient.post("/batches/create-batch", batchData);
};


