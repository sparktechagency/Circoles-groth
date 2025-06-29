"use client";
import { Checkbox, Collapse } from "antd";
import { useState } from "react";
const { Panel } = Collapse;

const FilterMenu = ({ setCategoryId, setType }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);

  const onCategoryChange = (checkedValues) => {
    setSelectedCategories(checkedValues);
  };

  const onTypeChange = (checkedValues) => {
    setSelectedTypes(checkedValues);
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg w-64">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">Filters</h3>

      <Collapse
        defaultActiveKey={["type", "tutor-subjects", "course-categories"]}
        ghost
        expandIconPosition="end"
      >
        <Panel header="Search Type" key="type" className="font-medium">
          <Checkbox.Group
            onChange={onTypeChange}
            className="flex flex-col gap-2"
          >
            <Checkbox value="tutor">Tutors</Checkbox>
            <Checkbox value="course">Courses</Checkbox>
          </Checkbox.Group>
        </Panel>

        <Panel
          header="Tutor Subjects"
          key="tutor-subjects"
          className="font-medium"
          collapsible={selectedTypes.includes("tutor") ? undefined : "disabled"}
        >
          <Checkbox.Group
            onChange={onCategoryChange}
            className="flex flex-col gap-2"
          >
            <Checkbox value="Physics">Physics</Checkbox>
            <Checkbox value="Chemistry">Chemistry</Checkbox>
            <Checkbox value="Math">Mathematics</Checkbox>
            <Checkbox value="Biology">Biology</Checkbox>
          </Checkbox.Group>
        </Panel>

        <Panel
          header="Course Categories"
          key="course-categories"
          className="font-medium"
          collapsible={
            selectedTypes.includes("course") ? undefined : "disabled"
          }
        >
          <Checkbox.Group
            onChange={onCategoryChange}
            className="flex flex-col gap-2"
          >
            <Checkbox value="Data Science">Data Science</Checkbox>
            <Checkbox value="Programming">Programming</Checkbox>
            <Checkbox value="Machine Learning">Machine Learning</Checkbox>
            <Checkbox value="AI">Artificial Intelligence</Checkbox>
          </Checkbox.Group>
        </Panel>
      </Collapse>
    </div>
  );
};

export default FilterMenu;
