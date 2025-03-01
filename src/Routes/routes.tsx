import { createBrowserRouter } from "react-router";
import Main from "../Layout/MainLayout";
import PritomLayout from "../Layout/PritomLayout";
import Login from "../Pages/UserInterAction/Login/Login";
import Registration from "../Pages/UserInterAction/Registration/Registration";
import AboutUs from "../Pages/ForAll/AboutUs/AboutUs";
import Blog from "../Pages/ForAll/Blog/Blog";
import Contact from "../Pages/ForAll/Contact/Contact";
import Home from "../Pages/ForAll/Home/Home";

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
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/contact",
        element: <Contact />,
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
