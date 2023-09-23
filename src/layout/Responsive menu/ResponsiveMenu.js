import React from 'react';
import './ResponsiveMenu.css';
import { Link, Outlet } from "react-router-dom";
const ResponsiveMenu = () => {
    return (
        <div className="responsive-menu">
        <ul>
          <li>
          <Link style={{textDecoration:"none"}} to="/admin" className="active:bg-sky-900 link-color">
          Home
        </Link>
          </li>
          <li>
          <Link style={{textDecoration:"none"}} to="/admin/employees" className="active:bg-sky-900 link-color">
           Employees
          </Link>
          </li>
          <li>
          <Link style={{textDecoration:"none"}} to="/admin/announcement" className="active:bg-sky-900 link-color">
          Announcement
        </Link>
          </li>
          <li>
          <Link style={{textDecoration:"none"}} to="/admin/attendance" className="active:bg-sky-900 link-color">
           Attendance
          </Link>
          </li>
          <li>
          <Link style={{textDecoration:"none"}} to="/admin/overtime" className="active:bg-sky-900 link-color">
          Overtime
        </Link>
          </li>
          <li>
          <Link style={{textDecoration:"none"}} to="/admin/payroll" className="active:bg-sky-900 link-color">
          Payroll
        </Link>
          </li>
          <li>
          <Link style={{textDecoration:"none"}} to="/admin/hierarchy" className="active:bg-sky-900 link-color">
          Hierarchy
        </Link>
          </li>
        </ul>
      </div>
    );
};

export default ResponsiveMenu;