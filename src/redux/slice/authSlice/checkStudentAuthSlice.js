import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import supabase from "../../../util/supabase";
import toastifyAlert from "../../../util/toastify";

// fetch student details
export const fetchStudentDetails = createAsyncThunk("checkStudentAuthSlice/fetchStudentDetails",
  async (studentId, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.from("students").select("*").eq("id", studentId).single();
      // console.log('Logged user details', data);

      if (error) throw new Error(error.message);
      return data;
    }
    catch (err) {
      const message = err?.message ?? "Failed to fetch student details";
      return rejectWithValue(message);
    }
  });

// Check if student session exists
export const checkLoggedInStudent = () => async (dispatch) => {
  const { data, error } = await supabase.auth.getSession();

  // console.log('Logged data', data);

  if (error) {
    console.error("Error fetching session:", error.message);
    dispatch(clearStudent());
    return;
  }

  if (data.session?.user) {
    dispatch(
      setStudent({
        user: data.session.user,
        session: data.session,
      })
    );

    // Fetch students details
    dispatch(fetchStudentDetails(data.session.user.id));
  } else {
    dispatch(clearStudent());
  }
}

// Listen for Supabase Auth login/logout
export const listenAuthChanges = () => (dispatch) => {
  supabase.auth.onAuthStateChange((_event, session) => {
    if (session?.user) {
      dispatch(
        setStudent({
          user: session.user,
          session,
        })
      );

      // Fetch user profile from students
      dispatch(fetchStudentDetails(session.user.id));
    } else {
      dispatch(clearStudent());
    }
  })
}

// Logout
export const logoutUser = () => async (dispatch) => {
  try {
    const token = sessionStorage.getItem("user_token");
    if (token) sessionStorage.removeItem("user_token");

    const { error } = await supabase.auth.signOut();

    if (error) throw new Error(error.message);

    dispatch(clearStudent());
    toastifyAlert.success("Logged out successfully");
  }
  catch (err) {
    console.error("Logout error:", err);
    toastifyAlert.error("Logout failed");
  }
}

const initialState = {
  isStudentAuth: false,
  studentAuthData: undefined,
  session: undefined,
  isStudentLoading: false,
  studentError: null,
}

export const checkStudentAuthSlice = createSlice({
  name: "checkStudentAuthSlice",
  initialState,
  reducers: {
    setStudent: (state, action) => {
      state.isStudentAuth = true;
      state.studentAuthData = action.payload.user;
      state.session = action.payload.session;
      state.studentError = null;
    },
    clearStudent: (state) => {
      state.isStudentAuth = false;
      state.studentAuthData = undefined;
      state.session = undefined;
      state.studentError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudentDetails.pending, (state) => {
        state.isStudentLoading = true;
      })
      .addCase(fetchStudentDetails.fulfilled, (state, action) => {
        state.isStudentLoading = false;
        state.studentAuthData = action.payload;
      })
      .addCase(fetchStudentDetails.rejected, (state, action) => {
        state.isStudentLoading = false;
        state.studentError = action.payload || "Failed to fetch user details";
      });
  },
})

export const { setStudent, clearStudent } = checkStudentAuthSlice.actions;
export default checkStudentAuthSlice.reducer;