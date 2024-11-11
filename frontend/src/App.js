import { createContext, useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import AdminHome from "./modules/admin/AdminHome";
import ForgotPassword from "./modules/common/ForgotPassword"; // Import ForgotPassword component
import Home from "./modules/common/Home";
import Login from "./modules/common/Login";
import Register from "./modules/common/Register";
import OwnerHome from "./modules/user/Owner/OwnerHome";
import RenterHome from "./modules/user/renter/RenterHome";

export const UserContext = createContext();

function App() {
  const date = new Date().getFullYear();
  const [userData, setUserData] = useState();
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const getData = async () => {
    try {
      const user = await JSON.parse(localStorage.getItem("user"));
      if (user && user !== undefined) {
        setUserData(user);
        setUserLoggedIn(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <UserContext.Provider value={{ userData, userLoggedIn }}>
      <div className="App">
        <Router>
          <div className="content" style={{ backgroundColor: "#333333" }}>
            {/* Routes for different pages */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgotpassword" element={<ForgotPassword />} />{" "}
              {/* Add ForgotPassword route */}
              {userLoggedIn ? (
                <>
                  <Route path="/adminhome" element={<AdminHome />} />
                  <Route path="/ownerhome" element={<OwnerHome />} />
                  <Route path="/renterhome" element={<RenterHome />} />
                </>
              ) : (
                <Route path="/login" element={<Login />} />
              )}
            </Routes>
          </div>

          {/* Footer */}
          <footer className="footer-custom">
            <div className="footer-text">© {date} Copyright: Naraayanan</div>
          </footer>
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;
