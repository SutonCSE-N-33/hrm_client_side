import React, { useEffect, useState } from "react";
import './OverTime.css';
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useQuery } from "react-query";
import Modal from 'react-modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faPenToSquare, faTableList, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import OverTimeList from "./OverTimeList/OverTimeList";
import OverTimeEditForm from "./OverTimeEditForm/OverTimeEditForm";
import ResponsiveMenu from '../../layout/Responsive menu/ResponsiveMenu';

Modal.setAppElement('#root');

const OverTime = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();


  const [employeeOverTime,setEmployeeOverTime]=useState([]);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [defaultOverTime,setDefaultOverTime] = useState(1)

  //Get Attendance
  const showOverTime = () =>{
    fetch(`http://localhost:5000/overtime`)
    .then(res=>res.json())
    .then(data=> setEmployeeOverTime(data))
   }

  useEffect(() => { 
    showOverTime(); 
   },[]);



  const url = `http://localhost:5000/employee`;
  const {
    data: employees = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["overtimes"],
    queryFn: async () => await fetch(url).then((res) => res.json()),
  });

  //   console.log(employees);
  const onSubmit = (data) => {
    console.log(data);

    const employeeData = {
      employeeId: data.employeeId,
      name:data.employeeName,
      date: data.date,
      inTime: data.inTime,
      outTime: data.outTime,
      reason: data.reason
    };
    fetch("http://localhost:5000/overtime", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employeeData),
    })
      .then((response) => response.json())
      .then((employeeResult) => {
        toast.success("Overtime Added");
        // console.log(employeeResult);
        reset();
        showOverTime();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  //Delete OverTime item
  const handleDelete = (id) =>{
    fetch(`http://localhost:5000/overtime/${id}`, {
      method: "DELETE", // or 'PUT'
    })
      .then((response) => response.json())
      .then((data) => {
        showOverTime();
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });  
}

//handle Edit
const handleEdit=(dAttendance) => {
  setIsOpen(true);
  setDefaultOverTime(dAttendance);
}
  return (
    <div>
    <ResponsiveMenu></ResponsiveMenu>
      <h2 className=" text-lg overtime-head font-semibold text-gray-700">Overtime</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-5 ">
        <div className=" grid grid-cols-3 justify-between gap-5">
          {/* Employee ID*/}
          <div className="form-control overtime-input-card">
            <label className="label">
              <span className="label-text">Employee ID</span>
            </label>
            <label className="input-group">
              <select
                {...register("employeeId")}
                className="select select-bordered w-2/3 max-w-xs"
              >
                {employees.map((employee) => (
                  <option key={employee._id} value={employee.employeeId}>
                    {employee.employeeId}
                  </option>
                ))}
              </select>
            </label>
            {errors.lastName?.type === "required" && (
              <p className=" text-red-600" role="alert">
                Employee ID is required
              </p>
            )}
          </div>


          {/* Employee ID*/}
          <div className="form-control overtime-employee-card overtime-input-card">
            <label className="label">
              <span className="label-text">Employee Name</span>
            </label>
            <label className="input-group">
              <select
                {...register("employeeName")}
                className="select select-bordered w-2/3 max-w-xs"
              >
                {employees.map((employee) => (
                  <option key={employee._id} value={employee.fullName}>
                    {employee.fullName}
                  </option>
                ))}
              </select>
            </label>
            {errors.employeeName?.type === "required" && (
              <p className=" text-red-600" role="alert">
                Employee Name is required
              </p>
            )}
          </div>


          {/* Date*/}
          <div className="form-control overtime-date-card overtime-input-card">
            <label className="label">
              <span className="label-text">Date</span>
            </label>
            <label className="input-group">
              <input
                type="date"
                placeholder="Date"
                className="input input-bordered"
                {...register("date", {
                  required: true,
                })}
                aria-invalid={errors.date ? "true" : "false"}
              />
            </label>
            {errors.date?.type === "required" && (
              <p className=" text-red-600" role="alert">
                Employee ID is required
              </p>
            )}
          </div>

          <div className="form-control overtime-inTime-card overtime-input-card">
            <label className="label">
              <span className="label-text">In Time</span>
            </label>
            <label className="input-group">
              <input
                type="time"
                placeholder="In Time"
                className="input input-bordered"
                {...register("inTime", {
                  required: true,
                })}
                aria-invalid={errors.inTime ? "true" : "false"}
              />
            </label>
            {errors.inTime?.type === "required" && (
              <p className=" text-red-600" role="alert">
                Employee ID is required
              </p>
            )}
          </div>

          <div className="form-control overtime-outTime-card overtime-input-card">
            <label className="label">
              <span className="label-text">Out Time</span>
            </label>
            <label className="input-group">
              <input
                type="time"
                placeholder="Out Time"
                className="input input-bordered"
                {...register("outTime", {
                  required: true,
                })}
                aria-invalid={errors.outTime ? "true" : "false"}
              />
            </label>
            {errors.outTime?.type === "required" && (
              <p className=" text-red-600" role="alert">
                Employee ID is required
              </p>
            )}
          </div>

          <div className="form-control overtime-reason-card overtime-input-card">
            <label className="label">
              <span className="label-text">Reason</span>
            </label>
            <label className="input-group">
              <input
                type="text"
                placeholder="Reason"
                className="input input-bordered"
                {...register("reason", {
                  required: true,
                })}
                aria-invalid={errors.reason ? "true" : "false"}
              />
            </label>
            {errors.reason?.type === "required" && (
              <p className=" text-red-600" role="alert">
                Employee ID is required
              </p>
            )}
          </div>
        </div>

        <div className="flex overtime-btn justify-center mt-5">
          <button className="btn btn-sm text-center">
            <input type="submit" value="Submit" />
          </button>
        </div>
      </form>


      <div class="attendanceList text-center mt-5">
      <div class="row title d-flex bg-sky-100">
        <div class="col-2 text-center py-2 colum attribute">
          <span className="icon">
          <FontAwesomeIcon icon={faTableList}></FontAwesomeIcon>
          </span>
        </div>
        <div className="col-md-2 text-center py-2 colum attribute">Si.No</div>
        <div className="col-md-2 text-center py-2 colum attribute">Name</div>
        <div className="col-2 text-center py-2 colum attribute">Employee ID</div>
        <div className="col-2 text-center py-2 colum attribute">Date</div>
        <div className="col-2 text-center py-2 colum attribute">In Time</div>
        <div className="col-2 text-center py-2 colum attribute">Out Time</div>
      </div>
      {
        employeeOverTime.map((overTime,index) => <OverTimeList index={index} handleEdit={handleEdit} handleDelete={handleDelete} overTime={overTime}></OverTimeList>)
      }
    </div>
        <OverTimeEditForm showOverTime={showOverTime} overtime={defaultOverTime} setIsOpen={setIsOpen} modalIsOpen={modalIsOpen}></OverTimeEditForm>

    </div>
  );
};

export default OverTime;
