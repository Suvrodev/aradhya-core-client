import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface CounterState {
  serviceId: string;
}

const initialState: CounterState = {
  serviceId: "0",
};

export const selectCategorySlice = createSlice({
  name: "selectCategory",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    selectCategory: (state, action: PayloadAction<string>) => {
      state.serviceId = action.payload;
    },
  },
});

export const { selectCategory } = selectCategorySlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default selectCategorySlice.reducer;
