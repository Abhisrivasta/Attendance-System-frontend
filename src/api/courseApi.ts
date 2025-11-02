import axiosClient from "./axiosClient";

export const createCourse = (courseData: any) => {
    return axiosClient.post("/courses/create-course", courseData);
};


export const getCourses = () => {
    return axiosClient.get("/courses");
};