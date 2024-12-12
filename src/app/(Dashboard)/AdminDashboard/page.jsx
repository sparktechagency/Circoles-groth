
import AdminRevenueChart from '@/components/dashboard/admindashboard/AdminRevenueChart';
import Status from '@/components/dashboard/admindashboard/Status';


import React from 'react';

const page = () => {
    return (
        <div className='min-h-screen w-full bg-white'>
            <Status/>
            <AdminRevenueChart/>
        </div>
    );
};

export default page;