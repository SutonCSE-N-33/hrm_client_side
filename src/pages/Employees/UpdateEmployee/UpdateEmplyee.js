import React from 'react';
import './UpdateEmployee.css';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRectangleXmark  } from "@fortawesome/free-solid-svg-icons";
const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(530px, 50px)',
    },
  };
const UpdateEmployee = ({setIsOpen,modalIsOpen,employee,showEmployeeList}) => {
    
    const { register, handleSubmit, watch,reset, formState: { errors } } = useForm();

  function closeModal() {
    setIsOpen(false);
  }

  //Edit form submit
  const onSubmit = data => {
    const id = employee._id;
    //console.log(data,attendance._id)
    const employeeData = {
      fullName: data.name,
      designation:data.designation,
      contactNumber: data.contactNumber,
      gender: data.gender,
      role: data.role
  }
    fetch(`https://hrm-server-side.onrender.com/updateEmployee/${id}`,
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
        reset();
        showEmployeeList();
        closeModal();
      }else{
        alert("please Anything Wrong")
      }
    })
       
  };

    return (
        <div>
        <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        className="updateModal updateModal-2"
      >
        <FontAwesomeIcon className='closed-btn' onClick={closeModal} icon={faRectangleXmark}/>
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="">Name</label>
      <input className="form-control input input-bordered" defaultValue={employee.fullName} type="text" {...register("name")} />
      <label htmlFor="">Designation</label>
      <input className="form-control input input-bordered" defaultValue={employee.designation} type="text" {...register("designation")} /> 
      <label htmlFor="">Contact Number</label>
      <input className="form-control input input-bordered" defaultValue={employee.contactNumber} type="text" {...register("contactNumber")} /> 
      <label htmlFor="">Gender</label>
      <input className="form-control input input-bordered" defaultValue={employee.gender} type="text" {...register("gender")} /> 
      <label htmlFor="">Role</label>
      <input className="form-control input input-bordered" defaultValue={employee.role} type="text" {...register("role")} /> <br />
      <input type="submit" className='btn btn-danger .Update-btn' value="Update" />
    </form>
      </Modal>
        </div>
    );
};

export default UpdateEmployee;