import React from 'react';
import './OverTimeEditForm.css';
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
      transform: 'translate(530px, 40px)',
    },
  };
const OverTimeEditForm = ({setIsOpen,modalIsOpen,overtime,showOverTime}) => {
    const { register, handleSubmit, watch,reset, formState: { errors } } = useForm();

  function closeModal() {
    setIsOpen(false);
  }

  //Edit form submit
  const onSubmit = data => {
    const id = overtime._id;
    //console.log(data,attendance._id)
    const overtimeData = {
        employeeId: data.employeeId,
        name:data.employeeName,
        date: data.date,
        inTime: data.inTime,
        outTime: data.outTime,
        reason: data.reason

  }
    fetch(`https://hrm-server-side.onrender.com/updateOvertime/${id}`,
    {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "PATCH",
        body: JSON.stringify(overtimeData)
    })
    .then(res => res.json())
    .then(data => {
      if(data === true){
        reset();
        showOverTime();
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
      <input className="form-control input input-bordered" defaultValue={overtime.employeeId} type="text" {...register("employeeId")} />
      <label htmlFor="">Name</label>
      <input className="form-control input input-bordered" defaultValue={overtime.name} type="text" {...register("employeeName")} /> 
      <label htmlFor="">Date</label>
      <input className="form-control input input-bordered" defaultValue={overtime.date} type="date" {...register("date")} /> 
      <label htmlFor="">In Time</label>
      <input className="form-control input input-bordered" defaultValue={overtime.inTime} type="time" {...register("inTime")} /> 
      <label htmlFor="">Out Time</label>
      <input className="form-control input input-bordered" defaultValue={overtime.outTime} type="time" {...register("outTime")} /> 
      <label htmlFor="">Reason</label>
      <input className="form-control input input-bordered" defaultValue={overtime.reason}  type="time" {...register("reason")} />
      <input type="submit" className='btn btn-danger update-btn' style={{marginTop:"3px"}} value="Update" />
    </form>
      </Modal>
        </div>
    );
};

export default OverTimeEditForm;