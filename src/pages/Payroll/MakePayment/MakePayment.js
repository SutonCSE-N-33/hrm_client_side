import React,{useState} from 'react';
import './Makepayment.css';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRectangleXmark  } from "@fortawesome/free-solid-svg-icons";
import MakePaymentForm from './MakePaymentForm/MakePaymentForm';
import MakePaymentList from '../MakePaymentList/MakePaymentList';



const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(490px, 10px)',
    },
  };
const MakePayment = ({getEmployee,setIsOpen,modalIsOpen,basicSalary,user,setHandleHistory}) => {
    
    
    const [handleComponent,setHandleComponent] = useState(true);
    const [paymentList,setPaymentList] = useState({});
    //console.log(paymentList)

  function closeModal() {
    setIsOpen(false);
  }

  const handlePaymentList = (payment) =>{
    setHandleComponent(false);
    setPaymentList(payment);
  }
  

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
        {
            handleComponent 
            ? <MakePaymentForm handlePaymentList={handlePaymentList} basicSalary={basicSalary}></MakePaymentForm> 
            : <MakePaymentList setHandleHistory={setHandleHistory} getEmployee={getEmployee} setHandleComponent={setHandleComponent} user={user} setIsOpen={setIsOpen} paymentList={paymentList}></MakePaymentList>
        }
      
      </Modal>
        </div>
    );
};

export default MakePayment;