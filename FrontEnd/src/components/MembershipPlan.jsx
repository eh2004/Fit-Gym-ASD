import React from "react";

export default function MembershipPlan(props) {

    return (
        <div>
        <h3 className="perk-name">{props.name}</h3>
        <div className="membership-container" style={{boxShadow: props.shadow}}>
            <div className="membership-header" style={{background: props.colour}}>
                <p className="price">{props.price}</p>
                <p>/month</p>
            </div>
            {props.perks}
            <div className="membership-button" style={{background: props.colour}} onClick={props.onClick}>Select {props.name}</div>
        </div>
        </div>
    );
}