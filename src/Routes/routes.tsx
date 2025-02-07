import { createBrowserRouter } from "react-router";
import Main from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import PritomLayout from "../Layout/PritomLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/home",
        element: <Home />,
      },
    ],
  },
  {
    path: "pritom",
    element: <PritomLayout />,
    children: [
      // {
      //   path: "p",
      //   element: <Pritom />,
      // },
    ],
  },
]);
