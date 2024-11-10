import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';  // Ensure axios is properly imported

const FormComponent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileNo: '',
    designation: '',
    gender: '',
    course: [],
    imgUpload: null,
  });

  const [errors, setErrors] = useState({});
  const existingEmails = ["test@example.com", "user@example.com"]; // Example list of existing emails

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prevData) => ({
        ...prevData,
        course: checked
          ? [...prevData.course, value]
          : prevData.course.filter((course) => course !== value),
      }));
    } else if (type === 'file') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: e.target.files[0],  // Only one file can be uploaded at a time
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const validate = () => {
    let validationErrors = {};
    
    // Check for required fields
    if (!formData.name) validationErrors.name = "Name is required";
    if (!formData.email) validationErrors.email = "Email is required";
    if (!formData.mobileNo) validationErrors.mobileNo = "Mobile number is required";
    if (!formData.designation) validationErrors.designation = "Designation is required";
    if (!formData.gender) validationErrors.gender = "Gender is required";
    

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      validationErrors.email = "Please enter a valid email address";
    }

    // Check for duplicate email
    if (existingEmails.includes(formData.email)) {
      validationErrors.email = "This email is already taken";
    }

    // Numeric validation for mobile number
    if (formData.mobileNo && !/^\d+$/.test(formData.mobileNo)) {
      validationErrors.mobileNo = "Mobile number should contain only numbers";
    }

    // File type validation
    

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    if (validate()) {
      try {
        // Prepare form data to send
        const formDataToSend = new FormData();
        formDataToSend.append("name", formData.name);
        formDataToSend.append("email", formData.email);
        formDataToSend.append("mobileNo", formData.mobileNo);
        formDataToSend.append("designation", formData.designation);
        formDataToSend.append("gender", formData.gender);
        formDataToSend.append("course", formData.course.join(", "));
        

        // Get token from localStorage (ensure token exists before sending request)
        const token = localStorage.getItem("token");
        if (!token) {
          alert("You are not authenticated. Please log in.");
          return;
        }

        // Send data to the server
        const response = await axios.post(
          "http://localhost:3001/employee",
          formData
        );

        // Handle response
        if (response.data.success) {
          alert("Employee data saved successfully!");
          navigate('/dashboard');  // Redirect to dashboard after successful submission
        } else {
          alert("Error saving data: " + response.data.error);
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("Error submitting form");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <button
        type="button"
        className="btn btn-secondary mb-3"
        onClick={() => navigate('/dashboard')}
      >
        Back
      </button>

      <div className="mb-3">
        <label className="form-label">Name</label>
        <input
          type="text"
          className="form-control"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <div className="text-danger">{errors.name}</div>}
      </div>
      
      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          type="email"
          className="form-control"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <div className="text-danger">{errors.email}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Mobile No</label>
        <input
          type="text"
          className="form-control"
          name="mobileNo"
          value={formData.mobileNo}
          onChange={handleChange}
        />
        {errors.mobileNo && <div className="text-danger">{errors.mobileNo}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Designation</label>
        <select
          className="form-select"
          name="designation"
          value={formData.designation}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="HR">HR</option>
          <option value="Manager">Manager</option>
          <option value="Sales">Sales</option>
        </select>
        {errors.designation && <div className="text-danger">{errors.designation}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Gender</label>
        <div>
          <input
            type="radio"
            name="gender"
            value="M"
            checked={formData.gender === 'M'}
            onChange={handleChange}
          /> Male
          <input
            type="radio"
            name="gender"
            value="F"
            checked={formData.gender === 'F'}
            onChange={handleChange}
            className="ms-3"
          /> Female
        </div>
        {errors.gender && <div className="text-danger">{errors.gender}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Course</label>
        <div>
          <input
            type="checkbox"
            name="course"
            value="MCA"
            checked={formData.course.includes('MCA')}
            onChange={handleChange}
          /> MCA
          <input
            type="checkbox"
            name="course"
            value="BCA"
            checked={formData.course.includes('BCA')}
            onChange={handleChange}
            className="ms-3"
          /> BCA
          <input
            type="checkbox"
            name="course"
            value="BSC"
            checked={formData.course.includes('BSC')}
            onChange={handleChange}
            className="ms-3"
          /> BSC
        </div>
        {errors.course && <div className="text-danger">{errors.course}</div>}
      </div>

      

      <button type="submit" className="btn btn-success">Submit</button>
    </form>
  );
};

export default FormComponent;
