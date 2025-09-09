import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PropertyProvider } from "./context/PropertyContext";
import Header from "./components/Header";
import PropertyDetail from "./pages/PropertyDetail";
import AddListing from "./pages/AddListing";
import Homepage from "./pages/HomePage";

function App() {
  return (
    <PropertyProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
          <Header />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/property/:id" element={<PropertyDetail />} />
            <Route path="/add" element={<AddListing />} />
          </Routes>
        </div>
      </Router>
    </PropertyProvider>
  );
}

export default App;
