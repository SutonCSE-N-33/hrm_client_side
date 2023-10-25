import React, { useEffect, useState } from "react";
import { faSearch,faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Payroll.css";
import PayrollList from "../PayrollList/PayrollList";
import MakePayment from "../MakePayment/MakePayment";
import Modal from 'react-modal';
import MakePaymentList from "../MakePaymentList/MakePaymentList";
import ResponsiveMenu from '../../../layout/Responsive menu/ResponsiveMenu';
Modal.setAppElement('#root');
const Payroll = () => {
  const [employees, setEmployees] = useState([]);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [basicSalary,setBasicSalary] = useState(0);
  const [user,setUser] = useState({});
  const [handleHistory,setHandleHistory]=useState(true);
  const [employeeName,setEmployeeName] = useState('');

  console.log(employeeName)
 
  const getEmployee = () => {
   
    fetch(`https://hrm-server-side.onrender.com/employee`)
      .then((res) => res.json())
      .then((data) => setEmployees(data));
  };

 
  //console.log(employees);

  useEffect(() => {
    getEmployee();
  }, []);

  const handlePayment=(salary,user) => {
    setIsOpen(true);
    setBasicSalary(salary);
    setUser(user)
  }


  const takeEmployee = (e) =>{
        console.log(e.target.value);
  }

  const handleFiltering = (e) =>{
   const name = employees.filter((employee) => employee.employeeName === employeeName)
   console.log(name)
  }


  return (
    <div className="payroll-container">
    <ResponsiveMenu></ResponsiveMenu>
      <div className="mb-5 text-black font-normal text-base">
        <span className="font-light ms-1">Payroll</span>
      </div>
      <div className="filter-input">
        <div class="card payroll-card">
          <div class="card-body">
            <div class="row">
              <div class="col-md-4 pe-3">
                <div class="">
                  <label for="name" class="form-label">
                    Employee
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="name"
                    placeholder="Enter Employee Name"
                    onChange={takeEmployee}
                  />
                </div>
              </div>
              <div class="col-md-4">
                <button onClick={handleFiltering} className="search-btn">Search</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="payroll-sheet mt-5">
        <div class="table-row text-center bg-sky-700 text-white">
          <div class="clm">
            <span>Employee</span>
          </div>
          <div class="clm">
            <span>Employee ID</span>
          </div>
          <div class="clm">
            <span>Payslip Type</span>
          </div>
          <div class="clm">
            <span>Basic Salary</span>
          </div>
          <div class="clm">
            <span>Net Salary</span>
          </div>
          <div class="clm">
            <span>Dues</span>
          </div>
          <div class="clm">
            <span>Status</span>
          </div>
        </div>
        <div>
        {
          employees.map((employee) => <PayrollList getEmployee={getEmployee} handleHistory={handleHistory} handlePayment={handlePayment} employee={employee}></PayrollList>)
        }
      </div>
      </div>
      <MakePayment setHandleHistory={setHandleHistory} getEmployee={getEmployee} user={user} basicSalary={basicSalary} setIsOpen={setIsOpen} modalIsOpen={modalIsOpen}></MakePayment>
    </div>
  );
};

export default Payroll;
