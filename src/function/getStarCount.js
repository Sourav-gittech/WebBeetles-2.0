export const getStarCount = () => {
    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

    // Loop through all ratings and count each star
    getSpecificCourseData?.ratings?.forEach((rating) => {
        const value = rating.value; // e.g. 4
        if (counts[value] !== undefined) {
            counts[value] += 1;
        }
    });

    const total = getSpecificCourseData?.ratings?.length || 0;

    return [counts, total];
};