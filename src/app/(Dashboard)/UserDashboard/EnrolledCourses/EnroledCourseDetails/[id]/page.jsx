"use client";
import React, { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  Collapse,
  Spin,
  Empty,
  message,
  Modal,
  Divider,
  Tag,
  Progress,
  Popconfirm,
} from "antd";
import {
  ClockCircleOutlined,
  PlayCircleOutlined,
  FolderOutlined,
  FileOutlined,
  UserOutlined,
  CheckOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { useParams } from "next/navigation";
import { useGetCourseDetailsQuery } from "../../../../../../redux/features/CourseApi";
const { Panel } = Collapse;

const EnroledCourse = () => {
  const { id } = useParams();
  const [currentVideo, setCurrentVideo] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [watchedVideos, setWatchedVideos] = useState([]);
  const [lockedVideos, setLockedVideos] = useState([]);
  const [progress, setProgress] = useState(0);

  const { data: courseData, isLoading, isError } = useGetCourseDetailsQuery(id);

  useEffect(() => {
    if (courseData?.success && courseData.course?.curriculum?.length > 0) {
      // Load progress from localStorage
      const savedProgress = JSON.parse(
        localStorage.getItem(`courseProgress_${id}`)
      ) || {
        watchedVideos: [],
        lastWatched: null,
      };

      setWatchedVideos(savedProgress.watchedVideos);
      calculateLockedVideos(
        courseData.course.curriculum,
        savedProgress.watchedVideos
      );

      // Calculate initial progress
      const totalVideos = courseData.course.curriculum.reduce(
        (total, section) => total + section.lectures.length,
        0
      );
      const watchedCount = savedProgress.watchedVideos.length;
      setProgress(Math.round((watchedCount / totalVideos) * 100));

      // Set initial video
      setInitialVideo(courseData.course, savedProgress.lastWatched);
    }
  }, [courseData, id]);
  const calculateTotalDuration = () => {
    if (!courseData?.course?.duration) return "0 hours";
    return `${courseData.course.duration} hours`;
  };
  const calculateLockedVideos = (curriculum, watched) => {
    const allVideos = curriculum.flatMap((section) => section.lectures);
    const locked = [];
    let foundFirstUnwatched = false;

    for (const video of allVideos) {
      if (!watched.includes(video.id.toString())) {
        if (!foundFirstUnwatched) {
          foundFirstUnwatched = true;
        } else {
          locked.push(video.id.toString());
        }
      }
    }

    setLockedVideos(locked);
  };

  const setInitialVideo = (course, lastWatchedId) => {
    const allVideos = course.curriculum.flatMap((section) => section.lectures);

    // 1. Try to resume last watched
    if (lastWatchedId) {
      const lastWatched = allVideos.find(
        (v) => v.id.toString() === lastWatchedId
      );
      if (lastWatched) {
        setCurrentVideo(lastWatched);
        return;
      }
    }

    // 2. Find first unwatched video
    const firstUnwatched = allVideos.find(
      (v) =>
        !watchedVideos.includes(v.id.toString()) &&
        !lockedVideos.includes(v.id.toString())
    );

    // 3. Fallback to first video or trailer
    setCurrentVideo(
      firstUnwatched ||
        allVideos[0] || {
          title: "Course Trailer",
          video_url: course.trailer_video,
          id: "trailer",
        }
    );
  };

  const handleVideoPlay = (video) => {
    if (isVideoLocked(video)) {
      message.warning("Please complete the previous videos first");
      return;
    }
    setCurrentVideo(video);
    setIsModalVisible(true);
  };

  const isVideoLocked = (video) => {
    return lockedVideos.includes(video.id.toString());
  };

  const markVideoAsCompleted = (videoId) => {
    if (!videoId) return;

    const updatedWatched = [...new Set([...watchedVideos, videoId.toString()])];
    setWatchedVideos(updatedWatched);

    // Recalculate locked videos
    calculateLockedVideos(courseData.course.curriculum, updatedWatched);

    // Calculate new progress
    const totalVideos = courseData.course.curriculum.reduce(
      (total, section) => total + section.lectures.length,
      0
    );
    const newProgress = Math.round((updatedWatched.length / totalVideos) * 100);
    setProgress(newProgress);

    // Save to localStorage
    localStorage.setItem(
      `courseProgress_${id}`,
      JSON.stringify({
        lastWatched: videoId.toString(),
        watchedVideos: updatedWatched,
      })
    );

    // Auto-play next video if available
    if (videoId !== "trailer") {
      const allVideos = courseData.course.curriculum.flatMap(
        (section) => section.lectures
      );
      const currentIndex = allVideos.findIndex((v) => v.id === videoId);
      if (currentIndex < allVideos.length - 1) {
        const nextVideo = allVideos[currentIndex + 1];
        if (!isVideoLocked(nextVideo)) {
          setCurrentVideo(nextVideo);
        }
      }
    }

    message.success("Video marked as completed!");
  };

  const renderVideoItem = (lecture, sectionIndex, lectureIndex) => {
    const isWatched = watchedVideos.includes(lecture.id.toString());
    const isLocked = isVideoLocked(lecture);
    const isCurrent = currentVideo?.id === lecture.id;

    return (
      <div
        key={lecture.id}
        className={`flex justify-between items-center p-4 rounded-lg mb-4 ${
          isCurrent ? "bg-blue-50 border border-blue-200" : "bg-white"
        } ${isWatched ? "border-l-4 border-l-green-500" : ""} ${
          isLocked
            ? "opacity-60 cursor-not-allowed"
            : "cursor-pointer hover:bg-gray-50"
        }`}
        onClick={() => !isLocked && handleVideoPlay(lecture)}
      >
        <div className="flex items-center">
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 ${
              isWatched
                ? "bg-green-100 text-green-600"
                : isLocked
                ? "bg-gray-100 text-gray-400"
                : "bg-[#F2F4F7] text-[#475467]"
            }`}
          >
            {isLocked ? <LockOutlined /> : lectureIndex + 1}
          </div>
          <div>
            <p className="font-semibold text-[#475467] text-[16px]">
              {lecture.title}
              {isLocked && <LockOutlined className="ml-2 text-gray-400" />}
            </p>
            <p className="text-sm text-[#98A2B3]">
              {lecture.description || "Lecture video"}
            </p>
          </div>
        </div>
        <div>
          {isWatched ? (
            <CheckOutlined className="text-green-500 text-2xl" />
          ) : (
            <PlayCircleOutlined
              className={`text-2xl ${
                isLocked ? "text-gray-400" : "text-[#14698A]"
              }`}
            />
          )}
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (isError || !courseData?.success) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Empty description="Failed to load course details" />
      </div>
    );
  }

  const course = courseData.course;

  return (
    <div className="bg-white p-6">
      <h1 className="text-[24px] font-bold">{course.title}</h1>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium">Course Progress</span>
          <span>{progress}%</span>
        </div>
        <Progress percent={progress} status="active" />
      </div>

      <div className="xl:flex justify-between gap-6 item-center mb-4 container mx-auto">
        {/* Left content */}
        <div className="w-full">
          {/* Main Video Player */}
          {currentVideo ? (
            <div className="w-full mt-6 rounded-2xl">
              {currentVideo.video_url?.includes("youtube.com") ? (
                <iframe
                  width="100%"
                  height="500"
                  src={currentVideo.video_url}
                  title={currentVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : currentVideo.video_url ? (
                <video
                  className="w-full rounded-2xl"
                  controls
                  autoPlay
                  muted
                  onEnded={() => markVideoAsCompleted(currentVideo.id)}
                >
                  <source src={currentVideo.video_url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div className="w-full h-96 bg-gray-100 flex items-center justify-center">
                  <p>No video available</p>
                </div>
              )}
            </div>
          ) : (
            <div className="w-full mt-6 rounded-2xl bg-gray-100 h-96 flex items-center justify-center">
              <p>No video available</p>
            </div>
          )}

          {/* Completion Button */}
          {currentVideo?.id && currentVideo.id !== "trailer" && (
            <div className="mt-4 text-right">
              <Popconfirm
                title="Mark this video as completed?"
                onConfirm={() => markVideoAsCompleted(currentVideo.id)}
                okText="Yes"
                cancelText="No"
              >
                <button
                  className="bg-primary text-white py-2 px-4 rounded"
                  type="primary"
                >
                  I've completed this video
                </button>
              </Popconfirm>
            </div>
          )}

          <h1 className="text-[24px] font-bold py-4">
            {currentVideo ? currentVideo.title : "Course Introduction"}
          </h1>

          {/* Course Info */}
          <div>
            <div className="flex flex-wrap gap-4 mb-4">
              <Tag color="blue" icon={<UserOutlined />}>
                {course.language}
              </Tag>
              <Tag color="green" icon={<CheckOutlined />}>
                {course.c_level}
              </Tag>
              <Tag color="orange" icon={<ClockCircleOutlined />}>
                {calculateTotalDuration()}
              </Tag>
            </div>

            <p className="text-[#263238] text-[14px] font-normal flex items-center gap-2 mb-4">
              Last updated:{" "}
              <span className="text-[#1D2939] block text-[14px] font-semibold">
                {course.last_updated}
              </span>
            </p>
          </div>

          {/* Description */}
          <div>
            <h1 className="text-[24px] font-bold py-4">Course Description</h1>
            <p className="text-[14px] font-normal leading-8">
              {course.description}
            </p>
          </div>

          {/* What You'll Learn */}
          {course.teach_course?.length > 0 && (
            <div className="mt-8">
              <h1 className="text-[24px] font-bold py-4">What You'll Learn</h1>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {course.teach_course.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckOutlined className="text-green-500 mt-1 mr-2" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Requirements */}
          {course.requirements?.length > 0 && (
            <div className="mt-8">
              <h1 className="text-[24px] font-bold py-4">Requirements</h1>
              <ul className="list-disc pl-5">
                {course.requirements.map((req, index) => (
                  <li key={index} className="mb-2">
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Target Audience */}
          {course.targer_audience?.length > 0 && (
            <div className="mt-8">
              <h1 className="text-[24px] font-bold py-4">Target Audience</h1>
              <div className="flex flex-wrap gap-2">
                {course.targer_audience.map((audience, index) => (
                  <Tag key={index} color="purple">
                    {audience}
                  </Tag>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right content - Curriculum */}
        <div className="xl:max-w-2xl w-full">
          <div className="xl:max-w-2xl w-full my-12 lg:p-4 p-0">
            {/* Course Stats */}
            <div className="flex items-center justify-between mb-4 pl-8">
              <div className="flex flex-wrap items-center justify-between lg:gap-6 md:gap-6 gap-1">
                <div className="lg:text-[16px] text-sm font-normal text-[#4E5566] flex items-center gap-3">
                  <FolderOutlined className="lg:text-2xl text-xl text-[#4E5566]" />
                  {course.total_section} Sections
                </div>
                <div className="lg:text-[16px] text-sm font-normal text-[#4E5566] flex items-center gap-3">
                  <PlayCircleOutlined className="lg:text-2xl text-xl text-[#4E5566]" />
                  {course.total_lecture} lectures
                </div>
                <div className="lg:text-[16px] text-sm font-normal text-[#4E5566] flex items-center gap-3">
                  <ClockCircleOutlined className="lg:text-2xl text-xl text-[#4E5566]" />
                  {calculateTotalDuration()}
                </div>
              </div>
            </div>

            {/* Course Curriculum */}
            <div className="mx-auto rounded-md lg:p-4 md:p-4 p-0 border-none">
              <Collapse
                defaultActiveKey={["1"]}
                accordion
                expandIconPosition="right"
                className="p-4 rounded-lg border-none"
              >
                {course.curriculum?.map((section, sectionIndex) => (
                  <Panel
                    header={
                      <div className="">
                        <div className="text-lg font-semibold text-[#475467]">
                          {section.section_name}
                        </div>
                        <div className="text-xs text-[#98A2B3] font-normal">
                          {section.lectures.length} Lectures •{" "}
                          {Math.ceil(section.lectures.length * 10)} Minutes
                        </div>
                      </div>
                    }
                    key={sectionIndex + 1}
                    className="mb-2 bg-transparent"
                    style={{ backgroundColor: "transparent" }}
                  >
                    <div className="space-y-3 cursor-pointer">
                      {section.lectures.map((lecture, lectureIndex) =>
                        renderVideoItem(lecture, sectionIndex, lectureIndex)
                      )}
                    </div>
                  </Panel>
                ))}
              </Collapse>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <Modal
        title={currentVideo?.title || "Video Player"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width="80%"
        style={{ top: 20 }}
        destroyOnClose
      >
        {currentVideo && (
          <div className="aspect-w-16 aspect-h-9">
            {currentVideo.video_url?.includes("youtube.com") ? (
              <iframe
                width="100%"
                height="500"
                src={currentVideo.video_url}
                title={currentVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <video
                width="100%"
                height="500"
                controls
                autoPlay
                onEnded={() => {
                  markVideoAsCompleted(currentVideo.id);
                  setIsModalVisible(false);
                }}
              >
                <source src={currentVideo.video_url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        )}
        <Divider />
        <h3 className="text-lg font-semibold">Description</h3>
        <p>{currentVideo?.description || "No description available"}</p>
        {currentVideo?.id && currentVideo.id !== "trailer" && (
          <div className="mt-4 text-right">
            <Button
              type="primary"
              onClick={() => {
                markVideoAsCompleted(currentVideo.id);
                setIsModalVisible(false);
              }}
            >
              Mark as Completed
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default EnroledCourse;
