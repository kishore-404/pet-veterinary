import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Service from "./pages/Service";
// import Products from "./pages/Products";
import PetCare from  "./pages/PetCare.tsx"
import ScrollToTopButton from "./components/ScrollToTop";

function App() {
  return (
    
    <Router>
       <ScrollToTopButton/>
      <Routes>
       
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Service />} />
        {/* <Route path="/products" element={<Products />} /> */}
        <Route path="/pet-care" element={<PetCare />} />
      </Routes>
    </Router>
  );
}

export default App;
