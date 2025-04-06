import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { TCourse } from "../../../../utils/types/globalTypes";

// Define a type for the slice state
interface CourseState {
  courses: TCourse[];
}

const initialState: CourseState = {
  courses: [],
};

export const courseSlice = createSlice({
  name: "courses",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setCourse: (state, action: PayloadAction<TCourse[]>) => {
      state.courses = action.payload;
    },
  },
});

export const { setCourse } = courseSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default courseSlice.reducer;
