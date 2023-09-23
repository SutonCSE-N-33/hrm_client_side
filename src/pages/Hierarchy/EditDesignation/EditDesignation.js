import React from 'react';
import './EditDesignation.css';
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

const EditDesignation = ({setIsOpen,modalIsOpen,data,showList}) => {
    const { register, handleSubmit, watch,reset, formState: { errors } } = useForm();

    function closeModal() {
        setIsOpen(false);
      }

     //Edit Designation
     const onSubmit = paramData => {
         const id = data._id;
  
         const requirementData = {
          department:data.department,
          role:data.role,
          designation:paramData.designation
        }
        fetch(`http://localhost:5000/updateDesignation/${id}`,
        {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "PATCH",
            body: JSON.stringify(requirementData)
        })
        .then(res => res.json())
        .then(data => {
          if(data === true){
            reset();
            showList();
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
      <input className="form-control input input-bordered" defaultValue={data.designation} type="text" {...register("designation")} />
      
      <input type="submit" className='btn btn-danger update-btn' style={{marginTop:"3px"}} value="Update" />
    </form>
      </Modal>
        </div>
    );
};

export default EditDesignation;