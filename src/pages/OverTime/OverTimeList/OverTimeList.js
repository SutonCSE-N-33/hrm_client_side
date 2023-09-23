import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faPenToSquare, faTableList, faTrashCan } from "@fortawesome/free-solid-svg-icons";
const OverTimeList = ({overTime,handleDelete,handleEdit,index}) => {
    return (
        <div>
        <div class="row title d-flex bg-sky-95">
        <div class="col-2 text-center py-2 colum data attribute">
          <span className="mx-2 icon editIcon">
            <FontAwesomeIcon icon={faPenToSquare} onClick={()=>handleEdit(overTime)}></FontAwesomeIcon>
          </span>
          <span className="mx-2 icon deleteIcon">
            <FontAwesomeIcon onClick={()=>handleDelete(overTime._id)} icon={faTrashCan}></FontAwesomeIcon>
          </span>
        </div>
        <div className="col-2 text-center py-2 colum data attribute">{index+1}</div>
        <div className="col-2 text-center py-2 colum data attribute">{overTime.name}</div>
        <div className="col-2 text-center py-2 colum data attribute">{overTime.employeeId}</div>
        <div className="col-2 text-center py-2 colum data attribute">{overTime.date}</div>
        <div className="col-2 text-center py-2 colum data attribute">{overTime.inTime}</div>
        <div className="col-2 text-center py-2 colum data attribute">{overTime.outTime}</div>
      </div>
        </div>
    );
};

export default OverTimeList;