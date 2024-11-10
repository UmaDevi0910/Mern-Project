// Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3001/user", {
          headers: { Authorization: token },
        });
        setUserName(response.data.name);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      {/* Top Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom shadow-sm">
        <div className="container">
          <a className="navbar-brand" href="#">Logo</a>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ml-auto">
              
              <li className="nav-item">
                <a className="nav-link" href="#">{userName}</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#"
                onClick={() => navigate('/login')}
                >Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Sidebar and Content */}
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-2 bg-warning text-dark p-3 vh-100">
            <h5>Dashboard</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <a className="nav-link active text-dark" href="#">Overview</a>
              </li>
              <li className="nav-item mb-2">
                <a className="nav-link text-dark" href="#">Settings</a>
              </li>
              <li className="nav-item mb-2">
                <a className="nav-link text-dark" href="#">Profile</a>
              </li>
              <li className="nav-item mb-2">
                <a className="nav-link text-dark" href="#">Help</a>
              </li>
            </ul>
          </div>

          {/* Main Content Area */}
          <div className="col-md-10 p-5">
            <h3 className="text-center mb-4">Welcome to the Admin Panel</h3>

            {/* Action Buttons */}
            <div className="d-flex justify-content-center mb-5">
              <button
                className="btn btn-primary me-3"
                onClick={() => navigate('/employee')} // Navigate to Employee page
              >
                <i className="bi bi-person-plus"></i> Create Employee
              </button>
              <button className="btn btn-secondary"
              onClick={() => navigate('/list')}>
                <i className="bi bi-pencil-square"></i> Employee list
              </button>
            </div>

            {/* Dashboard Content */}
            <div className="row">
              {/* Cards and Employee Table */}
              {/* Your existing dashboard content here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
