import React from "react"
import ReactDOM from "react-dom/client"
import Header from "../components/Header.jsx"
import Footer from "../components/Footer.jsx"
import { useState } from "react";

function BasicPerks() {
    return (
        <ul>
            <li>24/7 access to all gym equipment</li>
            <li>15% discount for on-site parking</li>
            <li>Unlimited access to recorded classes</li>
            <li>20% discount on in-person and online classes</li>
        </ul>
    );
}

function StandardPerks() {
    return (
        <ul>
            <li>24/7 access to all gym equipment</li>
            <li>40% discount for on-site parking</li>
            <li>Unlimited access to recorded classes</li>
            <li>50% discount on in-person and online classes</li>
            <li>20% discount on personal training sessions</li>
        </ul>
    );
}

function PremiumPerks() {
    return (
        <ul>
            <li>24/7 access to all gym equipment</li>
            <li>70% discount for on-site parking</li>
            <li>Unlimited access to recorded classes</li>
            <li>Unlimited access to free in-person and online classes</li>
            <li>50% discount on personal training sessions</li>
        </ul>
    );
}

function MembershipPlan(props) {
    return (
        <div>
        <h3 className="perk-name">{props.name}</h3>
        <div className="membership-container">
            <div className="membership-header" style={{background: props.colour}}>
                <p className="price">{props.price}</p>
                <p>/month</p>
            </div>
            {props.perks}
            <button className="membership-button" style={{background: props.colour}}>Select</button>
        </div>
        </div>
    );
}

function App() {

    const [first_name, setFirstName] = useState("");
    const[last_name, setLastName] = useState("");
    const[email_address, setEmailAddress] = useState("");
    const[phone_number, setPhoneNumber] = useState("");
    const[date_of_birth, setDateOfBirth] = useState("");
    const[gender, setGender] = useState("");
    const[street_address, setStreetAddress] = useState("");
    const[city, setCity] = useState("");
    const[state, setState] = useState("");
    const[zip_code, setZipCode] = useState("");
    const[country, setCountry] = useState("");
    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        
        const newCustomer = { first_name, last_name, email_address, phone_number, date_of_birth, gender, street_address, city, state, zip_code, country, username, password };
          
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
            console.log('Customer added:', addedCustomer);

            //Clear fields
            setFirstName("");
            setLastName("");
            setEmailAddress("");
            setPhoneNumber("");
            setDateOfBirth("");
            setStreetAddress("");
            setState("");
            setZipCode("");
            setCountry("");
            setUsername("");
            setPassword("");
    
          } else {
            console.error('Failed to add customer');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };

    return (
        <React.Fragment>    
        <Header />
        <h1>Sign Up</h1>
       <form onSubmit={handleSubmit}>
        <div className="register-form">
            <div className="field-container">
            <div className="two-col">
                <div>
                    <label htmlFor="first-name">First Name</label><br/>
                    <input type="text" id="first-name" value={first_name} onChange={(e) => setFirstName(e.target.value)}/>
                </div>
                
                <div className="div-two">
                    <label htmlFor="last-name">Last Name</label><br/>
                    <input type="text" id="last-name" value={last_name} onChange={(e) => setLastName(e.target.value)}/>
                </div>
            </div>
            </div>
            
            <div className="field-container">   
            <div className="email-field">
                <label htmlFor="email">Email Address</label><br/>
                <input type="email" id="email" value={email_address} onChange={(e) => setEmailAddress(e.target.value)}/><br/>
            </div>
            </div>

            <div className="field-container">
            <div className="phone-field">
                <label htmlFor="phone">Phone Number</label><br/>
                <input type="text" id="phone" value={phone_number} onChange={(e) => setPhoneNumber(e.target.value)}/><br/>
            </div>
            </div>
            
            <div className="field-container">
            <div className="two-col">
            <div className="dob-field">
                <label htmlFor="dob">Date of Birth</label><br/>
                <input type="date" id="dob" value={date_of_birth} onChange={(e) => setDateOfBirth(e.target.value)}/><br/>
            </div>

            <div className="gender-field div-two">
                <label htmlFor="gender">Gender</label><br/>
                <input type="text" id="gender" value={gender} onChange={(e) => setGender(e.target.value)}/><br/>
            </div>
            </div>
            </div>
            
            <div className="break">.</div>

            <div className="field-container">
            <div className="email-field">
                <label htmlFor="street-address">Street Address</label><br/>
                <input type="text" id="street-address" value={street_address} onChange={(e) => setStreetAddress(e.target.value)}/><br/>
            </div>
            </div>

            <div className="field-container">
            <div className="two-col">
            <div>
                <label htmlFor="city">City</label><br/>
                <input type="text" id="city" value={city} onChange={(e) => setCity(e.target.value)}/><br/>
            </div>

            <div className="div-two">
                <label htmlFor="state">State</label><br/>
                <input type="text" id="state" value={state} onChange={(e) => setState(e.target.value)}/><br/>
            </div>
            </div>
            </div>
            
            <div className="field-container">
            <div className="two-col">
            <div>
                <label htmlFor="zip-code">Zip Code</label><br/>
                <input type="text" id="zip-code" value={zip_code} onChange={(e) => setZipCode(e.target.value)}/><br/>
            </div>
           
            <div className="div-two">
                <label htmlFor="country">Country</label><br/>
                <input type="text" id="country" value={country} onChange={(e) => setCountry(e.target.value)}/><br/>
            </div>
            </div>
            </div>

            <div className="break">.</div>

            <div className="field-container">
            <div className="two-col">
            <div>
                <label htmlFor="username">Choose a Username</label><br/>
                <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)}/><br/>
            </div>

            <div className="div-two">
                <label htmlFor="password">Choose a Password</label><br/>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/><br/>
            </div>
            </div>
            </div>
        </div>

        <div className="big-break">.</div>
        <h2 className="form-heading">Membership Plans</h2>

        <div className="perks-container">
            <MembershipPlan name="Basic" price="$40" perks= {<BasicPerks />} colour="linear-gradient(50deg, #3d91ff, #31008b)"/>
            <div className="standard-plan"><MembershipPlan name="Standard" price="$60" perks= {<StandardPerks />} colour="linear-gradient(50deg, #8fff78, #00422e)" /></div>
            <MembershipPlan name="Premium" price="$80" perks= {<PremiumPerks />} colour="linear-gradient(50deg, #f0ff64, #9c4600)" />
        </div>

        <div className="big-break">.</div>

        <h2 className="payment-heading">Payment Details</h2>
        
        <div className="register-form payment-form">
        <div className="field-container">
            <div className="cardname-field">
                <label htmlFor="card-name">Name on Card</label><br/>
                <input type="text" id="card-name" name=""/><br/>
            </div> 
        </div>

        <div className="field-container">
            <div className="two-col">
            <div className="card-number">
                <label htmlFor="card-number">Card Number</label><br/>
                <input type="text" id="card-number" name=""/><br/>
            </div>

            <div className="cvv">
                <label htmlFor="cvv">CVV</label><br/>
                <input type="password" id="cvv" name=""/><br/>
            </div> 
            </div>
        </div>
        
        <div className="field-container">
            <div className="expiration-date">
                <label htmlFor="expiration-date">Expiration Date</label><br/>
                <input type="date" id="expiration-date" name=""/><br/>
            </div> 
        </div>
        </div>
        <input className="submit-button" type="submit" value="Register"></input>

        </form>
        <Footer />
        </React.Fragment>
    )
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />)