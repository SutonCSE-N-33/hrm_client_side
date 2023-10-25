import React,{useState,useEffect} from "react";
import './Announcement.css';
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faPenToSquare, faTableList, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import Modal from 'react-modal';
import EditAnnouncement from "../EditAnnouncement/EditAnnouncement";
import ResponsiveMenu from '../../../layout/Responsive menu/ResponsiveMenu';



Modal.setAppElement('#root');
const Announcement = () => {
  const [announcementList,setAnnouncementList] = useState([]);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [defaultAnnouncement,setDefaultAnnouncement] = useState(1)

  // const url = `http://localhost:5000/announcement`;
  // const {
  //   data: announcements = [],
  //   isLoading,
  //   isError,
  // } = useQuery({
  //   queryKey: ["announcements"],
  //   queryFn: async () => await fetch(url).then((res) => res.json()),
  // });

  const showAnnouncementList = () =>{
    fetch(`https://hrm-server-side.onrender.com/announcement`)
    .then(res=>res.json())
    .then(data=> setAnnouncementList(data))
   }

   useEffect(() => { 
    showAnnouncementList(); 
   },[]);

  // console.log(announcements)

  const handleDelete = (id) => {
     console.log(id);
    fetch(`https://hrm-server-side.onrender.com/announcement/${id}`, {
      method: "DELETE", // or 'PUT'
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        showAnnouncementList();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // if (isLoading) {
  //   return <span>Loading...</span>;
  // }

  const handleEdit=(dAnnouncement) => {
    setIsOpen(true);
    setDefaultAnnouncement(dAnnouncement);
  }
  return (
    <div>
    <ResponsiveMenu></ResponsiveMenu>
      <div className="bg-white announce-banner p-5 rounded-md">
        <div className="flex justify-between mb-5">
          <h2 className=" text-lg a-title font-semibold text-gray-700">
            List of Announcement
          </h2>
          <Link to="/admin/addannouncement">
            {" "}
            <button className="a-btn btn btn-sm btn-primary bg-sky-900 hover:bg-sky-700 border-none">
              + Add New
            </button>
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto announcement-list w-full">
        <table className="table w-full ">
          {/* <!-- head --> */}
          <thead>
            <tr>
              <th>Title</th>
              <th>Department</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Delete</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {/* <!-- row 1 --> */}

            {announcementList.map((announcement) => (
              <tr key={announcement?._id}>
                <td>
                  <div className="flex items-center space-x-3">
                    <div>
                      <div className="font-bold">{announcement?.title}</div>
                    </div>
                  </div>
                </td>
                <td>{announcement?.department}</td>
                <td>{announcement?.startDate}</td>
                <td>{announcement?.endDate}</td>
                <td  >
                  <MdDelete style={{cursor:"pointer"}} onClick={() => handleDelete(announcement?._id)}></MdDelete>
                </td>
               <td>
               <span className="mx-2 icon editIcon">
               <FontAwesomeIcon icon={faPenToSquare} onClick={()=>handleEdit(announcement)}></FontAwesomeIcon>
             </span>
               </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <EditAnnouncement showAnnouncementList={showAnnouncementList} announcement={defaultAnnouncement} setIsOpen={setIsOpen} modalIsOpen={modalIsOpen}></EditAnnouncement>
    </div>
  );
};

export default Announcement;
