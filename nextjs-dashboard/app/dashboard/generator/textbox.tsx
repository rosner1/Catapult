"use client";

import React, {useState} from "react";

const TextBox: React.FC = () => {
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");


    const handleHeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHeight(event.target.value);
    };
    const handleWeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setWeight(event.target.value);
    };

    return (
        <div style={{padding: "2rem", fontFamily: "Arial, sans-serif"}}>
            <div>
                <label htmlFor="heightInput" style={{marginRight: "1rem"}}>Enter your height (in):</label>
                <input
                    id="heightInput"
                    type="text"
                    value={height}
                    onChange={handleHeightChange}
                    placeholder="Type here..."
                    style={{padding: "0.5rem", border: "1px solid #ccc", borderRadius: "4px"}}
                />
            </div>
            <br/>
            <div>
                <label htmlFor="weightInput" style={{marginRight: "1rem"}}>Enter your weight (lbs):</label>
                <input
                    id="weightInput"
                    type="text"
                    value={weight}
                    onChange={handleWeightChange}
                    placeholder="Type here..."
                    style={{padding: "0.5rem", border: "1px solid #ccc", borderRadius: "4px"}}
                />

            </div>
            <p>You are <strong>{height}</strong> inch athlete that is <strong>{weight}</strong> pounds.</p>

        </div>
    );
};

export default TextBox;
