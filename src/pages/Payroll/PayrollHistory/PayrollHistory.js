import React,{useState,useEffect} from 'react';
import './PayrollHistory.css';
import { useParams } from 'react-router-dom';
import HistoryList from '../HistoryList/HistoryList';


const PayrollHistory = () => {
    const {id} = useParams();
    const [histories,setHistories] =useState([])
    console.log(histories);
    useEffect(()=>{
        fetch('http://localhost:5000/getHistory/'+id)
        .then(res => res.json())
        .then(data => {
            setHistories(data)
        })
    },[id])
    return (
        <div>
            <div className="payroll-container">
      <div className="mb-5 text-black font-normal text-base">
        <span className="font-light ms-1">Payment History</span>
      </div>
     
      <div className="payroll-sheet mt-5">
        <div class="table-row text-center bg-sky-500 tbl-head text-white">
          <div class="clm1">
            <span>Employee</span>
          </div>
          <div class="clm1">
            <span>Employee ID</span>
          </div>
          <div class="clm1">
            <span>Net Payable</span>
          </div>
          <div class="clm1">
            <span>Salary Month</span>
          </div>
          <div class="clm1">
            <span>Pay Date</span>
          </div>
        </div>
        <div>
        {
            histories.map((history) => <HistoryList history={history}></HistoryList>)
        }
      </div>
      </div>
      </div>
        </div>
    );
};

export default PayrollHistory;