import React, { useState,useEffect } from 'react';
import './AddNewEmployeeForm.css';
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { BsPersonFill, IconName } from "react-icons/bs";
import { useQuery } from "react-query";
import Modal from 'react-modal';
import AddRequirements from '../AddRequirements/AddRequirements';
import ResponsiveMenu from '../../../layout/Responsive menu/ResponsiveMenu';

Modal.setAppElement('#root');
const AddNewEmployeeForm = () => {
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
      } = useForm();

      const [findData,setFindData] = useState([]);
      const [identityValue,setIdentityValue] = useState();
      const [modalIsOpen, setIsOpen] = React.useState(false);
      const [departments,setDepartments] = useState([])
      const [requirements,setRequirements] = useState([])
      //get requirement

      // const url=`http://localhost:5000/requirement`
      // const { data: requirements = [],isError, } = useQuery({
      //   queryKey: ["requirements"],
      //   queryFn: async () =>
      //     await fetch(url)
      //     .then((res) => res.json()),
      // });

      const getRequirement = () =>{
        fetch(`https://hrm-server-side.onrender.com/requirement`)
        .then((data)=>data.json())
        .then(data => setRequirements(data))
      }

      //getDepartment
      const getDepartment = () =>{
        fetch(`https://hrm-server-side.onrender.com/getDepartment`)
        .then((data)=>data.json())
        .then(data => setDepartments(data))
      }

      useEffect(()=>{
        getDepartment();
        getRequirement();
      },[])
      
      const handleSelection = (department) =>{
           const findDepartment = requirements.filter(requirement => requirement.department === department);
           setFindData(findDepartment)
      }
      

      const handleIdentity = (id) =>{
        setIdentityValue(id)
      }
      

      //form submiy
      const onSubmit = (data) => {
        const identity = identityValue+"->"+data.identityValue;
        const image = data.profilePicture[0];
        const formData = new FormData();
    
        formData.append("image", image);
    
        fetch(
          "https://api.imgbb.com/1/upload?key=22742c11cc7cbc3bb3001d7c389d4b18",
          {
            method: "POST",
            body: formData,
          }
        )
          .then((response) => response.json())
          .then((result) => {
            const employeeData = {
              fullName: data.firstName + " " + data.lastName,
              contactNumber: data.contactNumber,
              department: data.department,
              designation: data.designation,
              email: data.email,
              employeeId: data.employeeId,
              gender: data.gender,
              officeShift: data.officeShift,
              role: data.role,
              profilePicture: result.data.url,
              salary:data.salary,
              netSalary:data.salary,
              status:"Unpaid",
              identity:identity,
              salaryType:"Select",
              dues:0,
            };
            console.log('data',employeeData)
            fetch("https://hrm-server-side.onrender.com/employee", {
              method: "POST", // or 'PUT'
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(employeeData),
            })
              .then((response) => response.json())
              .then((employeeResult) => {
                toast.success('Employee Added')
                // console.log(employeeResult);
                reset()
              })
              .catch((error) => {
                console.error("Error:", error);
              });
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      };

      //handleRequirement
      const handleRequirements=(decision) => {
        setIsOpen(decision);
      }
    return (
        <div>
        <ResponsiveMenu></ResponsiveMenu>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-5 ">
        <div className=" grid grid-cols-3 justify-between gap-5">
          {/* First Name */}
          <div className="form-control employee-input-card">
            <label className="label">
              <span className="label-text">First Name</span>
            </label>
            <label className="input-group">
              <input
                type="text"
                placeholder="First Name"
                className="input input-bordered"
                {...register("firstName", {
                  required: true,
                  
                })}
                aria-invalid={errors.firstName ? "true" : "false"}
              />
            </label>
            {errors.firstName?.type === "required" && (
              <p className=" text-red-600" role="alert">
                First name is required
              </p>
            )}
            
          </div>
          {/* Last Name */}
          <div className="form-control employee-input-card last-input-card">
            <label className="label">
              <span className="label-text">Last Name</span>
            </label>
            <label className="input-group">
              <input
                type="text"
                placeholder="Last Name"
                className="input input-bordered"
                {...register("lastName", {
                  required: true,
                })}
                aria-invalid={errors.lastName ? "true" : "false"}
              />
            </label>
            {errors.lastName?.type === "required" && (
              <p className=" text-red-600" role="alert">
                First name is required
              </p>
            )}
            
          </div>
          {/* Employee ID*/}
          <div className="form-control employee-input-card employee-card">
            <label className="label">
              <span className="label-text">Employee ID</span>
            </label>
            <label className="input-group">
              <input
                type="text"
                placeholder="Employee ID"
                className="input input-bordered"
                {...register("employeeId", {
                  required: true,
                })}
                aria-invalid={errors.lastName ? "true" : "false"}
              />
            </label>
            {errors.lastName?.type === "required" && (
              <p className=" text-red-600" role="alert">
                Employee ID is required
              </p>
            )}
          </div>
          {/* Contact Number */}
          <div className="form-control employee-input-card contact-input-card">
            <label className="label">
              <span className="label-text">Contact Number</span>
            </label>
            <label className="input-group">
              <input
                type="text"
                placeholder="Contact Number"
                className="input input-bordered"
                {...register("contactNumber", {
                  required: true,
                })}
                aria-invalid={errors.contactNumber ? "true" : "false"}
              />
            </label>
            {errors.contactNumber?.type === "required" && (
              <p className=" text-red-600" role="alert">
                Employee ID is required
              </p>
            )}
          </div>
          {/*Gender */}
          <div className="form-control employee-input-card gender-input-card">
            <label className="label">
              <span className="label-text">Gender</span>
            </label>
            <label className="input-group">
              <select
                {...register("gender")}
                className="select select-bordered w-2/3 max-w-xs"
              >
                <option value="female">female</option>
                <option value="male">male</option>
                <option value="other">other</option>
              </select>
            </label>
          </div>

          {/*Email */}
          <div className="form-control employee-input-card email-input-card">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <label className="input-group">
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered"
                {...register("email", {
                  required: true,
                })}
                aria-invalid={errors.email ? "true" : "false"}
              />
            </label>
            {errors.email?.type === "required" && (
              <p className=" text-red-600" role="alert">
                Employee ID is required
              </p>
            )}
          </div>

          {/*Office Shift */}
          <div className="form-control employee-input-card shift-input-card">
            <label className="label">
              <span className="label-text">Office Shift</span>
            </label>
            <label className="input-group">
              <select
                {...register("officeShift")}
                className="select select-bordered w-2/3 max-w-xs"
              >
                <option value="morning">Morning</option>
                <option value="night">Night</option>
              </select>
            </label>
          </div>

         

          {/*Department */}
          <div className="form-control employee-input-card department-input-card">
            <label className="label">
              <span className="label-text">Department</span>
            </label>
            <label className="input-group">
              <select
                {...register("department")}
                className="select select-bordered w-2/3 max-w-xs"
                
              >
                {
                  departments.map(department => <option onClick={()=>handleSelection(department.department)} value={department.department}>{department.department}</option>)
                }
              </select>

              {/*Button */}
              <button onClick={()=>handleRequirements(true)} className="addNew-btn">Add New</button>
            </label>
          </div>

         


          {/*Designation */}
          <div className="form-control employee-input-card designation-input-card">
            <label className="label">
              <span className="label-text">Designation</span>
            </label>
            <label className="input-group">
              <select
                {...register("designation")}
                className="select select-bordered w-2/3 max-w-xs"
              >
              {
                findData.map(data => <option value={data.designation}>{data.designation}</option>)
              }
              </select>
            </label>
          </div>

          {/*Role */}
          <div className="form-control employee-input-card role-input-card">
          <label className="label">
            <span className="label-text">Role</span>
          </label>
          <label className="input-group">
            <select
              {...register("role")}
              className="select select-bordered w-2/3 max-w-xs"
            >
            {
              findData.map(data => <option value={data.role}>{data.role}</option>)
            }
            </select>
          </label>
        </div>

          {/* Profile Picture */}
          <div className="form-control employee-input-card profile-input-card">
            <label className="label">
              <span className="label-text">Profile Picture</span>
            </label>
            <label className="input-group flex items-center">
              <input
                type="file"
                className="file-input"
                {...register("profilePicture", {
                  required: true,
                })}
                aria-invalid={errors.profilePicture ? "true" : "false"}
              />
            </label>
            {errors.profilePicture?.type === "required" && (
              <p className=" text-red-600" role="alert">
                Image is required
              </p>
            )}
          </div>

          {/*Salary */}
          <div className="form-control employee-input-card salary-input-card">
          <label className="label">
            <span className="label-text">Salary</span>
          </label>
          <label className="input-group">
            <input
              type="text"
              placeholder="Salary Amount"
              className="input input-bordered"
              {...register("salary", {
                required: true,
              })}
              aria-invalid={errors.salary ? "true" : "false"}
            />
          </label>
          {errors.salary?.type === "required" && (
            <p className=" text-red-600" role="alert">
              Salary is required
            </p>
          )}
        </div>
        
        </div>
        
        {/* Identity */}
        
        <div className="identity">
        <div className="form-control employee-input-card identity-input-card">
        <label className="label">
          <span className="label-text">Identity</span>
        </label>
        <label className="input-group">
          <select {...register("role")} className="select select-bordered w-2/3 max-w-xs">
            <option onClick={()=>handleIdentity("passport")} value="General Manager">Passport</option>
            <option onClick={()=>handleIdentity("nId")} value="Head Engineering">NID</option>
            <option onClick={()=>handleIdentity("DrivingLicense")} value="HR Manager">Driving License</option>
            <option onClick={()=>handleIdentity("StudentId")} value="HR Manager">Student Id</option>
          </select>
        </label>
      </div>

      <div>
      {
        identityValue && <div className="form-control employee-input-card sub-identity-card">
        <label className="label">
          <span className="label-text">{identityValue?identityValue:''}</span>
        </label>
        <label className="input-group">
          <input
            type="text"
            // placeholder = `${identityValue}`
            style={{width:"200px"}}
            className="input input-bordered"
            {...register('identityValue', {
              required: true,
            })}
            aria-invalid={errors.email ? "true" : "false"}
          />
        </label>
        {errors.email?.type === "required" && (
          <p className=" text-red-600" role="alert">
            Employee ID is required
          </p>
        )}
      </div>
      }
      </div>
        </div>
       
      

        <div className="flex employee-btn justify-center mt-5">
          <button className="btn btn-sm text-center">
            <input type="submit" />
          </button>
        </div>
      </form>

      <AddRequirements getRequirement={getRequirement} departments={departments} getDepartment={getDepartment} handleRequirement={handleRequirements} setIsOpen={setIsOpen} modalIsOpen={modalIsOpen}></AddRequirements>
        </div>
    );
};

export default AddNewEmployeeForm;