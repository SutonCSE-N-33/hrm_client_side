import React, {useState } from "react";
import AddRequirements from "../AddRequirements/AddRequirements";
import AddNewEmployeeForm from "../AddNewEmployeeForm/AddNewEmployeeForm";
import './AddNewEmployee.css';

const AddNewEmployee = () => {
const [addEmployee,setAddEmployee] = useState(true);



const handleRequirement =()=>{
  setAddEmployee(false);
}
 
 
  return (
    <div>
            <AddNewEmployeeForm />
    </div>
  );
};

export default AddNewEmployee;
