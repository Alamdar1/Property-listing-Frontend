import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Home,
  DollarSign,
  MapPin,
  FileText,
  Bath,
  Square,
} from "lucide-react";
import { useProperty } from "../context/PropertyContext";

function AddListing() {
  const navigate = useNavigate();
  const { addProperty } = useProperty();

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    location: "",
    description: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    type: "House",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.price.trim()) {
      newErrors.price = "Price is required";
    } else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = "Please enter a valid price";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.trim().length < 20) {
      newErrors.description = "Description must be at least 20 characters long";
    }

    if (
      formData.bedrooms &&
      (isNaN(Number(formData.bedrooms)) || Number(formData.bedrooms) < 0)
    ) {
      newErrors.bedrooms = "Please enter a valid number of bedrooms";
    }

    if (
      formData.bathrooms &&
      (isNaN(Number(formData.bathrooms)) || Number(formData.bathrooms) < 0)
    ) {
      newErrors.bathrooms = "Please enter a valid number of bathrooms";
    }

    if (
      formData.area &&
      (isNaN(Number(formData.area)) || Number(formData.area) <= 0)
    ) {
      newErrors.area = "Please enter a valid area in square feet";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const propertyData = {
        title: formData.title.trim(),
        price: Number(formData.price),
        location: formData.location.trim(),
        description: formData.description.trim(),
        bathrooms: formData.bathrooms ? Number(formData.bathrooms) : undefined,
        area: formData.area ? Number(formData.area) : undefined,
        type: formData.type,
      };

      addProperty(propertyData)
        .then(() => {
          navigate("/");
        })
        .catch((error) => {
          console.error("Error adding property:", error);
          // You could add error handling UI here
        });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Properties
      </button>

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Add New Property Listing
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Fill out the form below to list your property. All required fields are
          marked with an asterisk (*).
        </p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Basic Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div className="md:col-span-2">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Property Title *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Home className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g., Modern Downtown Apartment"
                    className={`block w-full pl-10 pr-3 py-3 border rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.title ? "border-red-300" : "border-gray-300"
                    }`}
                  />
                </div>
                {errors.title && (
                  <p className="mt-2 text-sm text-red-600">{errors.title}</p>
                )}
              </div>

              {/* Price */}
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Price (USD) *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DollarSign className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="450000"
                    min="0"
                    className={`block w-full pl-10 pr-3 py-3 border rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.price ? "border-red-300" : "border-gray-300"
                    }`}
                  />
                </div>
                {errors.price && (
                  <p className="mt-2 text-sm text-red-600">{errors.price}</p>
                )}
              </div>

              {/* Property Type */}
              <div>
                <label
                  htmlFor="type"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Property Type
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="block w-full px-3 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="House">House</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Condo">Condo</option>
                  <option value="Townhouse">Townhouse</option>
                  <option value="Studio">Studio</option>
                </select>
              </div>

              {/* Location */}
              <div className="md:col-span-2">
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Location *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="e.g., Downtown, City Center"
                    className={`block w-full pl-10 pr-3 py-3 border rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.location ? "border-red-300" : "border-gray-300"
                    }`}
                  />
                </div>
                {errors.location && (
                  <p className="mt-2 text-sm text-red-600">{errors.location}</p>
                )}
              </div>
            </div>
          </div>

          {/* Property Details */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Property Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Bathrooms */}
              <div>
                <label
                  htmlFor="bathrooms"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Bathrooms
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Bath className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    id="bathrooms"
                    name="bathrooms"
                    value={formData.bathrooms}
                    onChange={handleInputChange}
                    placeholder="2"
                    min="0"
                    step="1"
                    className={`block w-full pl-10 pr-3 py-3 border rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.bathrooms ? "border-red-300" : "border-gray-300"
                    }`}
                  />
                </div>
                {errors.bathrooms && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.bathrooms}
                  </p>
                )}
              </div>

              {/* Area */}
              <div>
                <label
                  htmlFor="area"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Area (sq ft)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Square className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    id="area"
                    name="area"
                    value={formData.area}
                    onChange={handleInputChange}
                    placeholder="1200"
                    min="0"
                    className={`block w-full pl-10 pr-3 py-3 border rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.area ? "border-red-300" : "border-gray-300"
                    }`}
                  />
                </div>
                {errors.area && (
                  <p className="mt-2 text-sm text-red-600">{errors.area}</p>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Description *
            </label>
            <div className="relative">
              <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                <FileText className="h-5 w-5 text-gray-400" />
              </div>
              <textarea
                id="description"
                name="description"
                rows={6}
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe your property in detail. Include key features, amenities, and what makes it special..."
                className={`block w-full pl-10 pr-3 py-3 border rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-colors ${
                  errors.description ? "border-red-300" : "border-gray-300"
                }`}
              />
            </div>
            {errors.description && (
              <p className="mt-2 text-sm text-red-600">{errors.description}</p>
            )}
            <p className="mt-2 text-sm text-gray-500">
              Minimum 20 characters. Current: {formData.description.length}{" "}
              characters.
            </p>
          </div>

          {/* Submit Button */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Add Property Listing
            </button>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="flex-1 sm:flex-none px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddListing;
