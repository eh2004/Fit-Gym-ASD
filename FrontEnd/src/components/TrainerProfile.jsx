import React, { useState, useEffect } from "react";
import profileImage from "../assets/profile.jpeg";
import Modal from "react-modal"; // Import the Modal component

Modal.setAppElement("#root"); // Ensure accessibility for screen readers

// Trainer profile component
function TrainerProfile() {
  const [trainerInfo, setTrainerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "", // These will be added later
    specialty: "",
    certification: "",
    language: "",
    bio: "",
  });

  // State for editing the trainer info
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(trainerInfo);

  // Fetch trainer data from the database on component mount
  useEffect(() => {
    const fetchTrainerData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/users/1"); // Adjust the ID if needed
        const data = await response.json();

        // Populate trainer info with fetched data
        setTrainerInfo({
          name: data.username || "",
          email: data.email || "",
          phone: data.phno || "",
          address: "", // Placeholder until the data is added
          specialty: "", // Placeholder
          certification: "", // Placeholder
          language: "", // Placeholder
          bio: "", // Placeholder
        });

        // Set form data to the fetched trainer info
        setFormData({
          name: data.username || "",
          email: data.email || "",
          phone: data.phno || "",
          address: "",
          specialty: "",
          certification: "",
          language: "",
          bio: "",
        });
      } catch (error) {
        console.error("Error fetching trainer data:", error);
      }
    };

    fetchTrainerData();
  }, []);

  //  Delete the trainer profile
  const handleDelete = () => {
    if (
      window.confirm("Are you sure you want to delete this trainer profile?")
    ) {
      console.log("Trainer profile deleted");
    }
  };

  // Toggle the edit mode
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Save the updated trainer info
  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/users/1`, {
        // Adjust the ID as needed
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.name, // Map formData to what the backend expects
          email: formData.email,
          phno: formData.phone,
        }),
      });

      if (response.ok) {
        console.log("Trainer info updated");
        setTrainerInfo(formData); // Update trainerInfo after saving
        setIsEditing(false)
      } else {
        console.error("Failed to update trainer info");
      }
    } catch (error) {
      console.error("Error updating trainer info:", error);
    }
  };

  return (
    <div className="trainer-profile">
      <img src={profileImage} alt="Trainer" className="trainer-image" />
      <div className="trainer-info">
        <h2>{trainerInfo.name}</h2>
        <p>
          <strong>Bio: </strong>
          {trainerInfo.bio}
        </p>
        <p>
          <strong>E-mail: </strong>
          {trainerInfo.email}
        </p>
        <p>
          <strong>Phone: </strong>
          {trainerInfo.phone}
        </p>
        <p>
          <strong>Address: </strong>
          {trainerInfo.address}
        </p>
        <p>
          <strong>Specialty Area: </strong>
          {trainerInfo.specialty}
        </p>
        <p>
          <strong>Certification: </strong>
          {trainerInfo.certification}
        </p>
        <p>
          <strong>Language: </strong>
          {trainerInfo.language}
        </p>
        <button onClick={handleEditToggle} className="primary-button">
          Update Info
        </button>
        <button onClick={handleDelete} className="danger-button">
          Delete Profile
        </button>
      </div>

      {/* Modal for editing the trainer info */}
      {/* Modal for editing the trainer info */}
      <Modal
        isOpen={isEditing}
        onRequestClose={handleEditToggle}
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2>Edit Trainer Info</h2>
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
              <label htmlFor="specialty">Specialty</label>
              <input
                type="text"
                id="specialty"
                name="specialty"
                value={formData.specialty}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="input-row">
            <div className="input-group">
              <label htmlFor="certification">Certification</label>
              <input
                type="text"
                id="certification"
                name="certification"
                value={formData.certification}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-group">
              <label htmlFor="language">Language</label>
              <input
                type="text"
                id="language"
                name="language"
                value={formData.language}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <div className="modal-buttons">
          <button onClick={handleSave} className="primary-button">
            Save
          </button>
          <button onClick={handleEditToggle} className="secondary-button">
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default TrainerProfile;
