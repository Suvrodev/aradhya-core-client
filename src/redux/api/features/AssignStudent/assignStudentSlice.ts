import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface AssignStudentState {
  studentId: string;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  courseId: string;
  batchId: string;
  batchName: string;
  coursePrice: number;
  courseDiscount: number;
  promoCodeStatus: string;
  promoCode: string;
  appliedpromoCode: string;
  promoPercent: number;
  finalPrice: number;
  transactionId: string;
  transactionMobileNumber: string;
  paymentGateWay: string;
}

const initialState: AssignStudentState = {
  studentId: "",
  studentName: "",
  studentEmail: "",
  studentPhone: "",
  courseId: "",
  batchId: "",
  batchName: "",
  coursePrice: 0,
  courseDiscount: 0,
  promoCodeStatus: "",
  promoCode: "",
  appliedpromoCode: "",
  promoPercent: 0,
  finalPrice: 0,
  transactionId: "",
  transactionMobileNumber: "",
  paymentGateWay: "",
};

export const selectAssignStudentSlice = createSlice({
  name: "selectAssignStudent",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    selectAssignStudentId: (state, action: PayloadAction<string>) => {
      state.studentId = action.payload;
    },
    selectAssignStudentName: (state, action: PayloadAction<string>) => {
      state.studentName = action.payload;
    },
    selectAssignStudentEmail: (state, action: PayloadAction<string>) => {
      state.studentEmail = action.payload;
    },
    selectAssignStudentPhone: (state, action: PayloadAction<string>) => {
      state.studentPhone = action.payload;
    },
    selectCourseId: (state, action: PayloadAction<string>) => {
      state.courseId = action.payload;
    },
    selectBatchId: (state, action: PayloadAction<string>) => {
      state.batchId = action.payload;
    },
    selectBatchName: (state, action: PayloadAction<string>) => {
      state.batchName = action.payload;
    },
    selectCoursePrice: (state, action: PayloadAction<number>) => {
      state.coursePrice = action.payload;
    },
    selectCourseDiscount: (state, action: PayloadAction<number>) => {
      state.courseDiscount = action.payload;
    },
    selectPromoCodeStatus: (state, action: PayloadAction<string>) => {
      state.promoCodeStatus = action.payload;
    },
    selectPromoCode: (state, action: PayloadAction<string>) => {
      state.promoCode = action.payload;
    },
    selectAppliedPromoCode: (state, action: PayloadAction<string>) => {
      state.appliedpromoCode = action.payload;
    },
    selectPromoPercent: (state, action: PayloadAction<number>) => {
      state.promoPercent = action.payload;
    },
    selectFinalPrice: (state, action: PayloadAction<number>) => {
      state.finalPrice = action.payload;
    },
    selectTransactionId: (state, action: PayloadAction<string>) => {
      state.transactionId = action.payload;
    },
    selectTransactionMobileNumber: (state, action: PayloadAction<string>) => {
      state.transactionMobileNumber = action.payload;
    },
    selectPaymentGateway: (state, action: PayloadAction<string>) => {
      state.paymentGateWay = action.payload;
    },
  },
});

export const {
  selectAssignStudentId,
  selectAssignStudentName,
  selectAssignStudentEmail,
  selectAssignStudentPhone,
  selectCourseId,
  selectBatchId,
  selectBatchName,
  selectCoursePrice,
  selectCourseDiscount,
  selectPromoCodeStatus,
  selectPromoCode,
  selectAppliedPromoCode,
  selectPromoPercent,
  selectFinalPrice,
  selectTransactionId,
  selectTransactionMobileNumber,
  selectPaymentGateway,
} = selectAssignStudentSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default selectAssignStudentSlice.reducer;
