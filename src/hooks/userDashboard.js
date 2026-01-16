import { useQuery } from "@tanstack/react-query";

// Hook: useCourseDetails
export const useCourseDetails = (id) => {
  return useQuery({
    queryKey: ["courseDetails", id],
    queryFn: () => fetchCourseDetails(id),
    enabled: !!id, // only run if id exists
  });
};

// Hook: useUserDetails
export const useUserDetails = (id) => {
  return useQuery({
    queryKey: ["userDetails", id],
    queryFn: () => fetchUserDetails(id),
    enabled: !!id,
  });
};
