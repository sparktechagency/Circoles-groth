import TutorSidebar from '@/components/dashboard/tutorDashboard/TutorSidebar';
import React from 'react';

const layout = ({ children }) => {
   
    return (
        <div className='flex items-center bg-gray-200'>
            {/* sidebar  */}

            <div>
                <TutorSidebar  />
            </div>

            {/* content area */}
           <div className='w-full'>
           {children}
           </div>
        </div>
    );
};

export default layout;