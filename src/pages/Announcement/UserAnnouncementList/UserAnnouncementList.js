import React,{useState,useEffect} from 'react';
import ResponsiveMenu from '../../../layout/Responsive menu/ResponsiveMenu';
import { Link } from 'react-router-dom';
import Header from '../../Shared/Header/Header';
import HomeHeader from '../../Shared/Header/HomeHeader';

const UserAnnouncementList = () => {
    const [announcementList,setAnnouncementList] = useState([]);



    const showAnnouncementList = () =>{
        fetch(`https://hrm-server-side.onrender.com/announcement`)
        .then(res=>res.json())
        .then(data=> setAnnouncementList(data))
       }
    
       useEffect(() => { 
        showAnnouncementList(); 
       },[]);

    return (
        <div>
        <HomeHeader></HomeHeader>
          <div className="bg-white py-3 mt-3 announce-banner px-16 rounded-lg">
            <div className="mb-5">
              <h2 className=" text-lg h-title text-center font-semibold text-gray-700">
                Announcement
              </h2>
            </div>
          </div>
    
          <div className="overflow-x-auto px-6 user-announcement-list w-full">
            <table className="table w-full bg-blue-500 rounded-lg">
              {/* <!-- head --> */}
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Department</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                </tr>
              </thead>
              <tbody className="text-white">
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
                   
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
         
        </div>
    );
};

export default UserAnnouncementList;