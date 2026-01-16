export const calculateRating = (courseData) => {
    if (courseData?.ratings) {

        const noRating = courseData?.ratings.length;
        let totalRatings = 0;
        courseData?.ratings.forEach(element => {
            totalRatings += Number.parseInt(element.value);
        });

        const rating = totalRatings / noRating;
        return rating ? rating.toFixed(1) : '0.0';
    }
}

// Calculate average rating from course data
export const getRating = (course) => {

    const fetchSpecificCourseResponse = useQuery({
        queryKey: ['fetchSpecificCourse'],
        queryFn: () => fetchCourseDetails(course?._id),
    })

    const { error, isError, isLoading, data } = fetchSpecificCourseResponse;
    const courseDetails = data?.data;
    console.log('Fetch Response', courseDetails);

    return calculateRating(courseDetails);
};