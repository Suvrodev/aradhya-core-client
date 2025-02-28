import { createBrowserRouter } from "react-router";
import Main from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import PritomLayout from "../Layout/PritomLayout";
import Login from "../Pages/UserInterAction/Login/Login";
import Registration from "../Pages/UserInterAction/Registration/Registration";

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
    path: "login",
    element: <Login />,
  },
  {
    path: "registration",
    element: <Registration />,
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
