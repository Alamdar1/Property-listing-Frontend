import { Link } from "react-router-dom";
import { MapPin, Bed, Bath, Square } from "lucide-react";
import type { Property } from "../context/PropertyContext";

interface PropertyCardProps {
  property: Property;
}

function PropertyCard({ property }: PropertyCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Link to={`/property/${property.id}`} className="group">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl hover:border-gray-200 transition-all duration-500 transform group-hover:-translate-y-2 group-hover:scale-[1.02]">
        <div className="relative aspect-w-16 aspect-h-12 bg-gray-200 overflow-hidden">
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 flex-1 mr-2">
              {property.title}
            </h3>
            <span className="text-xl font-bold text-blue-600 whitespace-nowrap">
              {formatPrice(property.price)}
            </span>
          </div>

          <div className="flex items-center text-gray-500 mb-4">
            <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
            <span className="text-sm truncate">{property.location}</span>
          </div>

          <p className="text-gray-600 text-sm mb-5 line-clamp-2 leading-relaxed">
            {property.description}
          </p>

          <div className="flex items-center justify-between flex-wrap space-y-2 text-sm text-gray-500 pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-4">
              {property.bedrooms && (
                <div className="flex items-center bg-gray-50 px-2 py-1 rounded-lg">
                  <Bed className="h-4 w-4 mr-1" />
                  <span>{property.bedrooms} bed</span>
                </div>
              )}
              {property.bathrooms && (
                <div className="flex items-center bg-gray-50 px-2 py-1 rounded-lg">
                  <Bath className="h-4 w-4 mr-1" />
                  <span>{property.bathrooms} bath</span>
                </div>
              )}
              {property.area && (
                <div className="flex items-center bg-gray-50 px-2 py-1 rounded-lg">
                  <Square className="h-4 w-4 mr-1" />
                  <span>{property.area} sqft</span>
                </div>
              )}
            </div>
            {property.type && (
              <span className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
                {property.type}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PropertyCard;
