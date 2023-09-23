import React,{ useEffect, useState } from "react";
import './Home.css';
import { Link, Outlet } from "react-router-dom";
import Header from "../../Shared/Header/Header";
import { FiHome} from "react-icons/fi";
import { IconName, IoPeopleOutline } from "react-icons/io5";
import { useQuery } from "react-query";
import Admin from '../../../layout/Admin';
import ResponsiveMenu from "../../../layout/Responsive menu/ResponsiveMenu";
const Home = () => {
    const [employeeList,setEmployeeList] = useState([]);
    const [attendanceList,setAttendanceList] = useState([]);
    const latestAnnouncement=attendanceList[attendanceList.length-1];
    
  // const url=`http://localhost:5000/employee`
  // const { data: homeElements = [], isLoading, isError, } = useQuery({
  //   queryKey: ["home"],
  //   queryFn: async () =>
  //     await fetch(url)
  //     .then((res) => res.json()),

  // });

  // const {latestAnnouncement,todaysAttendenceCount, totalEmployee} = homeElements

  // console.log(latestAnnouncement)


  const showEmployeeList = () =>{
    fetch(`http://localhost:5000/employee`)
    .then(res=>res.json())
    .then(data=> setEmployeeList(data))
   }

   const showAttendanceList = () =>{
    fetch(`http://localhost:5000/attendance`)
    .then(res=>res.json())
    .then(data=> setAttendanceList(data))
   }
  useEffect(() => { 
    showEmployeeList(); 
    showAttendanceList()
   },[]);
  
  return (
    <div>
    <ResponsiveMenu></ResponsiveMenu>
      <h1>Home</h1>
      <div className="grid home-header grid-cols-4 gap-4">
        <div className="card w-auto bg-base-100 shadow-xl mt-5">
          <div className="card-body">
            <h2 className="card-title text-center">Total Employees</h2>
            <p className="font-bold card-value text-8xl text-center">{employeeList.length}</p>
            <div className="card-actions justify-center mt-3">
             <Link to="/admin/employees">
             <button className="btn employees-btn btn-primary bg-sky-900 hover:bg-sky-700 border-none">
              Employees
           </button>
             </Link>
            </div>
          </div>
        </div>

        <div className="card w-auto bg-base-100 shadow-xl mt-5 ml-3">
          <div className="card-body">
            <h2 className="card-title text-center">Total Attendance</h2>
            <p className="font-bold card-value text-8xl text-center">{attendanceList.length}</p>
            <div className="card-actions justify-center mt-3">
              <Link to="/admin/attendance">
              <button className="btn employees-btn btn-primary bg-sky-900 hover:bg-sky-700 border-none">
               Attendance
            </button>
              </Link>
            </div>
          </div>
        </div>

        {/* <div className="card w-auto bg-base-100 shadow-xl mt-5 ml-3">
          <div className="card-body">
            <h2 className="card-title text-center">Overtime Employees</h2>
            <p className="font-bold text-8xl text-center">5</p>
            <div className="card-actions justify-center mt-3">
              <button className="btn btn-primary bg-sky-900 hover:bg-sky-700 border-none">
                Go to Overtime
              </button>
            </div>
          </div>
        </div> */}

        {/* <div className="card w-auto bg-base-100 shadow-xl mt-5 ml-3">
          <div className="card-body">
            <h2 className="card-title text-center">Recent Announcments</h2>
            <p className="font-bold text-8xl text-center">3</p>
            <div className="card-actions justify-center mt-3">
              <button className="btn btn-primary bg-sky-900 hover:bg-sky-700 border-none">
                Announcment
              </button>
            </div>
          </div>
        </div> */}
      </div>

      {/* list of Announcments */}

      <div className="card recent-attendance w-auto bg-base-100 shadow-xl mt-5">
        <div className="bg-white p-5 rounded-2xl">
          <div className="flex justify-between mb-5">
            <h2 className=" text-lg font-semibold text-gray-700">
              Recent Announcements
            </h2>
            <Link to="/admin/Announcement">
              {" "}
              <button className=" btn announcement-btn btn-sm btn-primary bg-sky-900 hover:bg-sky-700 border-none">
                Go to Announcement
              </button>
            </Link>
          </div>
        </div>

        <div className="m-5">
          <div className="bg-pink-50 dept-banner rounded-xl">
            <div className="p-5">
              <h1 className="text-2xl font-bold">{latestAnnouncement?.title}</h1>
              <p className="text-xs font-normal">
                <span>{latestAnnouncement?.department}</span> Department{" "}
                <span className="font-bold text-xl text-slate-500">.</span>
                <span>{latestAnnouncement?.startDate}</span>
              </p>
              <p className="py-5">
              {latestAnnouncement?.description}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Announcements section ends here */}
    </div>
  );
};

export default Home;
