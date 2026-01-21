import supabase from "../util/supabase/supabase";

export const fetchVideosByCourseId = async ({ courseId, status }) => {
    if (!courseId) throw new Error("courseId is required");

    let query = supabase.from("lectures").select(`id,video_title,video_url,duration,status,isPreview,created_at`)
        .eq("course_id", courseId).order("created_at", { ascending: true });

    if (status) {
        query = query.eq("status", status);
    }

    const { data, error } = await query;

    if (error) throw error;

    return data;
};