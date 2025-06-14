import React from "react";

export default function CourseReloade({ name }) {
  return (
    <div className="flex justify-center items-center h-[60vh]">
      <div className="bg-white shadow-md p-6 rounded-lg text-center">
        <h2 className="text-xl font-semibold text-red-600">Oops!</h2>
        <p className="text-gray-600 mt-2">
          We couldn’t load the {name}. Please try again.
        </p>
        <button
          className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    </div>
  );
}
