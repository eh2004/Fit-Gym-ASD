import React, { useState, useEffect } from 'react';


export default function AddLanguages({ onLanguagesChange, setLanguageValid }) {
    const [languages, setLanguages] = useState([{ language: "English" }]);
    const [languageValid, setLocalLanguageValid] = useState(true);

    // Handle input change
    const handleInputChange = (index, event) => {
        const newLanguages = [...languages];
        newLanguages[index][event.target.name] = event.target.value;
        setLanguages(newLanguages);
    };

    // Add a new language field
    const handleAddLanguage = () => {
        setLanguages([...languages, { language: "" }]);
    };

    // Remove a language field
    const handleRemoveLanguage = (index) => {
        const newLanguages = [...languages];
        newLanguages.splice(index, 1);
        setLanguages(newLanguages);
    };

    useEffect(() => {
        onLanguagesChange(languages);
        // Validate: Ensure at least one language is filled in
        const allLanguagesFilled = languages.every(lang => lang.language.trim() !== "");
        setLocalLanguageValid(allLanguagesFilled);
        setLanguageValid(allLanguagesFilled); // Pass the validation state to the main form
    }, [languages, onLanguagesChange, setLanguageValid]);
    

    return (
        <React.Fragment>
            <div className="field-container">
                {languages.map((languageField, index) => (
                    <div key={index} className="language-container">
                    <div className="two-col">                       
                        <div className="language-field">
                        <label htmlFor={`language-${index}`}>Language {index + 1}</label><br />
                        <input type="text" id={`language-${index}`} name="language" value={languageField.language} onChange={(event) => handleInputChange(index, event)}/><br/>
                        </div>

                        <div className="delete-language">
                        {index > 0 && (
                            <button type="button" className="cert-button remove-button" onClick={() => handleRemoveLanguage(index)}>X</button>
                        )}
                        </div>
                    </div>
                    </div>  
                ))}

                <button type="button" className="cert-button add-button" onClick={handleAddLanguage}>Add Language</button>
            </div>
            
            <div className="error-register language-error" style={{ visibility: languageValid ? 'hidden' : 'visible' }}>Enter a language</div>  

        </React.Fragment>
    );
}
