import AdminSidebar from '@/components/dashboard/admindashboard/AdminSidebar';
import Sidebar from '@/components/dashboard/Sidebar';
import React from 'react';

const layout = ({ children }) => {

    return (
        <div className='flex items-center bg-gray-200'>
            {/* sidebar  */}

            <div>
                <AdminSidebar  />
            </div>

            {/* content area */}
            <div className='w-full'>
           {children}
           </div>
        </div>
    );
};

export default layout;