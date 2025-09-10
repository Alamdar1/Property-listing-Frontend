import React, { createContext, useContext, useState, useEffect } from "react";

export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  description: string;
  image?: string;
  bedrooms?: number;

  bathrooms?: number;
  area?: number;
  type?: string;
}

interface PropertyContextType {
  properties: Property[];
  loading: boolean;
  error: string | null;
  addProperty: (property: Omit<Property, "id">) => Promise<void>;
  getPropertyById: (id: string) => Property | undefined;
  refreshProperties: () => Promise<void>;
}

const PropertyContext = createContext<PropertyContextType | undefined>(
  undefined
);

export function PropertyProvider({ children }: { children: React.ReactNode }) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(import.meta.env.VITE_API_URL);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Transform API data to match our Property interface
      const transformedProperties: Property[] = data.map((item: Property) => ({
        id: item.id?.toString() || Date.now().toString(),
        title: item.title || "Untitled Property",
        price: Number(item.price) || 0,
        location: item.location || "Location not specified",
        description: item.description || "No description available",
        bathrooms: item?.bathrooms || 2,
        area: item?.area ? Number(item.area) : 780,
        type: item.type || undefined,
        image:
          "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800",
      }));

      setProperties(transformedProperties);
    } catch (err) {
      console.error("Error fetching properties:", err);
      setError(
        err instanceof Error ? err.message : "Failed to fetch properties"
      );
      // Set empty array on error
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  const addProperty = async (propertyData: Omit<Property, "id">) => {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(propertyData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Refresh the properties list after adding
      await fetchProperties();
    } catch (err) {
      console.error("Error adding property:", err);
      throw new Error(
        err instanceof Error ? err.message : "Failed to add property"
      );
    }
  };

  const refreshProperties = async () => {
    await fetchProperties();
  };

  const getPropertyById = (id: string) => {
    return properties.find((property) => property.id === id);
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <PropertyContext.Provider
      value={{
        properties,
        loading,
        error,
        addProperty,
        getPropertyById,
        refreshProperties,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
}

export function useProperty() {
  const context = useContext(PropertyContext);
  if (context === undefined) {
    throw new Error("useProperty must be used within a PropertyProvider");
  }
  return context;
}
