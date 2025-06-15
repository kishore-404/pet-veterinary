import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Service from "./pages/Service";
import Products from "./pages/Products";
import PetCare from "./pages/PetCare";
import Login from "./pages/Login";
import BookNow from "./pages/BookNow";
import DashBoard from "./pages/DashBoard";
import SignupQA from "./pages/SignupQA";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";

import ScrollToTop from "./components/ScrollToTop";
import ScrollToTopButton from "./components/ScrollToTop_button";
import PetLoader from "./components/PetLoader";

// Loader wrapper to detect location change
function RouteChangeWrapper({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

   useEffect(() => {
    const isDesktop = window.innerWidth >= 768; // show loader only for md and up
    if (isDesktop) {
      setLoading(true);
      const timeout = setTimeout(() => setLoading(false), 600);
      return () => clearTimeout(timeout);
    } else {
      setLoading(false); // skip loader on mobile
    }
  }, [location.pathname]);

  return (
    <>
      {loading && <PetLoader />}
      {children}
    </>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <ScrollToTopButton />

      <RouteChangeWrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Service />} />
          <Route path="/products" element={<Products />} />
          <Route path="/pet-care" element={<PetCare />} />
          <Route path="/login" element={<Login />} />
          <Route path="/book-now" element={<BookNow />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/sign-qa" element={<SignupQA />} />
        </Routes>
      </RouteChangeWrapper>
    </Router>
  );
}

export default App;
