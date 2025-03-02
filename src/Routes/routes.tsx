import { createBrowserRouter } from "react-router";
import Main from "../Layout/MainLayout";
import PritomLayout from "../Layout/PritomLayout";
import Login from "../Pages/UserInterAction/Login/Login";
import Registration from "../Pages/UserInterAction/Registration/Registration";
import AboutUs from "../Pages/ForAll/AboutUs/AboutUs";
import Blog from "../Pages/ForAll/Blog/Blog";
import Contact from "../Pages/ForAll/Contact/Contact";
import Home from "../Pages/ForAll/Home/Home";
import AdminProtectedRoute from "./ProtectedRoute/AdminProtectedRoute";
import AdminDashboardHome from "../Pages/AdminDashboard/AdminDashboardHome";
import AdminDashboard from "../Pages/AdminDashboard/AdminDashboard";
import AdminProfile from "../Pages/AdminDashboard/AdminProfile/AdminProfile";
import AdminService from "../Pages/AdminDashboard/AdminService/AdminService";
import AddBlog from "../Pages/AdminDashboard/AdminBlog/AddBlog/AddBlog";
import AllBlog from "../Pages/AdminDashboard/AdminBlog/AllBlog/AllBlog";
import UpdateBlog from "../Pages/AdminDashboard/AdminBlog/UpdateBlog";
import AddCourse from "../Pages/AdminDashboard/AdminCourse/AddCourse/AddCourse";

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
    path: "admin-dashboard",
    element: (
      <AdminProtectedRoute>
        <AdminDashboard />
      </AdminProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <AdminProtectedRoute>
            {" "}
            <AdminDashboardHome />{" "}
          </AdminProtectedRoute>
        ),
      },
      {
        path: "admin-home",
        element: (
          <AdminProtectedRoute>
            {" "}
            <AdminDashboardHome />,
          </AdminProtectedRoute>
        ),
      },
      {
        path: "admin-profile",
        element: (
          <AdminProtectedRoute>
            {" "}
            <AdminProfile />
          </AdminProtectedRoute>
        ),
      },
      {
        path: "admin-service",
        element: (
          <AdminProtectedRoute>
            {" "}
            <AdminService />
          </AdminProtectedRoute>
        ),
      },
      {
        path: "add-course",
        element: (
          <AdminProtectedRoute>
            {" "}
            <AddCourse />
          </AdminProtectedRoute>
        ),
      },
      {
        path: "admin-add-blog",
        element: (
          <AdminProtectedRoute>
            {" "}
            <AddBlog />
          </AdminProtectedRoute>
        ),
      },
      {
        path: "admin-all-blog",
        element: (
          <AdminProtectedRoute>
            {" "}
            <AllBlog />
          </AdminProtectedRoute>
        ),
      },
      {
        path: "update-blog/:id",
        element: (
          <AdminProtectedRoute>
            {" "}
            <UpdateBlog />
          </AdminProtectedRoute>
        ),
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
