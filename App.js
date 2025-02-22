import React, { useEffect, useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import AuctionItem from "./components/AuctionItem";
import Dashboard from "./components/Dashboard";
import Landing from "./components/Landing";
import PostAuction from "./components/PostAuction";
import Signin from "./components/Signin";
import Signup from "./components/Signup";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate(); // Uncommented this line to enable navigation

  // Check for authentication token on load
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    navigate("/signin"); // Redirect to Signin after logout
  };

  return (
    <div className="app">
      <header>
        <h1>Auction App</h1>
        <nav>
          {!isAuthenticated && (
            <>
              <Link to="/signup" className="nav-link">
                Signup
              </Link>
              <Link to="/signin" className="nav-link">
                Signin
              </Link>
            </>
          )}
          {isAuthenticated && (
            <>
              <Link to="/dashboard" className="nav-link">
                Dashboard
              </Link>
              <Link to="/post-auction" className="nav-link">
                Post Auction
              </Link>
              <button
                style={{
                  marginLeft: "10px",
                  background: "red",
                  color: "white",
                }}
                onClick={handleLogout}
                className="nav-link logout-button"
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/auction/:id" element={<AuctionItem />} />
          <Route path="/post-auction" element={<PostAuction />} />
        </Routes>
      </main>
      <footer>
        <p>&copy; 2025 Auction App. All rights reserved.</p>
        <p>Welcome to the best place to buy and sell items through auctions!</p>
      </footer>
    </div>
  );
}

export default App;
