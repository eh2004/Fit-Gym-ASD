import React, { useState, useEffect } from "react";
import profileImage from "../assets/profile.jpeg";
import Modal from "react-modal"; // Import the Modal component

Modal.setAppElement("#root"); // Ensure accessibility for screen readers

// Trainer profile component
  function TrainerProfile() {
    const [trainerInfo, setTrainerInfo] = useState({
      id: "", // Make sure the trainer ID is included here
      name: "",
      email: "",
      phone: "",
      address: "",
      specialty: "",
      certification: "",
      language: "",
      bio: "",
    });

  // State for editing the trainer info
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(trainerInfo);
  const [certificates, setCertificates] = useState([]); // State for certificates

  // Fetch trainer data based on logged-in trainer
  useEffect(() => {
    const fetchTrainerData = async () => {
      try {
        // Get the trainer ID dynamically (from localStorage)
        const trainerId = localStorage.getItem("loggedInUser"); // This should now give you just the trainer ID
  
        if (!trainerId) {
          console.error("No trainer ID found in localStorage");
          return;
        }
  
        // Fetch trainer details
      const response = await fetch(`http://localhost:3000/api/trainers/${trainerId}`);
      const data = await response.json();

      // Fetch certificates based on trainer_id
      const certResponse = await fetch(`http://localhost:3000/api/certificates?trainer_id=${trainerId}`);
      const certData = await certResponse.json();

      // Do NOT join the certificates repeatedly; reset it every time
      const certifications = certData.map(cert => cert.certificate_name).join(", ");
  
        // Populate trainer info with fetched data
        setTrainerInfo({
          id: data.trainer_id,
          name: `${data.first_name} ${data.last_name}` || "",
          email: data.email_address || "",
          phone: data.phone_number || "",
          address: data.street_address || "",
          specialty: data.specialty || "Weight Loss",
          certification: certifications || "No certifications available",  // Use combined certification string
          language: data.language ? data.language.join(", ") : "",
          bio: data.bio || "No bio available",
        });

        // Set form data to the fetched trainer info
        setFormData({
          id: data.trainer_id,
          name: `${data.first_name} ${data.last_name}` || "",
          email: data.email_address || "",
          phone: data.phone_number || "",
          address: data.street_address || "",
          specialty: data.specialty || "",
          certification: certifications || "",
          language: data.language ? data.language.join(", ") : "",
          bio: data.bio || "",
        });
        
      // Replace certificates (reset state every time)
      setCertificates(certData);
    } catch (error) {
      console.error("Error fetching trainer or certificate data:", error);
    }
  };

  fetchTrainerData();
}, []);
   

  // Delete the trainer profile
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this trainer profile?")) {
      console.log("Attempting to delete trainer with ID:", trainerInfo.id);
  
      // First, delete the trainer profile
      fetch(`http://localhost:3000/api/trainers/${trainerInfo.id}`, {
        method: "DELETE",
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete trainer");
        }
  
        // Then delete related certificates (optional)
        return fetch(`http://localhost:3000/api/certificates?trainer_id=${trainerInfo.id}`, {
          method: "DELETE",  // Adjust your backend to handle this if needed
        });
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete related certificates");
        }
  
        alert("Trainer profile and related certificates deleted.");
        setTrainerInfo({}); // Clear trainer info
      })
      .catch((error) => {
        console.error("Error deleting trainer or certificates:", error);
      });
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
    // Update the trainer info
    const trainerResponse = await fetch(`http://localhost:3000/api/trainers/${trainerInfo.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: formData.name.split(" ")[0], // First name
        last_name: formData.name.split(" ")[1] || "", // Last name
        email_address: formData.email,
        phone_number: formData.phone,
        street_address: formData.address,
        language: formData.language.split(",").map((lang) => lang.trim()), // Convert language to array
      }),
    });
    
    if (!trainerResponse.ok) {
      throw new Error("Failed to update trainer info");
    }

    console.log("Trainer info updated");

    // Now we handle updating certificates (only if they exist)
    await handleCertificatesSave();

    setTrainerInfo(formData); // Update trainerInfo after saving
    setIsEditing(false);

  } catch (error) {
    console.error("Error updating trainer info:", error);
  }
};

  const handleCertificatesSave = async () => {
    try {
      const certResponse = await fetch(`http://localhost:3000/api/certificates?trainer_id=${trainerInfo.id}`);
      const certData = await certResponse.json();
    
      if (certData.length > 0) {
        // Loop through existing certificates and update each one
        for (let cert of certData) {
          const updateCertResponse = await fetch(`http://localhost:3000/api/certificates/${cert.certificate_id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              certificate_name: formData.certification,  // Update with form data
              trainer_id: trainerInfo.id,  // Ensure correct trainer ID
            }),
          });
      
          if (!updateCertResponse.ok) {
            throw new Error(`Failed to update certificate with ID: ${cert.certificate_id}`);
          }
      
          console.log(`Certificate with ID: ${cert.certificate_id} updated successfully`);
        }
      } else {
        console.log("No existing certificates found for this trainer, no new certificates will be created.");
      }
    
    } catch (error) {
      console.error("Error updating certificates:", error);
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