import React from 'react';
import './EditForm.css';
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
const EditForm = ({setIsOpen,modalIsOpen,attendance,showAttendanceList}) => {
    
    const { register, handleSubmit, watch,reset, formState: { errors } } = useForm();

  function closeModal() {
    setIsOpen(false);
  }

  //Edit form submit
  const onSubmit = data => {
    const id = attendance._id;
    //console.log(data,attendance._id)
    const employeeData = {
      employeeId: data.employeeId,
      name:data.employeeName,
      date: data.date,
      inTime: data.inTime,
      outTime: data.outTime

  }
    fetch(`http://localhost:5000/updateAttendance/${id}`,
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
        showAttendanceList();
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
      <label htmlFor="">ID</label>
      <input className="form-control input input-bordered" defaultValue={attendance.employeeId} type="text" {...register("employeeId")} />
      <label htmlFor="">Name</label>
      <input className="form-control input input-bordered" defaultValue={attendance.name} type="text" {...register("employeeName")} /> 
      <label htmlFor="">Date</label>
      <input className="form-control input input-bordered" defaultValue={attendance.date} type="date" {...register("date")} /> 
      <label htmlFor="">In Time</label>
      <input className="form-control input input-bordered" defaultValue={attendance.inTime} type="time" {...register("inTime")} /> 
      <label htmlFor="">Out Time</label>
      <input className="form-control input input-bordered" defaultValue={attendance.outTime} type="time" {...register("outTime")} /> <br />
      <input type="submit" className='btn btn-danger update-btn' value="Update" />
    </form>
      </Modal>
        </div>
    );
};

export default EditForm;