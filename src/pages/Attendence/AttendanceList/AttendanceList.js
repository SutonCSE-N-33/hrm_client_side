import React from 'react';
import './AttendanceList.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faPenToSquare, faTableList, faTrashCan } from "@fortawesome/free-solid-svg-icons";
const AttendanceList = ({attendance,handleDelete,handleEdit,index}) => {


    
    return (
        <div class="row title d-flex bg-sky-95">
        <div class="col-2 text-center py-2 colum data attribute">
          <span className="mx-2 icon editIcon">
            <FontAwesomeIcon icon={faPenToSquare} onClick={()=>handleEdit(attendance)}></FontAwesomeIcon>
          </span>
          <span className="mx-2 icon deleteIcon">
            <FontAwesomeIcon onClick={()=>handleDelete(attendance._id)} icon={faTrashCan}></FontAwesomeIcon>
          </span>
        </div>
        <div className="col-2 text-center py-2 colum data attribute">{index+1}</div>
        <div className="col-2 text-center py-2 colum data attribute">{attendance.name}</div>
        <div className="col-2 text-center py-2 colum data attribute">{attendance.employeeId}</div>
        <div className="col-2 text-center py-2 colum data attribute">{attendance.date}</div>
        <div className="col-2 text-center py-2 colum data attribute">{attendance.inTime}</div>
        <div className="col-2 text-center py-2 colum data attribute">{attendance.outTime}</div>
      </div>
    );
};

export default AttendanceList;