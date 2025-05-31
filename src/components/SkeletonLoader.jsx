import React from "react";
import { Skeleton } from "antd";

const SkeletonCardGrid = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 container mx-auto mt-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="p-4 border rounded-lg shadow-md bg-white">
          <Skeleton
            title
            loading
            active
            style={{ width: "100%", height: 180, marginBottom: 16 }}
          />
          <Skeleton active paragraph={{ rows: 2 }} />
        </div>
      ))}
    </div>
  );
};

export default SkeletonCardGrid;
