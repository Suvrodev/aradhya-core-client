import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { TInstructor } from "../../../../utils/types/globalTypes";

// Define a type for the slice state
interface InstructorState {
  instructors: TInstructor[];
}

const initialState: InstructorState = {
  instructors: [],
};

export const instructorSlice = createSlice({
  name: "instructors",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setInstructor: (state, action: PayloadAction<TInstructor[]>) => {
      state.instructors = action.payload;
    },
  },
});

export const { setInstructor } = instructorSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default instructorSlice.reducer;
