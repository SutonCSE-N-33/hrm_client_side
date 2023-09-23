import React,{useState} from 'react';
import './HierarchySubList.css';
import { MdDelete } from "react-icons/md";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faPenToSquare, faTableList, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import Modal from 'react-modal';
import EditDesignation from '../EditDesignation/EditDesignation';
import EditRole from '../EditRole/EditRole';
import EditDepartment from '../EditDepartment/EditDepartment';


Modal.setAppElement('#root');
const HierarchySubList = ({department,findData,showList}) => {

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [designation,setDesignation] = useState({});
  const [defaultDesignation,setDefaultDesignation] = useState({})
  const [role,setRole] = useState({});
  const [defaultRole,setDefaultRole] = useState({})
  const [defaultDepartment,setDefaultDepartment] = useState({})
  const [decision,setDecision] = useState('')



  const handleEdit=(param,require) => {
    if(require === 'designation')
    {
      setIsOpen(true);
      setDefaultDesignation(param);
      setDecision(require)
    }else if(require === 'role')
    {
      setIsOpen(true);
      setDefaultRole(param);
      setDecision(require)
    }else if(require === 'department')
    {
      setIsOpen(true);
      setDefaultDepartment(param);
      setDecision(require)
    }
  }

  let makeDecision;
  if(decision === 'designation')
  {
    makeDecision = <EditDesignation showList={showList} data={defaultDesignation} setIsOpen={setIsOpen} modalIsOpen={modalIsOpen}></EditDesignation>
  }else if(decision === 'role')
  {
    makeDecision = <EditRole showList={showList} data={defaultRole} setIsOpen={setIsOpen} modalIsOpen={modalIsOpen}></EditRole> 
  }else if(decision === 'department')
  {
    makeDecision = <EditDepartment showList={showList} data={defaultDepartment} setIsOpen={setIsOpen} modalIsOpen={modalIsOpen}></EditDepartment>
  }

  //Delete Designation
  const handleDelete = (id) => {
   fetch(`http://localhost:5000/deleteDesignation/${id}`, {
     method: "DELETE", // or 'PUT'
   })
     .then((response) => response.json())
     .then((data) => {
       console.log("Success:", data);
       showList()
     })
     .catch((error) => {
       console.error("Error:", error);
     });
 };


   //Delete Role
   const handleRoleDelete = (id) => {
    console.log(id);
   fetch(`http://localhost:5000/deleteRole/${id}`, {
     method: "DELETE", // or 'PUT'
   })
     .then((response) => response.json())
     .then((data) => {
       console.log("Success:", data);
       showList()
     })
     .catch((error) => {
       console.error("Error:", error);
     });
 };

  //Delete Department
  const handleDepartmentDelete = (id) => {
    const id1 = department.department;
   fetch(`http://localhost:5000/deleteDepartment/${id}`, {
     method: "DELETE", // or 'PUT'
   })
     .then((response) => response.json())
     .then((data) => {
       console.log("Success:", data);
      //  showAnnouncementList();
     })
     .catch((error) => {
       console.error("Error:", error);
     });

     fetch(`http://localhost:5000/deleteDepartmentRequirement/${id1}`, {
      method: "DELETE", // or 'PUT'
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        showList()
      })
      .catch((error) => {
        console.error("Error:", error);
      });
 };
    return (
      <tr>
        <td className="">
        {department.department}
        <div className='d-flex edit-department'>
        <div>
        <MdDelete className='departmentDeleteBtn' style={{cursor:"pointer"}} onClick={()=>handleDepartmentDelete(department._id)}></MdDelete>
        </div>
        <div>
        <span className="mx-2 icon editIcon">
        <FontAwesomeIcon className='departmentEditBtn' icon={faPenToSquare} onClick={()=>handleEdit(department,'department')}></FontAwesomeIcon>
        </span>
        </div>
      </div>
        </td>
          <td className='d-flex designation'>
            <select>
            {
              findData.map((data) => (
                <option onClick={()=>setDesignation(data)} className="" value={data.designation}>
                 {data.designation}
                </option>
                ))
            }
            </select>
         <div className='d-flex'>
          <div>
          <MdDelete className='designationDeleteBtn' style={{cursor:"pointer"}} onClick={()=>handleRoleDelete(designation._id)}></MdDelete>
          </div>
          <div>
          <span className="mx-2 icon editIcon">
          <FontAwesomeIcon icon={faPenToSquare} onClick={()=>handleEdit(designation,'designation')}></FontAwesomeIcon>
          </span>
          </div>
        </div>
          </td>
          <td className="">
            <select>
            {
              findData.map(data => <option onClick={()=>setRole(data)} value={data.role}>{data.role}</option>)
            }
            </select>
            <div className='d-flex role-edit'>
          <div>
          <MdDelete style={{cursor:"pointer"}} onClick={()=>handleDelete(role._id)}></MdDelete>
          </div>
          <div>
          <span className="mx-2 icon editIcon">
          <FontAwesomeIcon className='roleEditBtn' icon={faPenToSquare} onClick={()=>handleEdit(role,'role')}></FontAwesomeIcon>
          </span>
          </div>
        </div>
          </td>
         {makeDecision}
      </tr>
    );
};

export default HierarchySubList;