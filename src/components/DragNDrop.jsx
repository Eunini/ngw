import React, { useState } from "react";
import { Camera, Video } from "lucide-react";

function DragNDrop() {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    console.log("Files dropped:", files);
    uploadFiles(files);
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    console.log("Files selected:", files);
    uploadFiles(files);
  };

  const handleVideoChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      console.log("Selected videos:", files);
    }
  };

  const uploadFiles = (files) => {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
    console.log("Uploading files:", files);
    // Perform actual upload request here (e.g., using fetch or axios)
  };

  return (
    <section className="w-[100%] sm:flex sm:flex-row hidden items-center justify-center">
      <div
        className={`w-[80%] border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
        }`}
        onDragEnter={handleDragEnter}
        onDragOver={(e) => e.preventDefault()}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center space-y-2">
          <svg
            className="w-12 h-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <p className="text-gray-600">Drag and drop files here or</p>
          <label
            htmlFor="file-upload"
            className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
          >
            <input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={handleFileChange}
              multiple
              accept="image/*,video/*"
            />
            Upload Files
          </label>
        </div>
      </div>
    </section>
  );
}

export default DragNDrop;

export function UploadFile() {
  return (
    <section className="w-[100%] sm:hidden flex flex-row items-center justify-center gap-4 pt-2">
      <button className="flex flex-row gap-2 bg-[#F9FAFB] border-[1px] border-[#E5E7EB] p-2 rounded-lg text-[#4B5563] text-[16px] items-center justify-center">
        <Camera color="#2563EB" /> Add Photos
      </button>
      <button className="flex flex-row gap-2 bg-[#F9FAFB] border-[1px] border-[#E5E7EB] p-2 rounded-lg text-[#4B5563] text-[16px] items-center justify-center">
        <Video color="#2563EB" className="fill-[#2563EB]" /> Add Videos
      </button>
    </section>
  );
}
