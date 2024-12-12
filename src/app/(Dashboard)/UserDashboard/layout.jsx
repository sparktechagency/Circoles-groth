import UserSidebar from '@/components/dashboard/userDashboard/UserSidebar';
import React from 'react';

const layout = ({ children }) => {

    return (
        <div className='flex items-center bg-gray-200'>
            {/* sidebar  */}

            <div>
                <UserSidebar  />
            </div>

            {/* content area */}
            <div className='w-full'>
           {children}
           </div>
        </div>
    );
};

export default layout;