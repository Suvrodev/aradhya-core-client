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
import AllBlog from "../Pages/AdminDashboard/AdminBlog/AllBlog/AllBlog";
import UpdateBlog from "../Pages/AdminDashboard/AdminBlog/UpdateBlog";
import AddCourse from "../Pages/AdminDashboard/AdminCourse/AddCourse/AddCourse";
import AllCourses from "../Pages/AdminDashboard/AdminCourse/AllCourses/AllCourses";
import UpdateCourse from "../Pages/AdminDashboard/AdminCourse/UpdateCourse/UpdateCourse";
import AdminBatch from "../Pages/AdminDashboard/AdminBatch/AdminBatch/AdminBatch";
import AdminCourseCurriculum from "../Pages/AdminDashboard/AdminCourseCurriculum/AdminCourseCurriculum";
import StudentDashboard from "../Pages/AStudentDashboard/StudentDashboard";
import StudentDashboardHome from "../Pages/AStudentDashboard/StudentDashboardHome/StudentDashboardHome";
import StudentProtectedRoute from "./ProtectedRoute/StudentProtectedRoute";
import AllStudent from "../Pages/AdminDashboard/AllStudent/AllStudent/AllStudent";
import CourseDetail from "../Pages/ForAll/CourseDetail/CourseDetail";
import AdminPromocode from "../Pages/AdminDashboard/AdminPromocode/AdminPromocode";
import MyProfile from "../Pages/AStudentDashboard/MyProfile/MyProfile";
import AdditionalInfo from "../Pages/AStudentDashboard/AdditionalInfo/AdditionalInfo";
import Address from "../Pages/AStudentDashboard/Address/Address";
import Education from "../Pages/AStudentDashboard/Education/Education";
import ImportantLink from "../Pages/AStudentDashboard/ImportantLink/ImportantLink";
import AddBlog from "../Pages/AdminDashboard/AdminBlog/AddBlog/AddBlog";
import AdminAssignedStudent from "../Pages/AdminDashboard/AdminAssignedStudent/AdminAssignedStudent";
import UserAllCourses from "../Pages/ForAll/UserAllCourses/UserAllCourses";
import TermsAndConditions from "../Pages/ForAll/TermsAndConditions/TermsAndConditions";
import BlogDetail from "../Pages/AdminDashboard/AdminBlog/AllBlog/BlogDetail/BlogDetail";
import ForgetPassword from "../Pages/UserInterAction/ForgetPassword/ForgetPassword";
import Suvrodeb from "../Pages/Us/Suvrodeb/Suvrodeb";
import InstructorLogin from "../Pages/AInstructorDashboard/InstructorAction/InstructorLogin/InstructorLogin";
import AdminAllInstructor from "../Pages/AdminDashboard/AdminAllInstructor/AdminAllInstructor";
import InstructorProtectedRoute from "./ProtectedRoute/InstructorProtectedRoute";
import InstructorDashboard from "../Pages/AInstructorDashboard/InstructorDashboard";
import InstructorDashboardHome from "../Pages/AInstructorDashboard/InstructorDashboardHome/InstructorDashboardHome";
import InstructorMyProfile from "../Pages/AInstructorDashboard/InstructorMyProfile/InstructorMyProfile";
import InstructorAdditionalInfo from "../Pages/AInstructorDashboard/InstructorAdditionalInfo/InstructorAdditionalInfo";
import InstructorAddress from "../Pages/AInstructorDashboard/InstructorAddress/InstructorAddress";
import InstructorEducation from "../Pages/AInstructorDashboard/InstructorEducation/InstructorEducation";
import InstructorImportantLink from "../Pages/AInstructorDashboard/InstructorImportantLink/InstructorImportantLink";
import InstructorForgetPassword from "../Pages/UserInterAction/InstructorForgetPassword/InstructorForgetPassword";
import InstructorBlog from "../Pages/AInstructorDashboard/InstructorBlog/InstructorBlog";
import AdminOurPeople from "../Pages/AdminDashboard/AdminOurPeople/AdminOurPeople";
import PrivecyPolicy from "../Pages/ForAll/TermsAndConditions/PrivecyPolicy/PrivecyPolicy";
import QRCodeGenerator from "../Pages/AdminDashboard/QRCodeGenerator/QRCodeGenerator";
import TiptapTextEditor from "../Pages/AdminDashboard/AdminBlog/TextEditor/TiptapTextEditor";
import InstructorDetail from "../Pages/ForAll/InstructorDetail/InstructorDetail";
import GoogleLoginn from "../Component/GoogleLoginn/GoogleLoginn";
import SeminarRegistration from "../Component/SeminarRegistration/SeminarRegistration";
// import EnrollCourse from "../Pages/ForAll/EnrollCourse/EnrollCourse";

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
        path: "home",
        element: <Home />,
      },
      {
        path: "all-courses",
        element: <UserAllCourses />,
      },
      {
        path: "course-detail/:id",
        element: <CourseDetail />,
      },
      {
        path: "about-us",
        element: <AboutUs />,
      },
      {
        path: "instructor-detail/:instructorId",
        element: <InstructorDetail />,
      },
      {
        path: "blog",
        element: <Blog />,
      },
      {
        path: "blog/:id",
        element: <BlogDetail />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "terms-and-condition",
        element: <TermsAndConditions />,
      },
      {
        path: "forget-password",
        element: <ForgetPassword />,
      },
      {
        path: "instructor-forget-password",
        element: <InstructorForgetPassword />,
      },
      {
        path: "instructor-log",
        element: <InstructorLogin />,
      },
      {
        path: "privacy-policy",
        element: <PrivecyPolicy />,
      },
      {
        path: "chk-location",
        element: <Suvrodeb />,
      },
      {
        path: "cte",
        element: <TiptapTextEditor />,
      },
      {
        path: "gl",
        element: <GoogleLoginn />,
      },
      {
        path: "seminer-reg",
        element: <SeminarRegistration />,
      },
      // {
      //   path: "enroll-course",
      //   element: <EnrollCourse />,
      // },
    ],
  },

  /**
   * Admin Route
   */
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
        path: "all-student",
        element: (
          <AdminProtectedRoute>
            <AllStudent />
          </AdminProtectedRoute>
        ),
      },
      {
        path: "assigned-student",
        element: (
          <AdminProtectedRoute>
            <AdminAssignedStudent />
          </AdminProtectedRoute>
        ),
      },
      {
        path: "all-instructor",
        element: (
          <AdminProtectedRoute>
            <AdminAllInstructor />
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
        path: "all-course",
        element: (
          <AdminProtectedRoute>
            {" "}
            <AllCourses />
          </AdminProtectedRoute>
        ),
      },
      {
        path: "update-course/:id",
        element: (
          <AdminProtectedRoute>
            {" "}
            <UpdateCourse />
          </AdminProtectedRoute>
        ),
      },
      {
        path: "course-courriculum",
        element: (
          <AdminProtectedRoute>
            {" "}
            <AdminCourseCurriculum />
          </AdminProtectedRoute>
        ),
      },
      {
        path: "admin-batch",
        element: (
          <AdminProtectedRoute>
            {" "}
            <AdminBatch />
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
      {
        path: "our-people",
        element: (
          <AdminProtectedRoute>
            {" "}
            <AdminOurPeople />
          </AdminProtectedRoute>
        ),
      },
      {
        path: "promo-code",
        element: (
          <AdminProtectedRoute>
            {" "}
            <AdminPromocode />
          </AdminProtectedRoute>
        ),
      },
      {
        path: "qrcode-generator",
        element: (
          <AdminProtectedRoute>
            {" "}
            <QRCodeGenerator />
          </AdminProtectedRoute>
        ),
      },
    ],
  },
  /**
   * Student Route
   */
  {
    path: "student-dashboard",
    element: (
      <StudentProtectedRoute>
        <StudentDashboard />
      </StudentProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <StudentProtectedRoute>
            <StudentDashboardHome />{" "}
          </StudentProtectedRoute>
        ),
      },
      {
        path: "my-profile",
        element: (
          <StudentProtectedRoute>
            <MyProfile />
          </StudentProtectedRoute>
        ),
      },
      {
        path: "additional-info",
        element: (
          <StudentProtectedRoute>
            <AdditionalInfo />
          </StudentProtectedRoute>
        ),
      },
      {
        path: "address",
        element: (
          <StudentProtectedRoute>
            <Address />
          </StudentProtectedRoute>
        ),
      },
      {
        path: "education",
        element: (
          <StudentProtectedRoute>
            {" "}
            <Education />
          </StudentProtectedRoute>
        ),
      },
      {
        path: "important-link",
        element: (
          <StudentProtectedRoute>
            {" "}
            <ImportantLink />
          </StudentProtectedRoute>
        ),
      },
    ],
  },

  /**
   * Instructor Route
   */
  {
    path: "instructor-dashboard",
    element: (
      <InstructorProtectedRoute>
        <InstructorDashboard />
      </InstructorProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <InstructorProtectedRoute>
            <InstructorDashboardHome />{" "}
          </InstructorProtectedRoute>
        ),
      },
      {
        path: "add-blog",
        element: (
          <InstructorProtectedRoute>
            <AddBlog />
          </InstructorProtectedRoute>
        ),
      },
      {
        path: "my-blog",
        element: (
          <InstructorProtectedRoute>
            <InstructorBlog />
          </InstructorProtectedRoute>
        ),
      },
      {
        path: "update-blog/:id",
        element: (
          <InstructorProtectedRoute>
            <UpdateBlog />
          </InstructorProtectedRoute>
        ),
      },
      {
        path: "my-profile",
        element: (
          <InstructorProtectedRoute>
            <InstructorMyProfile />
          </InstructorProtectedRoute>
        ),
      },
      {
        path: "additional-info",
        element: (
          <InstructorProtectedRoute>
            <InstructorAdditionalInfo />
          </InstructorProtectedRoute>
        ),
      },
      {
        path: "address",
        element: (
          <InstructorProtectedRoute>
            <InstructorAddress />
          </InstructorProtectedRoute>
        ),
      },
      {
        path: "education",
        element: (
          <InstructorProtectedRoute>
            {" "}
            <InstructorEducation />
          </InstructorProtectedRoute>
        ),
      },
      {
        path: "important-link",
        element: (
          <InstructorProtectedRoute>
            <InstructorImportantLink />
          </InstructorProtectedRoute>
        ),
      },

      {
        path: "qrcode-generator",
        element: (
          <InstructorProtectedRoute>
            {" "}
            <QRCodeGenerator />
          </InstructorProtectedRoute>
        ),
      },
    ],
  },

  /**
   * Login Registration Route
   */
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
  },
]);
