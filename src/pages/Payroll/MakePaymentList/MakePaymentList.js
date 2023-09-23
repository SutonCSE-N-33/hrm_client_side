import React,{useState} from 'react';
import './MakePaymentList.css';
import { toast } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faBangladeshiTakaSign } from "@fortawesome/free-solid-svg-icons";


const MakePaymentList = ({setIsOpen,user,paymentList,setHandleComponent,getEmployee,setHandleHistory}) => {
 const [amount,setAmount] = useState(0);
 const dues = parseInt(paymentList.netSalary) - parseInt(amount);
 
//Update Employee Data
const updateEmployeeData = (paymentList) =>{
    const id = user._id;
      //console.log(data,attendance._id)
      const employeeData = {
        netSalary: paymentList.netSalary,
        status:"Paid",
        dues:dues
    }
      fetch(`http://localhost:5000/updateEmployeeData/${id}`,
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


const handlePayment = () =>{
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
    const paymentData ={
        image:user.profilePicture,
        id:user.employeeId,
        name:user.fullName,
        date:paymentList.date,
        netSalary:paymentList.netSalary,
        paymentDate:day,
        paymentMonth:month,
        paymentYear:year
    }
    fetch("http://localhost:5000/payment", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      })
        .then((response) => response.json())
        .then((employeeResult) => {
          toast.success('Paid');
          updateEmployeeData(paymentList);
          setHandleHistory(false)
          setIsOpen(false);
          setHandleComponent(true);
          // console.log(employeeResult)
        })
        .catch((error) => {
          console.error("Error:", error);
        });
}

const handleAmount = (e) =>{
        setAmount(e.target.value);
}

    return (
        <div>
                <div className="d-flex payment-list">
                    <div>Basic Salary</div>
                    <div><FontAwesomeIcon icon={faBangladeshiTakaSign} /> {paymentList.basicSalary}</div>
                </div>
                <div className="d-flex payment-list">
                    <div>Allowances</div>
                    <div><FontAwesomeIcon icon={faBangladeshiTakaSign} /> {paymentList.allowance}</div>
                </div>
                <div className="d-flex payment-list">
                    <div>Commissions</div>
                    <div><FontAwesomeIcon icon={faBangladeshiTakaSign} /> {paymentList.commissions}</div>
                </div>
                <div className="d-flex payment-list">
                    <div>Reimbursements</div>
                    <div><FontAwesomeIcon icon={faBangladeshiTakaSign} /> {paymentList.reimbursements}</div>
                </div>
                <div className="d-flex payment-list">
                    <div>Deductions</div>
                    <div><FontAwesomeIcon icon={faBangladeshiTakaSign} /> {paymentList.deductions}</div>
                </div>
                <div className="d-flex payment-list">
                    <div>Advance Salary</div>
                    <div><FontAwesomeIcon icon={faBangladeshiTakaSign} /> {paymentList.advanceSalary}</div>
                </div>
                <div className="d-flex payment-list">
                    <div>Loan</div>
                    <div><FontAwesomeIcon icon={faBangladeshiTakaSign} /> {paymentList.loan}</div>
                </div>
                <div className="d-flex" style={{color:"blue",marginTop:"10px",justifyContent:"space-between",fontWeight:"700"}}>
                    <div>Net Salary</div>
                    <div><FontAwesomeIcon icon={faBangladeshiTakaSign} /> {paymentList.netSalary}</div>
                </div>
                <div className="d-flex payment-list" style={{fontWeight:"700"}}>
                    <div>Payment Salary</div>
                    <div><input  type="text" style={{width:"100px"}} onChange={handleAmount} placeholder='Enter Amount' /></div>
                </div>
                <div className="d-flex" style={{color:"blue",marginTop:"10px",justifyContent:"space-between",fontWeight:"700"}}>
                    <div>Dues</div>
                    <div ><FontAwesomeIcon icon={faBangladeshiTakaSign} /> {dues}</div>
                </div><br />
                <button onClick={handlePayment} className="btn btn-primary">Make Payment</button>
                
        </div>
    );
};

export default MakePaymentList;