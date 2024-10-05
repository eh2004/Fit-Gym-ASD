import React from "react"
import ReactDOM from "react-dom/client"
import Header from "../components/Header.jsx"
import Footer from "../components/Footer.jsx"


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
    return (
        <React.Fragment>
        <Header />
        <h1>Sign Up</h1>
       <form action="">
        <div className="register-form">
            <div className="field-container">
            <div className="two-col">
                <div>
                    <label htmlFor="first-name">First Name</label><br/>
                    <input type="text" id="first-name" name=""/>
                </div>
                
                <div className="div-two">
                    <label htmlFor="last-name">Last Name</label><br/>
                    <input type="text" id="last-name" name=""/>
                </div>
            </div>
            </div>
            
            <div className="field-container">
            <div className="email-field">
                <label htmlFor="email">Email Address</label><br/>
                <input type="text" id="email" name=""/><br/>
            </div>
            </div>

            <div className="field-container">
            <div className="phone-field">
                <label htmlFor="phone">Phone Number</label><br/>
                <input type="text" id="phone" name=""/><br/>
            </div>
            </div>
            
            <div className="field-container">
            <div className="two-col">
            <div className="dob-field">
                <label htmlFor="dob">Date of Birth</label><br/>
                <input type="date" id="dob" name=""/><br/>
            </div>

            <div className="gender-field div-two">
                <label htmlFor="gender">Gender</label><br/>
                <input type="text" id="gender" name=""/><br/>
            </div>
            </div>
            </div>
            
            <div className="break">.</div>

            <div className="field-container">
            <div className="email-field">
                <label htmlFor="street-address">Street Address</label><br/>
                <input type="text" id="street-address" name=""/><br/>
            </div>
            </div>

            <div className="field-container">
            <div className="two-col">
            <div>
                <label htmlFor="city">City</label><br/>
                <input type="text" id="city" name=""/><br/>
            </div>

            <div className="div-two">
                <label htmlFor="state">State</label><br/>
                <input type="text" id="state" name=""/><br/>
            </div>
            </div>
            </div>
            
            <div className="field-container">
            <div className="two-col">
            <div>
                <label htmlFor="zip-code">Zip Code</label><br/>
                <input type="text" id="zip-code" name=""/><br/>
            </div>
           
            <div className="div-two">
                <label htmlFor="country">Country</label><br/>
                <input type="text" id="country" name=""/><br/>
            </div>
            </div>
            </div>

            <div className="break">.</div>

            <div className="field-container">
            <div className="two-col">
            <div>
                <label htmlFor="username">Choose a Username</label><br/>
                <input type="text" id="username" name=""/><br/>
            </div>

            <div className="div-two">
                <label htmlFor="password">Choose a Password</label><br/>
                <input type="password" id="password" name=""/><br/>
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

