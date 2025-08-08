import React, { useState } from "react";
import { useAuthStore } from "../../stores/authStore";
import axios from "axios";

const CLOUDINARY_UPLOAD_PRESET = "your_unsigned_preset";
const CLOUDINARY_CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;

const IncidentForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    severity: "low",
  });

  const [photoFile, setPhotoFile] = useState(null);
  const { reportIncident, isReportingIncident } = useAuthStore();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handlePhotoFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
    }
  };

  const uploadImageToCloudinary = async (file) => {
    const cloudForm = new FormData();
    cloudForm.append("file", file);
    cloudForm.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    cloudForm.append("cloud_name", CLOUDINARY_CLOUD_NAME);

    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      cloudForm
    );

    return res.data.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = "";

      // Upload image to Cloudinary
      if (photoFile) {
        imageUrl = await uploadImageToCloudinary(photoFile);
      }

      const payload = {
        ...formData,
        image: imageUrl,
      };

      await reportIncident(payload);
    } catch (err) {
      console.error("Error submitting incident:", err);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen px-4 py-8 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl w-full bg-white shadow-md rounded-lg p-6"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Report an Incident
        </h1>

        {/* All form fields remain unchanged... */}

        <div className="mb-6">
          <label htmlFor="image" className="block text-gray-700 font-medium mb-2">
            Upload Image
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={handlePhotoFile}
            className="w-full text-gray-700"
          />
          <p className="text-sm text-gray-500 mt-1">
            You can upload one image for the incident.
          </p>
        </div>

        <div className="text-center">
          <button
            type="submit"
            disabled={isReportingIncident}
            className="bg-blue-500 text-white font-medium px-6 py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isReportingIncident ? "Submitting..." : "Submit Incident"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default IncidentForm;
