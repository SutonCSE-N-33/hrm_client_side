import { createBrowserRouter } from "react-router-dom";
import Admin from "../layout/Admin";
import AddAnnouncement from "../pages/Announcement/AddAnnouncement/AddAnnouncement";
import Announcement from "../pages/Announcement/Announcement/Announcement";
import AddNewEmployee from "../pages/Employees/AddNewEmployee/AddNewEmployee";
import Employees from "../pages/Employees/Employees/Employees";
import Home from "../pages/Home/Home/Home";
import LoginPage from "../pages/Login/LoginPage";
import OverTime from "../pages/OverTime/OverTime";
import PrivateRoute from "./PrivateRoute";
import Attendance from "../pages/Attendence/Attendence";
import Payroll from "../pages/Payroll/Payroll/Payroll";
import PayrollHistory from "../pages/Payroll/PayrollHistory/PayrollHistory";
import Hierarchy from "../pages/Hierarchy/Hierarchy";
import UserAnnouncementList from "../pages/Announcement/UserAnnouncementList/UserAnnouncementList";

export const router = createBrowserRouter([
  {
     path: "/admin",
     element: <PrivateRoute><Admin></Admin></PrivateRoute>,
    children: [
      {
        path: "/admin",
        element: <Home></Home>,
      },
      {
        path: "/admin/employees",
        element: <Employees></Employees>,
      },
      {
        path: "/admin/addnewemployee",
        element: <AddNewEmployee></AddNewEmployee>,
      },
      {
        path: "/admin/announcement",
        element: <Announcement></Announcement>,
      },
     
      {
        path: "/admin/addannouncement",
        element: <AddAnnouncement></AddAnnouncement>,
      },
      {
        path: "/admin/attendance",
        element: <Attendance></Attendance>,
      },
      {
        path: "/admin/overtime",
        element: <OverTime></OverTime>,
      },
      {
        path: "/admin/payroll",
        element: <Payroll></Payroll>,
      },
      {
        path: "/admin/payroll/history/:id",
        element: <PayrollHistory></PayrollHistory>,
      },
      {
        path: "/admin/hierarchy",
        element: <Hierarchy></Hierarchy>,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/",
    element: <UserAnnouncementList></UserAnnouncementList>,
  }, 
]);
