"use client";
import { Radio, Collapse } from "antd";
import { useState } from "react";
import { useGetsubjectsQuery } from "../../../redux/features/tutorapis/TutorApi";
import {
  useGetallsubjectsQuery,
  useGetcategorysQuery,
} from "../../../redux/features/CourseApi";
const { Panel } = Collapse;

const FilterMenu = ({ setFilters }) => {
  const [selectedType, setSelectedType] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  const { data: subjectsData, isLoading: subjectsLoading } =
    useGetallsubjectsQuery();
  const { data: categoriesData, isLoading: categoriesLoading } =
    useGetcategorysQuery();

  const onTypeChange = (e) => {
    const type = e.target.value;
    setSelectedType(type);
    setSelectedId(null); // Reset ID when type changes
    setFilters({
      type,
      [type === "tutor" ? "subject_id" : "category_id"]: null,
    });
  };

  const onIdChange = (e) => {
    const id = e.target.value;
    setSelectedId(id);
    setFilters({
      type: selectedType,
      [selectedType === "tutor" ? "subject_id" : "category_id"]: id,
    });
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
          <Radio.Group
            onChange={onTypeChange}
            value={selectedType}
            className="flex flex-col gap-2"
          >
            <Radio value="tutor">Tutors</Radio>
            <Radio value="course">Courses</Radio>
          </Radio.Group>
        </Panel>

        <Panel
          header="Tutor Subjects"
          key="tutor-subjects"
          className="font-medium"
          collapsible={selectedType === "tutor" ? undefined : "disabled"}
        >
          {subjectsLoading ? (
            <div>Loading subjects...</div>
          ) : (
            <Radio.Group
              onChange={onIdChange}
              value={selectedType === "tutor" ? selectedId : null}
              className="flex flex-col gap-2"
            >
              {subjectsData?.subjects?.map((subject) => (
                <Radio key={subject.id} value={subject.id}>
                  {subject.name}
                </Radio>
              ))}
            </Radio.Group>
          )}
        </Panel>

        <Panel
          header="Course Categories"
          key="course-categories"
          className="font-medium"
          collapsible={selectedType === "course" ? undefined : "disabled"}
        >
          {categoriesLoading ? (
            <div>Loading categories...</div>
          ) : (
            <Radio.Group
              onChange={onIdChange}
              value={selectedType === "course" ? selectedId : null}
              className="flex flex-col gap-2"
            >
              {categoriesData?.categories?.map((category) => (
                <Radio key={category.id} value={category.id}>
                  {category.name}
                </Radio>
              ))}
            </Radio.Group>
          )}
        </Panel>
      </Collapse>
    </div>
  );
};

export default FilterMenu;
