import React, { useState } from 'react';
import './HierarchyList.css';
import HierarchySubList from '../HierarchySubList/HierarchySubList';

const HierarchyList = ({departments,requirements,showList}) => {

 
    return (
        <div >
            <table className='hierarchy-table'>
              <thead>
                <th>Department</th>
                <th>Designation</th>
                <th>Role</th>
              </thead>
              <tbody>
              {
                departments.map((department) => (
                          
                           <HierarchySubList
                            department={department}
                             findData={requirements.filter(requirement => requirement.department === department.department)}
                             showList={showList} requirements={requirements}>
                             </HierarchySubList>
                  
                ))
              }
              </tbody>
            </table>
        </div>
    );
};

export default HierarchyList;