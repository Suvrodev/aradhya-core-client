import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./Routes/routes.tsx";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.tsx";
import { Toaster } from "sonner";
import { HelmetProvider } from "react-helmet-async";
import { PersistGate } from "redux-persist/integration/react";
import GoTopButton from "./Component/GoTopButton/GoTopButton.tsx";
import CrispChat from "./Component/Crisp/CrispChat.tsx";
import GetAllCourse from "./Component/GetAllCourse/GetAllCourse.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId =
  "902104314184-7dgf3sp78fpplq58l3ohnsbenvm1gomp.apps.googleusercontent.com";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId={clientId}>
      <HelmetProvider>
        <StrictMode>
          <PersistGate loading={null} persistor={persistor}>
            <RouterProvider router={router} />
          </PersistGate>
          <Toaster />
          <GoTopButton />
          <CrispChat />
          <GetAllCourse />
        </StrictMode>
      </HelmetProvider>
    </GoogleOAuthProvider>
  </Provider>
);
