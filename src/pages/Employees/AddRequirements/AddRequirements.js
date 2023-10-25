import React, { useState,useEffect } from 'react';
import './AddRequirements.css';
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import Modal from 'react-modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRectangleXmark  } from "@fortawesome/free-solid-svg-icons";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(350px, 100px)',
  },
};
const AddRequirements = ({getRequirement,handleRequirement,setIsOpen,modalIsOpen,getDepartment,departments}) => {
    const { register, handleSubmit,reset, watch, formState: { errors } } = useForm();
    const [userEnty,setUserEntry] = useState(false);
//     const [departments,setDepartments] = useState([])

//     useEffect(()=>{
//       fetch(`http://localhost:5000/getDepartment`)
//       .then((data)=>data.json())
//       .then(data => setDepartments(data))
// },[])

 
    const onSubmit = data => {

      const requirementData = {
          department:data.department,
          role:data.role,
          designation:data.designation
        }

      const requirementDepartment={
        department:data.department
      }

      const findDepartment = departments.find((department)=> department.department === data.department)


      const handleDepartment = () =>{
        fetch("https://hrm-server-side.onrender.com/requirementDepartment", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requirementDepartment),
      })
        .then((response) => response.json())
        .then((requirementResult) => {
          getDepartment();
          getRequirement();
          toast.success("Requirement Added");
          reset();
          handleRequirement(false);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      }
      
        fetch("https://hrm-server-side.onrender.com/requirement", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requirementData),
    })
      .then((response) => response.json())
      .then((requirementResult) => {
        
        if(findDepartment){
        toast.success("Requirement Added");
        getDepartment();
        getRequirement();
        reset();
        handleRequirement(false);
        }else{
          handleDepartment();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });  
      
      setUserEntry(true);
    };

    function closeModal() {
      setIsOpen(false);
    }
    

    
    return (
    <div>
      <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
      className="requirementModal requirementModal-1 requirement-form"
    >
    <FontAwesomeIcon className='rClosed-btn' onClick={closeModal} icon={faRectangleXmark}/>
        <form onSubmit={handleSubmit(onSubmit)} className="">
        {/* register your input into the hook by invoking the "register" function */}
        <input className="requirement-field" placeholder='Department'  {...register("department")} />
        
        {/* include validation with required or other standard HTML validation rules */}
        <input className="requirement-field" placeholder='Designation' {...register("designation", { required: true })} />
        {/* errors will return when field validation fails  */}
        {errors.exampleRequired && <span>This field is required</span>}

        {/* include validation with required or other standard HTML validation rules */}
        <input className="requirement-field" placeholder='Role' {...register("role", { required: true })} />
        {/* errors will return when field validation fails  */}
        {errors.exampleRequired && <span>This field is required</span>}
        <br />
        <input className='req-subBtn' type="submit" value="Submit" />
      </form>
        </Modal>
      </div>
    );
};

export default AddRequirements;