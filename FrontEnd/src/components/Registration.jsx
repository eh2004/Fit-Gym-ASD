import React, { useEffect, useCallback, Fragment } from 'react';
import ReactDOM from "react-dom/client"
import Header from "../components/Header.jsx"
import Footer from "../components/Footer.jsx"
import { useState } from "react";
import { BasicPerks } from "./PlanPerks.jsx";
import { StandardPerks } from "./PlanPerks.jsx";
import { PremiumPerks } from "./PlanPerks.jsx";
import MembershipPlan from "./MembershipPlan.jsx";
import RegisteredMessage from "./RegisteredMsg.jsx";

function Register() {

    const[first_name, setFirstName] = useState("");
    const[last_name, setLastName] = useState("");
    const[email_address, setEmailAddress] = useState("");
    const[phone_number, setPhoneNumber] = useState("");
    const[date_of_birth, setDateOfBirth] = useState("");
    const[gender, setGender] = useState("female");
    const[street_address, setStreetAddress] = useState("");
    const[city, setCity] = useState("");
    const[state, setState] = useState("");
    const[zip_code, setZipCode] = useState("");
    const[country, setCountry] = useState("");
    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");

    const[name_on_card, setNameOnCard] = useState("");
    const[card_number, setCardNumber] = useState("");
    const[cvv, setCVV] = useState("");
    const[expiration_date, setExpirationDate] = useState("");

    const[plan, setPlan] = useState("");

    //Error message states
    const[firstNameValid, setFirstNameValid] = useState(true);
    const[lastNameValid, setLastNameValid] = useState(true);
    const[emailValid, setEmailValid] = useState(true);
    const[phoneNumberValid, setPhoneNumberValid] = useState(true);
    const[dobValid, setDobValid] = useState(true);
    const[streetAddressValid, setStreetAddressValid] = useState(true);
    const[cityValid, setCityValid] = useState(true);
    const[stateValid, setStateValid] = useState(true);
    const[zipValid, setZipValid] = useState(true);
    const[countryValid, setCountryValid] = useState(true);
    const[usernameValid, setUsernameValid] = useState(true);
    const[passwordValid, setPasswordValid] = useState(true);
    const[nameOnCardValid, setNameOnCardValid] = useState(true);
    const[cardNumberValid, setCardNumberValid] = useState(true);
    const[cvvValid, setCvvValid] = useState(true);
    const[expirationDateValid, setExpirationDateValid] = useState(true);
    const[planValid, setPlanValid] = useState(true);

    const[userRegistered, setUserRegistered] = useState(false);

    const[planSelected, setPlanSelected] = useState(false);

    const[customersList, setCustomersList] = useState([]);
    const[trainersList, setTrainersList] = useState([]);
    const[usernameExists, setUsernameExists] = useState(false);

    useEffect(() => {
        Promise.all([
            fetch('http://localhost:3000/api/customers').then((response) => response.json()),
            fetch('http://localhost:3000/api/trainers').then((response) => response.json()),
        ])
        .then(([customerData, trainerData]) => {
            setCustomersList(customerData);
            setTrainersList(trainerData);
        })
    }, []);

    function checkUsernameExists(userList, username) {
        for(let i = 0; i < userList.length; i ++) {
            if(username == userList[i].username) {
                setUsernameExists(true);
                return true;
            }
        }
        return false;
    }

    function checkAge(date_of_birth) {
        if(date_of_birth == "") return false;
        const today = new Date();
        const birthDate = new Date(date_of_birth);
       
        let age = today.getFullYear() - birthDate.getFullYear();
        let monthDiff = today.getMonth() - birthDate.getMonth();
        if(monthDiff < 0) age--;

        return age >= 16;
    }

    function checkExpiration(expiration_date) {
        if (expiration_date == "") return false;
    
        const expirationDate = new Date(expiration_date);
        const currentDate = new Date();
    
        if (expirationDate < currentDate) {
            return false;
        }
        
        return true;
    }
    

    function validateInput(first_name, last_name, email_address, phone_number, date_of_birth, street_address, city, state, zip_code, country, username, password, name_on_card, card_number, cvv, expiration_date, plan) {
        let isValid = true;
        const digitOnlyRegex = /^\d+$/;
        const atLeastThreeDigitsRegex = /^(.*\d){3,}.*$/;

        if(checkUsernameExists(customersList, username) || checkUsernameExists(trainersList, username)) {
            isValid = false;
        }

        if(first_name.length < 2) {
            setFirstNameValid(false);
            isValid = false;
        }

        if(last_name.length < 2) {
            setLastNameValid(false);
            isValid = false;
        }

        if(!email_address.includes('@') || email_address.length < 8) {
            setEmailValid(false);
            isValid = false;
        }

        if(!digitOnlyRegex.test(phone_number) || phone_number.length < 10) {
            setPhoneNumberValid(false);
            isValid = false;
        }

        if(!checkAge(date_of_birth)) {
            setDobValid(false);
            isValid = false;
        }

        if(street_address.length < 4) {
            setStreetAddressValid(false);
            isValid = false;
        }

        if(city.length < 2) {
            setCityValid(false);
            isValid = false;
        }

        if(state.length < 2) {
            setStateValid(false);
            isValid = false;
        }

        if(!digitOnlyRegex.test(zip_code) || zip_code.length < 4) {
            setZipValid(false);
            isValid = false;
        }

        if(country.length < 2) {
            setCountryValid(false);
            isValid = false;
        }

        if(username.length < 5) {
            setUsernameValid(false);
            isValid = false;
        }

        if(password.length < 5 || !atLeastThreeDigitsRegex.test(password)) {
            setPasswordValid(false);
            isValid = false;
        }

        if(name_on_card.length < 5) {
            setNameOnCardValid(false);
            isValid = false;
        }

        if(card_number.length < 15 || !digitOnlyRegex.test(card_number)) {
            setCardNumberValid(false);
            isValid = false;
        }

        if(cvv.length < 3 || cvv.length > 5 || !digitOnlyRegex.test(cvv)) {
            setCvvValid(false);
            isValid = false;
        }

        if(!checkExpiration(expiration_date)) {
            setExpirationDateValid(false);
            isValid = false;
        }

        if(plan == "") {
            setPlanValid(false);
            isValid = false;
        }

        return isValid;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setFirstNameValid(true);    
        setLastNameValid(true);
        setEmailValid(true);
        setPhoneNumberValid(true);
        setDobValid(true);
        setStreetAddressValid(true);
        setCityValid(true);
        setStateValid(true);
        setZipValid(true);
        setCountryValid(true);
        setUsernameValid(true);
        setPasswordValid(true);
        setNameOnCardValid(true);
        setCardNumberValid(true);
        setCvvValid(true);
        setExpirationDateValid(true);
        setPlanValid(true);
        setUsernameExists(false);

        const isValid = validateInput(first_name, last_name, email_address, phone_number, date_of_birth, street_address, city, state, zip_code, country, username, password, name_on_card, card_number, cvv, expiration_date, plan);

        if(isValid) {  
            const newCustomer = { first_name, last_name, email_address, phone_number, date_of_birth, gender, street_address, city, state, zip_code, country, username, password, name_on_card, card_number, cvv, expiration_date, plan };
            try {
            const response = await fetch('http://localhost:3000/api/customers', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCustomer), 
            });
        
            if (response.ok) {
                const addedCustomer = await response.json();
                console.log('Customer added');

                //Clear fields
                setFirstName("");
                setLastName("");
                setEmailAddress("");
                setPhoneNumber("");
                setDateOfBirth("");
                setGender("");
                setStreetAddress("");
                setState("");
                setZipCode("");
                setCountry("");
                setUsername("");
                setPassword("");
                setNameOnCard("");
                setCardNumber("");
                setCVV("");
                setExpirationDate("");
                setPlan("");
        
            } else {
                console.error('Failed to add customer');
            }
            } catch (error) {
            console.error('Error:', error);
            }

            setUserRegistered(true);
        }
    };

    return (
        <React.Fragment>
        <Header />
        {userRegistered ? (<RegisteredMessage />) : (
        <React.Fragment>
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
        <div className="register-form">
            <div className="field-container">
            <div className="two-col">
                <div>
                    <label htmlFor="first-name">First Name</label><br/>
                    <input type="text" id="first-name" value={first_name} onChange={(e) => setFirstName(e.target.value)}/>
                    <div className="error-register" style={{ visibility: firstNameValid ? 'hidden' : 'visible' }}>Enter first name</div>
                </div>
                
                <div className="div-two">
                    <label htmlFor="last-name">Last Name</label><br/>
                    <input type="text" id="last-name" value={last_name} onChange={(e) => setLastName(e.target.value)}/>
                    <div className="error-register" style={{ visibility: lastNameValid ? 'hidden' : 'visible' }}>Enter last name</div>
                </div>
            </div>
            </div>
            
            <div className="field-container">   
            <div className="email-field">
                <label htmlFor="email">Email Address</label><br/>
                <input type="text" id="email" value={email_address} onChange={(e) => setEmailAddress(e.target.value)}/><br/>
                <div className="error-register" style={{ visibility: emailValid ? 'hidden' : 'visible' }}>Enter a valid email address</div>
            </div>
            </div>

            <div className="field-container">
            <div className="phone-field">
                <label htmlFor="phone">Phone Number</label><br/>
                <input type="text" id="phone" value={phone_number} onChange={(e) => setPhoneNumber(e.target.value)}/><br/>
                <div className="error-register" style={{ visibility: phoneNumberValid ? 'hidden' : 'visible' }}>Must contain 10 digits</div>
            </div>
            </div>
            
            <div className="field-container">
            <div className="two-col">
            <div className="dob-field">
                <label htmlFor="dob">Date of Birth</label><br/>
                <input type="date" id="dob" value={date_of_birth} onChange={(e) => setDateOfBirth(e.target.value)}/><br/>
                <div className="error-register" style={{ visibility: dobValid ? 'hidden' : 'visible' }}>You must be at least 16 to enrol</div>
            </div>

            <div className="gender-field div-two">
                <label htmlFor="gender">Gender</label><br/>
                {/* <input type="text" id="gender" value={gender} onChange={(e) => setGender(e.target.value)}/><br/> */}
                <select className="gender-dropdown" id="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="other">Other</option>
                </select>
            </div>
            </div>
            </div>
            
            <div className="break">.</div>

            <div className="field-container">
            <div className="email-field">
                <label htmlFor="street-address">Street Address</label><br/>
                <input type="text" id="street-address" value={street_address} onChange={(e) => setStreetAddress(e.target.value)}/><br/>
                <div className="error-register" style={{ visibility: streetAddressValid ? 'hidden' : 'visible' }}>Enter a valid street address</div>
            </div>
            </div>

            <div className="field-container">
            <div className="two-col">
            <div>
                <label htmlFor="city">City</label><br/>
                <input type="text" id="city" value={city} onChange={(e) => setCity(e.target.value)}/><br/>
                <div className="error-register" style={{ visibility: cityValid ? 'hidden' : 'visible' }}>Enter a valid city</div>
            </div>

            <div className="div-two">
                <label htmlFor="state">State</label><br/>
                <input type="text" id="state" value={state} onChange={(e) => setState(e.target.value)}/><br/>
                <div className="error-register" style={{ visibility: stateValid ? 'hidden' : 'visible' }}>Enter a valid state</div>
            </div>
            </div>
            </div>
            
            <div className="field-container">
            <div className="two-col">
            <div>
                <label htmlFor="zip-code">Zip Code</label><br/>
                <input type="text" id="zip-code" value={zip_code} onChange={(e) => setZipCode(e.target.value)}/><br/>
                <div className="error-register" style={{ visibility: zipValid ? 'hidden' : 'visible' }}>Enter a valid zip code</div>
            </div>
           
            <div className="div-two">
                <label htmlFor="country">Country</label><br/>
                <input type="text" id="country" value={country} onChange={(e) => setCountry(e.target.value)}/><br/>
                <div className="error-register" style={{ visibility: countryValid ? 'hidden' : 'visible' }}>Enter a valid country</div>
            </div>
            </div>
            </div>

            <div className="break">.</div>

            <div className="field-container">
            <div className="two-col">
            <div>
                <label htmlFor="username">Choose a Username</label><br/>
                <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)}/><br/>
                <div className="error-register">
                    {(!usernameValid && <div>Must be 5 characters long</div>)}
                    {usernameExists && <div>Another user has this username</div>}
                 </div>
            </div>

            <div className="div-two">
                <label htmlFor="password">Choose a Password</label><br/>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/><br/>
                <div className="error-register" style={{ visibility: passwordValid ? 'hidden' : 'visible' }}>Must contain 3 digits and<br/> be 5 characters long</div>
            </div>
            </div>
            </div>
        </div>

        <div className="big-break">.</div>
        <h2 className="form-heading">Membership Plans</h2>

        <div className="perks-container">
            <MembershipPlan name="Basic" price="$40" perks= {<BasicPerks />} colour="linear-gradient(50deg, #3d91ff, #31008b)" shadow={plan == "basic" ? "0px 2px  10px rgb(19, 23, 255)" : "0px 2px  10px rgb(139, 139, 139)"} onClick={() => setPlan("basic")}/>
            <div className="standard-plan"><MembershipPlan name="Standard" price="$60" perks= {<StandardPerks />} colour="linear-gradient(50deg, #8fff78, #00422e)" shadow={plan == "standard" ? "0px 2px  10px rgb(0, 92, 49)" : "0px 2px  10px rgb(139, 139, 139)"} onClick={() => setPlan("standard")}/></div>
            <MembershipPlan name="Premium" price="$80" perks= {<PremiumPerks />} colour="linear-gradient(50deg, #f0ff64, #9c4600)" shadow={plan == "premium" ? "0px 2px  10px rgb(196, 160, 0)" : "0px 2px  10px rgb(139, 139, 139)"} onClick={() => setPlan("premium")}/>
        </div>
        <div className="error-register" style={{ visibility: planValid ? 'hidden' : 'visible' }}>You must select a plan</div>

        <div className="big-break">.</div>

        <h2 className="payment-heading">Payment Details</h2>
        
        <div className="register-form payment-form">
        <div className="field-container">
            <div className="cardname-field">
                <label htmlFor="card-name">Name on Card</label><br/>
                <input type="text" id="card-name" value={name_on_card} onChange={(e) => setNameOnCard(e.target.value)}/><br/>
                <div className="error-register" style={{ visibility: nameOnCardValid ? 'hidden' : 'visible' }}>Enter name on card</div>
            </div> 
        </div>

        <div className="field-container">
            <div className="two-col">
            <div className="card-number">
                <label htmlFor="card-number">Card Number</label><br/>
                <input type="text" id="card-number" value={card_number} onChange={(e) => setCardNumber(e.target.value)}/><br/>
                <div className="error-register" style={{ visibility: cardNumberValid ? 'hidden' : 'visible' }}>Enter a valid card number</div>
            </div>

            <div className="cvv">
                <label htmlFor="cvv">CVV</label><br/>
                <input type="password" id="cvv" value={cvv} onChange={(e) => setCVV(e.target.value)}/><br/>
                <div className="error-register" style={{ visibility: cvvValid ? 'hidden' : 'visible' }}>Enter a valid cvv</div>
            </div> 
            </div>
        </div>
        
        <div className="field-container">
            <div className="expiration-date">
                <label htmlFor="expiration-date">Expiration Date</label><br/>
                <input type="date" id="expiration-date" value={expiration_date} onChange={(e) => setExpirationDate(e.target.value)}/><br/>
                <div className="error-register" style={{ visibility: expirationDateValid ? 'hidden' : 'visible' }}>Card must not be expired</div>
            </div> 
        </div>
        </div>
        <input className="submit-button" type="submit" value="Register"></input>

        </form>
        </React.Fragment>
        )}
        <Footer />
        </React.Fragment>
        );
}

export default Register;
