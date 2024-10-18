import React from "react";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export default function AddCertificates() {
    const[certificates, setCertificates] = useState([{ id: uuidv4(), cert_id: "", cert_name: "", cert_provider: "", cert_duration: "" }]);
    

    const handleAddCertificate = (e) => {
        e.preventDefault();
        setCertificates([...certificates, { id: uuidv4(), cert_id: "", cert_name: "", cert_provider: "", cert_duration: "" }]);
    };
    
    const handleRemoveCertificate = (id) => {
        setCertificates(certificates.filter(certificate => certificate.id !== id));
    };

    const handleInputChange = (index, field, value) => {
        const updatedCertificates = [...certificates];
        updatedCertificates[index][field] = value;
        setCertificates(updatedCertificates);
    };

    return (
        <React.Fragment>
        <h2 className="payment-heading">Certifications</h2>
        <div className="register-form">
        {certificates.map((certificate, index) => (
            <div key={certificate.id}>
                <div className="cert-header">
                    <h3 className="cert-number">Certificate {index + 1}</h3>
                    <button className="cert-button remove-button" type="button" onClick={() => handleRemoveCertificate(certificate.id)}>X</button>
                </div>
                <div className="field-container">
                <div className="two-col">
                <div>
                    <label htmlFor={"cert-id" + {index}}>Certificate ID</label><br/>
                    <input type="text" id={"cert-id" + {index}} value={certificate.cert_id} onChange={(e) => handleInputChange(index, 'cert_id', e.target.value)}/><br/>
                    <div className="error-register">Enter a valid ID</div>
                </div>

                <div className="div-two">
                    <label htmlFor={"cert-name" + {index}}>Certificate Name</label><br/>
                    <select className="gender-dropdown cert-dropdown" id={"cert-name" + {index}} value={certificate.cert_name} onChange={(e) => handleInputChange(index, 'cert_name', e.target.value)}>
                        <option value=""></option>
                        <option value=""></option>
                        <option value=""></option>
                        <option value=""></option>
                        <option value=""></option>
                        <option value=""></option>
                    </select>
                    <div className="error-register">Enter a valid name</div>
                </div>
                </div>
                </div>

                <div className="field-container">
                <div className="two-col">
                <div>   
                    <label htmlFor={"cert-provider" + {index}}>Provider</label><br/>
                    <select className="gender-dropdown cert-dropdown" type="text" id={"cert-provider" + {index}} value={certificate.cert_provider} onChange={(e) => handleInputChange(index, 'cert_provider', e.target.value)}>
                        <option value=""></option>
                        <option value=""></option>
                        <option value=""></option>
                        <option value=""></option>
                        <option value=""></option>
                        <option value=""></option>
                    </select>
                    <div className="error-register">Select a provider</div>
                </div>

                <div className="div-two">
                    <label htmlFor={"cert-duration" + {index}}>Duration</label><br/>
                    <select className="gender-dropdown cert-dropdown" type="text" id={"cert-duration" + {index}} value={certificate.cert_duration} onChange={(e) => handleInputChange(index, 'cert_duration', e.target.value)}>
                        <option value=""></option>
                        <option value=""></option>
                        <option value=""></option>
                        <option value=""></option>
                        <option value=""></option>
                        <option value=""></option>
                    </select>
                    <div className="error-register">Select a duration</div>
                </div>
                </div>
                </div>

            </div>
        ))}
        </div>
        <button className="cert-button add-button" type="button" onClick={handleAddCertificate}>Add Another</button>
        </React.Fragment>
    );
}