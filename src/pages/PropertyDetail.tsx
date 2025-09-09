import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, MapPin, Bed, Bath, Square, Home } from "lucide-react";
import { useProperty } from "../context/PropertyContext";

function PropertyDetail() {
  const { id } = useParams<{ id: string }>();
  const { getPropertyById } = useProperty();

  if (!id) {
    return <Navigate to="/" replace />;
  }

  const property = getPropertyById(id);

  if (!property) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Property Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The property you're looking for doesn't exist.
          </p>
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Properties
          </Link>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <Link
        to="/"
        className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Properties
      </Link>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Property Image */}
        <div className="aspect-w-16 aspect-h-9 bg-gray-200">
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-64 md:h-96 object-cover"
          />
        </div>

        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
            <div className="mb-4 md:mb-0">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {property.title}
              </h1>
              <div className="flex items-center text-gray-600 mb-2">
                <MapPin className="h-5 w-5 mr-2" />
                <span className="text-lg">{property.location}</span>
              </div>
              {property.type && (
                <span className="inline-flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  <Home className="h-4 w-4 mr-1" />
                  {property.type}
                </span>
              )}
            </div>
            <div className="text-right">
              <div className="text-3xl md:text-4xl font-bold text-blue-600">
                {formatPrice(property.price)}
              </div>
            </div>
          </div>

          {/* Property Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {property.bedrooms && (
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <Bed className="h-6 w-6 text-gray-600 mx-auto mb-2" />
                <div className="text-2xl font-semibold text-gray-900">
                  {property.bedrooms}
                </div>
                <div className="text-sm text-gray-600">
                  Bedroom{property.bedrooms !== 1 ? "s" : ""}
                </div>
              </div>
            )}

            {property.bathrooms && (
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <Bath className="h-6 w-6 text-gray-600 mx-auto mb-2" />
                <div className="text-2xl font-semibold text-gray-900">
                  {property.bathrooms}
                </div>
                <div className="text-sm text-gray-600">
                  Bathroom{property.bathrooms !== 1 ? "s" : ""}
                </div>
              </div>
            )}

            {property.area && (
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <Square className="h-6 w-6 text-gray-600 mx-auto mb-2" />
                <div className="text-2xl font-semibold text-gray-900">
                  {property.area.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Square Feet</div>
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Description
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 text-lg leading-relaxed">
                {property.description}
              </p>
            </div>
          </div>

          {/* Contact Section */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Interested in this property?
              </h3>
              <p className="text-gray-600 mb-4">
                Contact us today to schedule a viewing or get more information
                about this amazing property.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                  Schedule Viewing
                </button>
                <button className="px-6 py-3 border border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors">
                  Contact Agent
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyDetail;
