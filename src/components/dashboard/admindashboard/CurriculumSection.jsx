"use client";
import React, { useState, useEffect } from "react";
import { Button, Input, Modal, Form, Empty, Skeleton } from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { useGetCourseDetailsQuery } from "../../../redux/features/CourseApi";
import { useParams } from "next/navigation";
import {
  useCreateAlectureMutation,
  useCreateAsectionMutation,
  useDeleteAsectionMutation,
  useUpdateAsectionMutation,
} from "../../../redux/features/adminapis/AdminApi";
import Swal from "sweetalert2";

const CurriculumSection = () => {
  const { id } = useParams();
  const { data: courseData, isLoading } = useGetCourseDetailsQuery(id);
  console.log("courseData", courseData);
  const [createAsection, { isLoading: createAsectionLoading }] =
    useCreateAsectionMutation();
  const [updateAsection, { isLoading: updateAsectionLoading }] =
    useUpdateAsectionMutation();
  const [deleteAsection, { isLoading: deleteAsectionLoading }] =
    useDeleteAsectionMutation();

  const [createAlecture, { isLoading: createAlectureLoading }] =
    useCreateAlectureMutation();

  // Initialize state with API data or default empty structure
  const [sections, setSections] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // Modal states
  const [sectionModalVisible, setSectionModalVisible] = useState(false);
  const [lectureModalVisible, setLectureModalVisible] = useState(false);
  const [currentSectionId, setCurrentSectionId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  console.log("currentItem", currentSectionId);
  // Form instances
  const [sectionForm] = Form.useForm();
  const [lectureForm] = Form.useForm();

  // Load API data into state when available
  useEffect(() => {
    if (courseData?.course?.curriculum) {
      setSections(
        courseData?.course?.curriculum.map((section) => ({
          id: section.id,
          name: section.section_name,
          lectures: section.lectures.map((lecture) => ({
            id: lecture.id,
            name: lecture.title,
            description: lecture.description,
            videoUrl: lecture.video_url,
            slug: lecture.slug,
          })),
        }))
      );
      setIsDataLoaded(true);
    }
  }, [courseData, isDataLoaded]);

  // SECTION HANDLERS
  const showAddSectionModal = () => {
    setIsEditing(false);
    setCurrentItem(null);
    sectionForm.resetFields();
    setSectionModalVisible(true);
  };

  const showEditSectionModal = (section) => {
    setIsEditing(true);
    setCurrentItem(section);
    setCurrentSectionId(section.id);
    sectionForm.setFieldsValue({
      section_name: section.name,
    });
    setSectionModalVisible(true);
  };

  const handleSectionSubmit = async () => {
    sectionForm.validateFields().then(async (values) => {
      const formdata = new FormData();
      formdata.append("section_name", values.section_name);

      console.log("secid", currentSectionId);
      if (isEditing) {
        formdata.append("_method", "PUT");
        console.log("Updating section with ID:", currentItem.id);
        try {
          const resp = await updateAsection({
            id: currentItem.id, // Use currentItem.id
            body: formdata,
          }).unwrap();
          console.log("section resp", resp);
          if (resp?.success) {
            Swal.fire({
              icon: "success",
              title: "Section updated successfully",
              showConfirmButton: false,
              timer: 1500,
            });
            sectionForm.resetFields();
          }
        } catch (error) {
          console.error("Update error:", error);
          Swal.fire({
            icon: "error",
            title: "Section update failed",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } else {
        try {
          const resp = await createAsection({ id, body: values }).unwrap();
          console.log("section resp", resp);
          if (resp?.success) {
            console.log("section resp", resp);
            Swal.fire({
              icon: "success",
              title: "Section created successfully",
              showConfirmButton: false,
              timer: 1500,
            });
            sectionForm.resetFields();
          }
        } catch (error) {
          console.log("error", error);
          Swal.fire({
            icon: "error",
            title: "Section creation failed",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
      setSectionModalVisible(false);
    });
  };

  const handleDeleteSection = (id) => {
    console.log("sectionId", id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const resp = await deleteAsection(id).unwrap();

          if (resp?.success) {
            // setSections(sections.filter((section) => section.id !== sectionId));
            Swal.fire("Deleted!", "Section has been deleted.", "success");
          }
        } catch (error) {
          console.error("Error deleting section:", error);
          Swal.fire("Error", "Failed to delete section.", "error");
        }
      }
    });
  };

  // LECTURE HANDLERS
  const showAddLectureModal = (sectionId) => {
    setCurrentSectionId(sectionId);
    setIsEditing(false);
    setCurrentItem(null);
    lectureForm.resetFields();
    setLectureModalVisible(true);
  };

  const showEditLectureModal = (lecture) => {
    setIsEditing(true);
    setCurrentItem(lecture);
    lectureForm.setFieldsValue({
      title: lecture.name, // Make sure these field names match your API
      description: lecture.description,
      video_url: lecture.videoUrl,
    });
    setLectureModalVisible(true);
  };

  const handleLectureSubmit = () => {
    lectureForm.validateFields().then(async (values) => {
      if (isEditing) {
        // Update existing lecture
        setSections(
          sections.map(async (section) => ({
            ...section,
            lectures: section.lectures.map((lecture) =>
              lecture.id === currentItem.id
                ? { ...lecture, ...values }
                : lecture
            ),
          }))
        );
      } else {
        try {
          const resp = await createAlecture({
            id: currentSectionId,
            body: values,
          }).unwrap();
          console.log("section resp", resp);
          if (resp?.success) {
            Swal.fire({
              icon: "success",
              title: "Lecture created successfully",
              showConfirmButton: false,
              timer: 1500,
            });
            lectureForm.resetFields();
          }
        } catch (error) {
          console.log("error", error);
          Swal.fire({
            icon: "error",
            title: "Lecture creation failed",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
      setLectureModalVisible(false);
    });
  };

  const handleDeleteLecture = (sectionId, lectureId) => {
    setSections(
      sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              lectures: section.lectures.filter((l) => l.id !== lectureId),
            }
          : section
      )
    );
  };

  if (isLoading) {
    return (
      <div className="bg-white p-6 shadow-md rounded-lg">
        <Skeleton active paragraph={{ rows: 8 }} />
      </div>
    );
  }

  if (!sections.length && isDataLoaded) {
    return (
      <div className="bg-white p-6 shadow-md rounded-lg">
        <Empty
          description={
            <span className="text-gray-600">No curriculum sections found</span>
          }
        >
          <Button
            style={{
              backgroundColor: "#14698A",
            }}
            className="bg-primary text-white"
            type="primary"
            icon={<PlusOutlined />}
            onClick={showAddSectionModal}
          >
            Add First Section
          </Button>
        </Empty>

        {/* Section Modal (for when there's no data) */}
        <Modal
          title="Add Section"
          visible={sectionModalVisible}
          onCancel={() => setSectionModalVisible(false)}
          onOk={handleSectionSubmit}
          okText="Add Section"
        >
          <Form form={sectionForm} layout="vertical">
            <Form.Item
              name="section_name"
              label="Section Name"
              rules={[{ required: true, message: "Please enter section name" }]}
            >
              <Input placeholder="e.g. Introduction to Course" />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 shadow-md rounded-lg">
      {/* Sections List */}
      {sections.map((section) => (
        <div key={section.id} className="mb-8 border-b pb-6">
          {/* Section Header */}
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="font-bold text-lg">{section.name}</h2>
              {section.description && (
                <p className="text-gray-600">{section.description}</p>
              )}
            </div>
            <div className="space-x-2">
              <Button
                type="primary"
                icon={<PlusOutlined />}
                className="bg-blue-500 hover:bg-blue-600"
                onClick={() => showAddLectureModal(section.id)}
              />
              <Button
                icon={<EditOutlined />}
                onClick={() => showEditSectionModal(section)}
              />
              <Button
                icon={<DeleteOutlined />}
                danger
                onClick={() => handleDeleteSection(section.id)}
              />
            </div>
          </div>

          {/* Lectures List */}
          {section.lectures.length > 0 ? (
            section.lectures.map((lecture) => (
              <div
                key={lecture.id}
                className="flex justify-between items-center mb-4 border p-4 rounded-lg"
              >
                <div className="text-[#1D2026] flex items-center gap-2">
                  <MenuOutlined className="text-lg" />
                  <div>
                    <p className="text-lg text-[#1D2026]">{lecture.name}</p>
                    {lecture.description && (
                      <p className="text-gray-600 text-sm">
                        {lecture.description}
                      </p>
                    )}
                    {lecture.videoUrl && (
                      <p className="text-blue-500 text-sm">Video attached</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <EditOutlined
                    className="cursor-pointer text-xl text-[#98A2B3]"
                    onClick={() => showEditLectureModal(lecture)}
                  />
                  <DeleteOutlined
                    className="cursor-pointer text-xl text-red-500"
                    onClick={() => handleDeleteLecture(section.id, lecture.id)}
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="mb-4 p-4 border rounded-lg">
              <Empty
                description={
                  <span className="text-gray-600">
                    No lectures in this section
                  </span>
                }
              >
                <Button
                  style={{
                    backgroundColor: "#14698A",
                  }}
                  type="primary"
                  size="small"
                  icon={<PlusOutlined />}
                  onClick={() => showAddLectureModal(section.id)}
                >
                  Add Lecture
                </Button>
              </Empty>
            </div>
          )}
        </div>
      ))}

      {/* Add Section Button */}
      <Button
        type="dashed"
        className="w-full bg-[#D8F0FF] h-[48px] text-[#1253BB] font-semibold"
        onClick={showAddSectionModal}
      >
        Add Section
      </Button>

      {/* Navigation Buttons */}
      <div className="flex justify-end mt-8">
        {/* <button className="h-[48px] text-[#475467] text-[16px] border-none font-semibold">
          Previous
        </button> */}
        <Button
          style={{
            backgroundColor: "#14698A",
            fontSize: "16px",
          }}
          type="primary"
          className=" h-[48px]"
        >
          Save & Next
        </Button>
      </div>

      {/* Section Modal */}
      <Modal
        title={`${isEditing ? "Edit" : "Add"} Section`}
        visible={sectionModalVisible}
        onCancel={() => setSectionModalVisible(false)}
        onOk={handleSectionSubmit}
        okText={isEditing ? "Update Section" : "Add Section"}
      >
        <Form form={sectionForm} layout="vertical">
          <Form.Item
            name="section_name"
            label="Section Name"
            rules={[{ required: true, message: "Please enter section name" }]}
          >
            <Input placeholder="e.g. Introduction to Course" />
          </Form.Item>
        </Form>
      </Modal>

      {/* Lecture Modal */}
      <Modal
        title={`${isEditing ? "Edit" : "Add"} Lecture`}
        visible={lectureModalVisible}
        onCancel={() => setLectureModalVisible(false)}
        onOk={handleLectureSubmit}
        okText={isEditing ? "Update Lecture" : "Add Lecture"}
        width={700}
      >
        <Form form={lectureForm} layout="vertical">
          <Form.Item
            name="title"
            label="Lecture Name"
            rules={[{ required: true, message: "Please enter lecture name" }]}
          >
            <Input placeholder="e.g. Welcome Lecture" />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea placeholder="Lecture description" />
          </Form.Item>
          <Form.Item
            name="video_url"
            label="Video URL"
            rules={[{ type: "url", message: "Please enter a valid URL" }]}
          >
            <Input placeholder="https://example.com/video.mp4" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CurriculumSection;
