import React from "react";
import { FiHome } from "react-icons/fi";
import { IoPeopleOutline } from "react-icons/io5";
import { Link, Outlet } from "react-router-dom";
import Header from "../pages/Shared/Header/Header";
import { MdOutlineAnnouncement,MdOutlinePayment} from "react-icons/md";
import { FcOvertime } from "react-icons/fc";
import { AiOutlineFieldTime } from "react-icons/ai";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSitemap} from "@fortawesome/free-solid-svg-icons";
const Admin = () => {
  return (
    <div>
      <div>
        <Header></Header>
        <div className="drawer sidebar drawer-mobile bg-base-700">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content p-5 bg-sky-50">
            {/* <!-- Page content here --> */}
            {/* <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            Open drawer
          </label> */}
           <Outlet></Outlet>
          </div>
          <div className="drawer-side">
            <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
            <ul className="menu p-4 w-80 bg-base-100 text-base-content font-semibold text-lg">
              {/* <!-- Sidebar content here --> */}
              <li className="rounded-none">
                <Link style={{textDecoration:"none"}} to="/admin" className="active:bg-sky-900">
                  <FiHome></FiHome>Home
                </Link>
              </li>
              <li>
                <Link style={{textDecoration:"none"}} to="/admin/employees" className="active:bg-sky-900">
                  <IoPeopleOutline></IoPeopleOutline> Employees
                </Link>
              </li>
              <li>
                <Link style={{textDecoration:"none"}} to="/admin/announcement" className="active:bg-sky-900">
                  <MdOutlineAnnouncement></MdOutlineAnnouncement> Announcement
                </Link>
              </li>
              <li>
                <Link style={{textDecoration:"none"}} to="/admin/attendance" className="active:bg-sky-900">
                  <AiOutlineFieldTime></AiOutlineFieldTime> Attendance
                </Link>
              </li>
              <li>
                <Link style={{textDecoration:"none"}} to="/admin/overtime" className="active:bg-sky-900">
                  <FcOvertime></FcOvertime> Overtime
                </Link>
              </li>
              <li>
                <Link style={{textDecoration:"none"}} to="/admin/payroll" className="active:bg-sky-900">
                  <MdOutlinePayment></MdOutlinePayment> Payroll
                </Link>
              </li>
              <li>
                <Link style={{textDecoration:"none"}} to="/admin/hierarchy" className="active:bg-sky-900">
                <FontAwesomeIcon icon={faSitemap} /> Hierarchy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
