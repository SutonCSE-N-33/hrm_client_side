import React from 'react';
import './EditAnnouncement.css';
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
      transform: 'translate(530px, 30px)',
    },
  };
const EditAnnouncement = ({setIsOpen,modalIsOpen,announcement,showAnnouncementList}) => {
    console.log(announcement);
    
    const { register, handleSubmit, watch,reset, formState: { errors } } = useForm();

  function closeModal() {
    setIsOpen(false);
  }

  //Edit form submit
  const onSubmit = data => {
    const id = announcement._id;
    //console.log(data,attendance._id)
    const announcements = {
        title: data.title,
        startDate: data.startDate,
        endDate: data.endDate,
        department: data.department,
        summery: data.summery,
        description: data.description,
       
      };
    fetch(`http://localhost:5000/updateAnnouncement/${id}`,
    {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "PATCH",
        body: JSON.stringify(announcements)
    })
    .then(res => res.json())
    .then(data => {
      if(data === true){
        reset();
        showAnnouncementList();
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
      <label htmlFor="">Title</label>
      <input className="form-control input input-bordered" defaultValue={announcement.title} type="text" {...register("title")} />
      <label htmlFor="">Start Date</label>
      <input className="form-control input input-bordered" defaultValue={announcement.startDate} type="date" {...register("startDate")} /> 
      <label htmlFor="">EndDate</label>
      <input className="form-control input input-bordered" defaultValue={announcement.endDate} type="date" {...register("endDate")} /> 
      <label htmlFor="">Department</label>
      <input className="form-control input input-bordered" defaultValue={announcement.department} type="text" {...register("department")} /> 
      <label htmlFor="">Summery</label>
      <input className="form-control input input-bordered" defaultValue={announcement.summery} type="text" {...register("summery")} /> 
      <label htmlFor="">Description</label>
      <input className="form-control input input-bordered" defaultValue={announcement.description} type="text" {...register("description")} /> 
      <input type="submit" className='btn btn-danger update-btn' style={{marginTop:"3px"}} value="Update" />
    </form>
      </Modal>
        </div>
    );
};

export default EditAnnouncement;