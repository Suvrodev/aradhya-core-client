import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { TBatch } from "../../../../utils/types/globalTypes";

// Define a type for the slice state
interface BatchState {
  batchs: TBatch[];
}

const initialState: BatchState = {
  batchs: [],
};

export const batchSlice = createSlice({
  name: "batchs",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setBatch: (state, action: PayloadAction<TBatch[]>) => {
      state.batchs = action.payload;
    },
  },
});

export const { setBatch } = batchSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default batchSlice.reducer;
