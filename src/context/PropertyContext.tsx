import { createContext, useContext, useState } from "react";

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
  addProperty: (property: Omit<Property, "id">) => void;
  getPropertyById: (id: string) => Property | undefined;
}

const PropertyContext = createContext<PropertyContextType | undefined>(
  undefined
);

const initialProperties: Property[] = [
  {
    id: "1",
    title: "Modern Downtown Apartment",
    price: 450000,
    location: "Downtown, City Center",
    description:
      "Beautiful modern apartment in the heart of the city with stunning views and premium amenities. Features include hardwood floors, stainless steel appliances, and floor-to-ceiling windows.",
    image:
      "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800",
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    type: "Apartment",
  },
  {
    id: "2",
    title: "Cozy Suburban House",
    price: 320000,
    location: "Suburban Heights",
    description:
      "Charming family home with a spacious backyard, perfect for families. Recently renovated kitchen and bathrooms, new roof, and energy-efficient windows throughout.",
    image:
      "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800",
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    type: "House",
  },
  {
    id: "3",
    title: "Luxury Waterfront Condo",
    price: 750000,
    location: "Marina District",
    description:
      "Stunning waterfront condominium with panoramic ocean views. Features a private balcony, marble countertops, and access to exclusive building amenities including pool and gym.",
    image:
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800",
    bedrooms: 2,
    bathrooms: 3,
    area: 1500,
    type: "Condo",
  },
  {
    id: "4",
    title: "Historic Victorian Home",
    price: 580000,
    location: "Heritage District",
    description:
      "Beautifully restored Victorian home with original architectural details. Features include restored hardwood floors, ornate moldings, and a wraparound porch.",
    image:
      "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800",
    bedrooms: 4,
    bathrooms: 3,
    area: 2200,
    type: "House",
  },
];

export function PropertyProvider({ children }: { children: React.ReactNode }) {
  const [properties, setProperties] = useState<Property[]>(initialProperties);

  const addProperty = (propertyData: Omit<Property, "id">) => {
    const newProperty: Property = {
      ...propertyData,
      id: Date.now().toString(),
      image:
        "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800",
    };
    setProperties((prev) => [newProperty, ...prev]);
  };

  const getPropertyById = (id: string) => {
    return properties.find((property) => property.id === id);
  };

  return (
    <PropertyContext.Provider
      value={{ properties, addProperty, getPropertyById }}
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
