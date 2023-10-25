import React, { useEffect, useState } from 'react';
import HierarchyList from './HierarchyList/HierarchyList';
import ResponsiveMenu from '../../layout/Responsive menu/ResponsiveMenu';

const Hierarchy = () => {
      const [departments,setDepartments] = useState([])
      const [requirements,setRequirements] = useState([])
      const [findData,setFindData] = useState([]);
      
      const getRequirement = () =>{
        fetch(`https://hrm-server-side.onrender.com/requirement`)
        .then((data)=>data.json())
        .then(data => setRequirements(data))
      }

      //getDepartment
      const getDepartment = () =>{
        fetch(`https://hrm-server-side.onrender.com/getDepartment`)
        .then((data)=>data.json())
        .then(data => setDepartments(data))
      }


      


    

      useEffect(()=>{
        getDepartment();
        getRequirement();
      },[])

      const showList=()=>{
        getDepartment();
        getRequirement();
      }


      const handleSelection = (department) =>{
        console.log(department)
        const findDepartment = requirements.filter(requirement => requirement.department === department);
        setFindData(findDepartment)
   }
    return (
        <div>
            <ResponsiveMenu></ResponsiveMenu>
            <HierarchyList showList={showList} departments={departments} requirements={requirements} handleSelection={handleSelection} findData={findData}></HierarchyList>
        </div>
    );
};

export default Hierarchy;