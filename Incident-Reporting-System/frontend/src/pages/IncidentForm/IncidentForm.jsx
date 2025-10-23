import React, { useState } from "react";
import { useAuthStore } from "../../stores/authStore";

const IncidentForm = () => {
  const { reportIncident, isReportingIncident } = useAuthStore();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    severity: "low",
    image: null,
  });

  const [errors, setErrors] = useState({});
  const [previewUrl, setPreviewUrl] = useState("");

  // Handle text/select inputs
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Handle image file selection
  const handlePhotoFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type/size if needed
    setFormData((prev) => ({ ...prev, image: file }));
    setPreviewUrl(URL.createObjectURL(file));
  };

  // Basic client-side validation
  const validate = () => {
    const errs = {};
    if (!formData.title.trim()) errs.title = "Title is required";
    if (!formData.description.trim()) errs.description = "Description is required";
    if (!formData.location.trim()) errs.location = "Location is required";
    if (!formData.image) errs.image = "Please upload an image";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = new FormData();
    payload.append("title", formData.title);
    payload.append("description", formData.description);
    payload.append("location", formData.location);
    payload.append("severity", formData.severity);
    payload.append("image", formData.image);

    try {
      await reportIncident(payload);
      // Optionally clear form / give feedback
      setFormData({ title: "", description: "", location: "", severity: "low", image: null });
      setPreviewUrl("");
      setErrors({});
    } catch (err) {
      console.error("Submit failed:", err);
      // Handle/report server errors here
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

        {/* Title */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter a title for the incident"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.title ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-500"
            }`}
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>

        {/* Description */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
            Description
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            placeholder="Provide a detailed description of the incident"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.description ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-500"
            }`}
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>

        {/* Location */}
        <div className="mb-4">
          <label htmlFor="location" className="block text-gray-700 font-medium mb-2">
            Location
          </label>
          <input
            id="location"
            type="text"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter the location of the incident"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.location ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-500"
            }`}
          />
          {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
        </div>

        {/* Severity */}
        <div className="mb-4">
          <label htmlFor="severity" className="block text-gray-700 font-medium mb-2">
            Severity
          </label>
          <select
            id="severity"
            value={formData.severity}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
        </div>

        {/* Image Upload */}
        <div className="mb-6">
          <label htmlFor="image" className="block text-gray-700 font-medium mb-2">
            Upload Image
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={handlePhotoFile}
            className={`w-full text-gray-700 ${
              errors.image ? "border-red-500" : ""
            }`}
          />
          {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
          {previewUrl && (
            <img
              src={previewUrl}
              alt="preview"
              className="mt-2 max-h-48 rounded-md border"
            />
          )}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            disabled={isReportingIncident}
            className="bg-blue-500 text-white font-medium px-6 py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isReportingIncident ? "Submitting..." : "Submit Incident"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default IncidentForm;
