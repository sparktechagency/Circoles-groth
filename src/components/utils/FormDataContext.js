import React, { createContext, useState } from "react";
export const FormDataContext = createContext();
export const FormDataProvider = ({ children }) => {
  const [formData, setFormData] = useState({});

  // Function to update form data by merging new data with existing
  const updateFormData = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  // The value prop of the provider will be accessible to any child component
  return (
    <FormDataContext.Provider value={{ formData, updateFormData }}>
      {children}
    </FormDataContext.Provider>
  );
};
