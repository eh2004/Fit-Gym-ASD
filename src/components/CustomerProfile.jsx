import React, { useState } from "react";
import profileImage from "../assets/placeholder.png";
import Modal from "react-modal";

Modal.setAppElement("#root");

function CustomerProfile() {
  const [customerInfo, setCustomerInfo] = useState({
    name: "John Doe",
    bio: "Fitness enthusiast.",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    address: "123 Street, City, Country",
    fitnessGoal: "Weight Loss",
    progress: "30% progress towards weight loss",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(customerInfo);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this customer profile?")) {
      console.log("Customer profile deleted");
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setCustomerInfo(formData);
    setIsEditing(false);
  };

  return (
    <div className="customer-profile">
      <img src={profileImage} alt="Customer" className="customer-image" />
      <div className="customer-info">
        <h2>{customerInfo.name}</h2>
        <p><strong>Bio: </strong>{customerInfo.bio}</p>
        <p><strong>E-mail: </strong>{customerInfo.email}</p>
        <p><strong>Phone: </strong>{customerInfo.phone}</p>
        <p><strong>Address: </strong>{customerInfo.address}</p>
        <p><strong>Fitness Goal: </strong>{customerInfo.fitnessGoal}</p>
        <p><strong>Progress: </strong>{customerInfo.progress}</p>
        <button onClick={handleEditToggle} className="primary-button">Update Info</button>
        <button onClick={handleDelete} className="danger-button">Delete Profile</button>
      </div>

      {/* Modal for editing the customer info */}
      <Modal isOpen={isEditing} onRequestClose={handleEditToggle} className="modal" overlayClassName="modal-overlay">
        <h2>Edit Customer Info</h2>
        <div className="modal-content">
          <div className="input-row">
            <div className="input-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-group">
              <label htmlFor="bio">Bio</label>
              <input
                type="text"
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="input-row">
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="input-row">
            <div className="input-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-group">
              <label htmlFor="fitnessGoal">Fitness Goal</label>
              <input
                type="text"
                id="fitnessGoal"
                name="fitnessGoal"
                value={formData.fitnessGoal}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <div className="modal-buttons">
          <button onClick={handleSave} className="primary-button">Save</button>
          <button onClick={handleEditToggle} className="secondary-button">Cancel</button>
        </div>
      </Modal>
    </div>
  );
}

export default CustomerProfile;