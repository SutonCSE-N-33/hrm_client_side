import React, { useEffect, useState }  from "react";
import './Employees.css';
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import Modal from 'react-modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faPenToSquare, faTableList, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import UpdateEmployee from "../UpdateEmployee/UpdateEmplyee";
import { Circles } from 'react-loader-spinner'
import ResponsiveMenu from "../../../layout/Responsive menu/ResponsiveMenu";
Modal.setAppElement('#root');
const Employees = () => {
  const [employeesList,setEmployeesList] = useState([])
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [defaultEmployee,setDefaultEmployee] = useState(1)

  const url=`https://hrm-server-side.onrender.com/employee`
  const { data: employees = [], isLoading, isError, } = useQuery({
    queryKey: ["employees"],
    queryFn: async () =>
      await fetch(url)
      .then((res) => res.json()),

  });


  const showEmployeeList = () =>{
    fetch(`https://hrm-server-side.onrender.com/employee`)
    .then(res=>res.json())
    .then(data=> setEmployeesList(data))
   }

  useEffect(() => { 
    showEmployeeList(); 
   },[]);

  if (isLoading) {
    return <Circles
    height="80"
    width="80"
    color="#4fa94d"
    ariaLabel="circles-loading"
    wrapperStyle={{}}
    wrapperClass=""
    visible={true}
    className="text-center"
  />
  }
  // console.log(employees);



  //DeleteAttendance
  const handleDelete = (id) =>{
    fetch(`https://hrm-server-side.onrender.com/employee/${id}`, {
      method: "DELETE", // or 'PUT'
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        showEmployeeList();
      })
      .catch((error) => {
        console.error("Error:", error);
      });  
}


//Edit Form
 const handleEdit=(dEmployee) => {
 setIsOpen(true);
 setDefaultEmployee(dEmployee);
}

  return (
    <div>
      <ResponsiveMenu></ResponsiveMenu>
      <div className="mb-3 text-black direction font-normal text-base">
        Home {">"}{" "}
        <span className="font-light">Employees</span>
      </div>
      <div className="bg-white employees-banner p-5 rounded-md">
        <div className="flex justify-between mb-5">
          <h2 className=" text-lg font-semibold emp-title text-gray-700">
            List All Employees
          </h2>
          <Link to="/admin/addnewemployee">
            {" "}
            <button className=" add-btn btn btn-sm btn-primary bg-sky-900 hover:bg-sky-700 border-none">
              + Add New
            </button>
          </Link>
        </div>
        <div className="overflow-scroll employee-list w-full">
          <table className="table w-full">
            {/* <!-- head --> */}
            <thead>
              <tr>
                <th className="">Edit</th>
                <th className="th-1">Name</th>
                <th className="th-1">DESIGNATION</th>
                <th className="th-1">CONTACT NUMBER</th>
                <th className="th-1">GENDER</th>
                <th className="th-1">ROLE</th>
              </tr>
            </thead>
            <tbody>
              {/* <!-- row 1 --> */}

              {employees.map((employee) => (
                <tr key={employee._id}>
                <td>
                <div class="col-2 py-2 data attribute">
                <span className="mx-2 icon editIcon">
                  <FontAwesomeIcon icon={faPenToSquare} onClick={()=>handleEdit(employee)}></FontAwesomeIcon>
                </span>
                <span className="mx-2 icon deleteIcon">
                  <FontAwesomeIcon onClick={()=>handleDelete(employee._id)} icon={faTrashCan}></FontAwesomeIcon>
                </span>
              </div>
                </td>
                  <td className="td-1">
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={employee.profilePicture}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{employee.fullName}</div>
                        <div>{employee.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="td-1">{employee.designation}</td>
                  <td className="td-1">{employee.contactNumber}</td>
                  <td className="td-1">{employee.gender}</td>
                  <td className="td-1">{employee.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <UpdateEmployee showEmployeeList={showEmployeeList} employee={defaultEmployee} setIsOpen={setIsOpen} modalIsOpen={modalIsOpen}></UpdateEmployee>
    </div>
  );
};

export default Employees;
