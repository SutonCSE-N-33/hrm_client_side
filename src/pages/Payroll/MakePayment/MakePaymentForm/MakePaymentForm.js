import React from 'react';
import { useForm } from "react-hook-form";
import './MakepaymentForm.css';
const MakePaymentForm = ({basicSalary,handlePaymentList}) => {
    const { register, handleSubmit, watch,reset, formState: { errors } } = useForm();


//Edit form submit
const onSubmit = data => {
    
    const advanceSalary = parseInt(data.AdvanceSalary);
    const allowance = parseInt(data.Allowances);
    const commissions = parseInt(data.Commissions);
    const deductions = parseInt(data.Deductions);
    const loan = parseInt(data.Loan);
    const reimbursements = parseInt(data.Reimbursements);
    const netSalary = basicSalary+advanceSalary+allowance+commissions+loan+reimbursements-deductions;

    const salaryData = {
        date:data.date,
        advanceSalary:advanceSalary,
        allowance:allowance,
        commissions:commissions,
        deductions:deductions,
        loan:loan,
        reimbursements:reimbursements,
        netSalary:netSalary,
        basicSalary:basicSalary 
    }
    handlePaymentList(salaryData);
    reset();
  };
    return (
        <div>
        <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="">Month</label>
        <input className="form-control input input-bordered"  type="date" {...register("date")} /> 
        <label htmlFor="">Basic Salary</label>
        <input className="form-control input input-bordered" defaultValue={basicSalary}  type="text" {...register("BasicSalary")} /> 
        <label htmlFor="">Allowances</label>
        <input className="form-control input input-bordered"  type="text" {...register("Allowances")} /> 
        <label htmlFor="">Commissions</label>
        <input className="form-control input input-bordered"  type="text" {...register("Commissions")} /> 
        <div className="d-flex">
        <div>
        <label htmlFor="">Reimbursements</label>
        <input className="form-control input input-bordered"  type="text" {...register("Reimbursements")} />
        </div>
        <div>
        <label htmlFor="">Deductions</label>
        <input className="form-control input input-bordered"  type="text" {...register("Deductions")} /> 
        </div>
        </div>
  
        <div className="d-flex">
        <div>
        <label htmlFor="">Advance Salary</label>
        <input className="form-control input input-bordered"  type="text" {...register("AdvanceSalary")} />
        </div>
        <div>
        <label htmlFor="">Loan</label>
        <input className="form-control input input-bordered"  type="text" {...register("Loan")} /> 
        </div>
        </div><br />
        
        <input type="submit" className='btn btn-danger update-btn' value="Continue" />
      </form>
        </div>
    );
};

export default MakePaymentForm;