import { endPoint_fetchUserProfile, endPoint_sepeficCourse } from "../api/apiUrl/apiUrl";
import axiosInstance from "../api/axiosInstance/axiosInstance";

// Fetch course details API
const fetchCourseDetails = async (id) => {
  const { data } = await axiosInstance.get(`${endPoint_sepeficCourse}/${id}`);
  return data;
};

// Fetch user details API
const fetchUserDetails = async (id) => {
  const { data } = await axiosInstance.get(`${endPoint_fetchUserProfile}/${id}`);
  return data;
};


