import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import '../styles/JoinWaitlist.css';
import { Link } from 'react-router-dom';

const JoinWaitList = () => {
  const [formData, setFormData] = useState({
    pincode: '',
    service: '',
    name: '',
    email: '',
    phone: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Check if any of the required fields are empty
    const requiredFields = ['pincode', 'service', 'name', 'email', 'phone'];
    const emptyFields = requiredFields.filter(field => !formData[field].trim());
    if (emptyFields.length > 0) {
      alert(`Please fill in all required fields: ${emptyFields.join(', ')}`);
    } else {
      window.location.href = '/timer';
    }
  };

  return (
    <div className="JoinWaitList">
      <Header />
      <div className="signin-wrapper">
        <div className="signin-container">
          <h1>Join Waitlist</h1>
          <form className="signin-form" onSubmit={handleSubmit}>
            <label htmlFor="pincode">Pincode:</label><br />
            <input type="text" id="pincode" name="pincode" value={formData.pincode} onChange={handleInputChange} required /><br />
            <label htmlFor="service">Nearest Service Ontario:</label><br />
            <select id="service" name="service" value={formData.service} onChange={handleInputChange} required>
              <option value="">Select Service</option>
              <option value="HealthCardRenewal">Health Card Renewal</option>
              <option value="DriverLicenceRenewal">Driver Licence Renewal</option>
              <option value="LicensePlate">License Plate</option>
              <option value="ParkingPermit">Parking Permit</option>
              <option value="OntarioPhotoCard">Ontario Photo Card</option>
            </select><br />
            <label htmlFor="name">Name:</label><br />
            <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required /><br />
            <label htmlFor="email">Email Address:</label><br />
            <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required /><br />
            <label htmlFor="phone">Phone Number:</label><br />
            <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} pattern="[0-9]{10}" required /><br />
            <button type="submit" className="circular-button-join">Join Waitlist</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default JoinWaitList;
