import { configureStore } from "@reduxjs/toolkit";
import selectServiceReducer from "./api/features/Service/selectServiceSlice";
import assignStudentReducer from "./api/features/AssignStudent/assignStudentSlice";
import coursesReducer from "./api/features/Course/courseSlice";
import instructorReducer from "./api/features/Instructor/instructorSlice";
import batchReducer from "./api/features/Batch/batchSlice";
import authReducer from "./api/features/auth/authSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import storage from "redux-persist/lib/storage";
import { baseApi } from "./api/baseApi";

const persistConfig = {
  key: "auth",
  storage,
};
const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    [baseApi.reducerPath]: baseApi.reducer,
    selectService: selectServiceReducer,
    assignStudent: assignStudentReducer,
    courses: coursesReducer,
    instructors: instructorReducer,
    batchs: batchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
