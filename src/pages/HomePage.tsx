import { useState, useMemo } from "react";
import { useProperty } from "../context/PropertyContext";
import SearchBar from "../components/SearchBar";
import PropertyCard from "../components/PropertyCard";

function Homepage() {
  const { properties } = useProperty();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProperties = useMemo(() => {
    if (!searchTerm.trim()) return properties;

    const term = searchTerm.toLowerCase();
    return properties.filter(
      (property) =>
        property.title.toLowerCase().includes(term) ||
        property.location.toLowerCase().includes(term) ||
        property.type?.toLowerCase().includes(term) ||
        property.description.toLowerCase().includes(term)
    );
  }, [properties, searchTerm]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Find Your Perfect
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 block">
            Dream Property
          </span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
          Discover amazing properties in prime locations. From cozy apartments
          to luxury homes, find the perfect place to call home.
        </p>
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      </div>

      {/* Results Counter */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">
          Available Properties
        </h2>
        <span className="text-gray-600 bg-white px-4 py-2 rounded-full shadow-sm">
          {filteredProperties.length}{" "}
          {filteredProperties.length === 1 ? "property" : "properties"} found
        </span>
      </div>

      {/* Property Grid */}
      {filteredProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="max-w-md mx-auto bg-white rounded-2xl p-8 shadow-lg">
            <div className="mb-6">
              <div className="mx-auto h-16 w-16 text-gray-400 bg-gray-50 rounded-full flex items-center justify-center">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              No properties found
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Try adjusting your search terms or browse all available
              properties.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Homepage;
