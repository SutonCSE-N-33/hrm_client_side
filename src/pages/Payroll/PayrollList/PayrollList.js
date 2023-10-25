import React,{useState} from 'react';
import '../Payroll/Payroll.css';
import './PayrollList.css';
import { Link, Outlet } from "react-router-dom";
import { faSearch,faCreditCard,faBangladeshiTakaSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const PayrollList = ({employee,handlePayment,handleHistory,getEmployee}) => {
    const salary = parseInt(employee.salary);
    const netSalary = parseInt(employee.netSalary);
    const dues = parseInt(employee.dues);
    
//handle hover

let button;
    if(employee.status === 'Paid'){
     button = <span
     type="button"
     className="icon bg-sky-50"
   >
     <Link to={`/admin/payroll/history/`+employee.employeeId}>View History</Link>
   </span>
    }else{
    button = <span
    type="button"
    className="icon bg-sky-50"
  >
    <FontAwesomeIcon onClick={()=>handlePayment(salary,employee)} icon={faCreditCard}></FontAwesomeIcon>
  </span>
    } 

    const updateEmployeeData = (type) =>{
      const id = employee._id;
        //console.log(data,attendance._id)
        const employeeData = {
          salaryType:type
          
      }
        fetch(`https://hrm-server-side.onrender.com/updateSalaryType/${id}`,
        {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "PATCH",
            body: JSON.stringify(employeeData)
        })
        .then(res => res.json())
        .then(data => {
          if(data === true){
              getEmployee();
          }else{
            alert("please Anything Wrong")
          }
        })
    }

    const handlePayType = (type) =>{
      updateEmployeeData(type);
      
    }
    let type;
    if(employee.salaryType === 'Select'){
      type = <select className="select max-w-xs" style={{width:"10px",height:"10px"}}>
      <option onClick={()=>handlePayType("employee")} value="Employee">Employee</option>
      <option onClick={()=>handlePayType("worker")} value="Worker">Worker</option>
      </select>
    }else{
      type = "";
    }
    
    return (
        <div class="table-row text-center">
            <div class="clm name">
              <div className='d-flex'>
                 <img width="30px" style={{borderRadius:"50%"}} src={employee.profilePicture} alt="" />
                 <p>{employee.fullName}</p>
              </div>
              <div>
              {
                button
              }
            </div>
            </div>
            <div class="clm">{employee.employeeId}</div>
            {type?
            <div class="clm d-flex" style={{justifyContent:"space-between"}}>
            <div>{employee.salaryType}</div>
            <div>
               {type}
            </div>
            </div>
            :<div class="clm d-flex ">
            <div className="text-center">{employee.salaryType}</div>
            </div>
            }
            <div class="clm"><FontAwesomeIcon icon={faBangladeshiTakaSign} /> {salary.toFixed(2)}</div>
            <div class="clm"><FontAwesomeIcon icon={faBangladeshiTakaSign} /> {netSalary.toFixed(2)}</div>
            <div class="clm"><FontAwesomeIcon icon={faBangladeshiTakaSign} /> {dues.toFixed(2)}</div>
            <div class="clm">{employee.status}</div>
          </div>
    );
};

export default PayrollList;