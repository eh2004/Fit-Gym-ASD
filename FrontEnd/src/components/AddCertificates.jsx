import React, { useState, useEffect } from "react";

export default function AddCertificates({ onCertificatesChange }) {
    const [certificates, setCertificates] = useState([{ certificate_name: "Certified Personal Trainer", certificate_provider: "Australian Institute of Fitness", certificate_duration: "2 years" }]);

    const handleInputChange = (index, field, value) => {
        const updatedCertificates = [...certificates];
        updatedCertificates[index][field] = value;
        setCertificates(updatedCertificates);
    };

    const handleAddCertificate = () => {
        setCertificates([
            ...certificates, 
            { certificate_name: "", certificate_provider: "", certificate_duration: "" }
        ]);
    };

    const handleRemoveCertificate = (index) => {
        const updatedCertificates = [...certificates];
        updatedCertificates.splice(index, 1);
        setCertificates(updatedCertificates);
    };

    // Effect to propagate changes
    useEffect(() => {
        onCertificatesChange(certificates);
    }, [certificates, onCertificatesChange]);

    return (
        <React.Fragment>
            <h2 className="payment-heading">Certifications</h2>
            <div className="register-form">
                {certificates.map((certificate, index) => (
                    <div key={index}>
                        <div className="cert-header">
                            <h3 className="cert-number">Certificate {index + 1}</h3>
                            {index > 0 && (<button className="cert-button remove-button" type="button" onClick={() => handleRemoveCertificate(index)}>X</button>)}
                        </div>

                        <div className="field-container">
                            <div className="two-col">
                                <div>
                                    <label htmlFor={`cert-name-${index}`}>Certificate Name</label><br />
                                    <select className="gender-dropdown cert-dropdown" id={`cert-name-${index}`}value={certificate.certificate_name || ""} onChange={(e) => handleInputChange(index, 'certificate_name', e.target.value)}>
                                        <option value="Certified Personal Trainer">Certified Personal Trainer</option>
                                        <option value="Certified Exercise Physiologist">Certified Exercise Physiologist</option>
                                        <option value="Certified Nutrition Coach">Certified Nutrition Coach</option>
                                        <option value="Performance Enhancement Specialist">Performance Enhancement Specialist</option>
                                        <option value="Certificate III in Fitness">Certificate III in Fitness</option>
                                        <option value="Certificate IV in Fitness">Certificate IV in Fitness</option>
                                        <option value="Corrective Exercise Specialist">Corrective Exercise Specialist</option>
                                    </select>
                                </div>

                                <div className="div-two">
                                    <label htmlFor={`cert-provider-${index}`}>Provider</label><br />
                                    <select className="gender-dropdown cert-dropdown" id={`cert-provider-${index}`} value={certificate.certificate_provider || ""} onChange={(e) => handleInputChange(index, 'certificate_provider', e.target.value)}>
                                        <option value="Australian Institute of Fitness">Australian Institute of Fitness</option>
                                        <option value="International Sports Sciences Association">International Sports Sciences Association</option>
                                        <option value="National Academy of Sports Medicine">National Academy of Sports Medicine</option>
                                        <option value="Australian Fitness Academy">Australian Fitness Academy</option>
                                        <option value="National Federation of Professional Trainers">National Federation of Professional Trainers</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="field-container">
                            <div>
                                <label htmlFor={`cert-duration-${index}`}>Duration</label><br />
                                <select className="gender-dropdown cert-dropdown" id={`cert-duration-${index}`} value={certificate.certificate_duration || ""} onChange={(e) => handleInputChange(index, 'certificate_duration', e.target.value)}>
                                    <option value="Less than 1 year">Less than 1 year</option>
                                    <option value="1 year">1 year</option>
                                    <option value="2 years">2 years</option>
                                    <option value="3 years">3 years</option>
                                    <option value="4 years">4 years</option>
                                    <option value="More than 4 years">More than 4 years</option>
                                </select>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <button className="cert-button add-button" type="button" onClick={handleAddCertificate}>Add Another</button>
        </React.Fragment>
    );
}
