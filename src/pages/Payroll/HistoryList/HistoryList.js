import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faBangladeshiTakaSign } from "@fortawesome/free-solid-svg-icons";

const HistoryList = ({history}) => {
  const paymentDate = history.paymentDate;
  const month = history.paymentMonth;
  const year = history.paymentYear;
    return (
        <div class="table-row text-center">
            <div class="clm1 name">
              <div className='d-flex'>
                 <img width="30px" style={{borderRadius:"50%"}} src={history.image} alt="" />
                 <p>{history.name}</p>
              </div>
            </div>
            <div class="clm1">{history.id}</div>
            <div class="clm1"><FontAwesomeIcon icon={faBangladeshiTakaSign} /> {history.netSalary}</div>
            <div class="clm1">{history.date}</div>
            <div className="d-flex clm1 justify-content-center">
            <div class="">{paymentDate}</div>
            <div className="">/{month}</div>
            <div className="">/{year}</div>
            </div>
          </div>
    );
};

export default HistoryList;