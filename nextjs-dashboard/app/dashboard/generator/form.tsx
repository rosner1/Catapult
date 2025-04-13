"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Form: React.FC = () => {
    const router = useRouter();
    const [selectedExperience, setSelectedExperience] = useState("Beginner");
    const [selectedGoal, setSelectedGoal] = useState("Weight Loss");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [selectedFocus, setSelectedFocus] = useState("Full Body");
    const [BMI, setBMI] = useState("");
    const [Age, setAge] = useState("");
    const [selectedPreference, setSelectedPreference] = useState("Machine");
    const [selectedSex, setSelectedSex] = useState("Other");
    const [selectedBP, setSelectedBP] = useState("No");

    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async() => {
        // Example: send this data to a server or just log it
        const formData = {
            goal: selectedGoal,
            experience: selectedExperience,
            height,
            weight,
            Focus_Area: selectedFocus,
            BMI,
            Age,
            Preference: selectedPreference,
            Sex: selectedSex,
            Hypertension: selectedBP
        };
        setSubmitted(true);

        try {
            //This is the render server being hosted from flask
            const res = await fetch("http://localhost:5000/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            console.log("Flask Response:", data);


            // Optionally navigate or show a success message
            const encoded = encodeURIComponent(JSON.stringify(data));
            router.push(`/dashboard/generator/result?resultData=${encoded}`);
        } catch (error) {
            console.error("Error submitting to backend:", error);
        }

    };

    return (
        <div style={{padding: "2rem", fontFamily: "Arial, sans-serif"}}>
            <div style={{marginBottom: "1rem"}}>
                <label htmlFor="goal-select" style={{marginRight: "1rem"}}>Choose a goal:</label>
                <select
                    value={selectedGoal}
                    onChange={(e) => setSelectedGoal(e.target.value)}
                >
                    <option value="Weight Loss">Weight Loss</option>
                    <option value="Weight Gain">Weight Gain</option>
                    <option value="Muscle Gain">Muscle Gain</option>
                </select>

            </div>
            <div style={{marginBottom: "1rem"}}>
                <label htmlFor="experience-select" style={{marginRight: "1rem"}}>Choose an experience level:</label>
                <select
                    value={selectedExperience}
                    onChange={(e) => setSelectedExperience(e.target.value)}
                >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                </select>

            </div>

            <div style={{marginBottom: "1rem"}}>
                <label style={{marginRight: "1rem"}}>Height (cm):</label>
                <input
                    type="text"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="Enter height"
                />
            </div>

            <div style={{marginBottom: "1rem"}}>
                <label style={{marginRight: "1rem"}}>Weight (kg):</label>
                <input
                    type="text"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="Enter weight"
                />
            </div>

            <div style={{marginBottom: "1rem"}}>
                <label htmlFor="focus-select" style={{marginRight: "1rem"}}>Choose a focus:</label>
                <select
                    value={selectedFocus}
                    onChange={(e) => setSelectedFocus(e.target.value)}
                >
                    <option value="Full Body">Full Body</option>
                    <option value="Upper Body">Upper Body</option>
                    <option value="Lower Body">Lower Body</option>
                </select>

            </div>

            <div style={{marginBottom: "1rem"}}>
                <label style={{marginRight: "1rem"}}>BMI:</label>
                <input
                    type="text"
                    value={BMI}
                    onChange={(e) => setBMI(e.target.value)}
                    placeholder="Enter BMI"
                />
            </div>

            <div style={{marginBottom: "1rem"}}>
                <label style={{marginRight: "1rem"}}>Age:</label>
                <input
                    type="text"
                    value={Age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="Enter age"
                />
            </div>

            <div style={{marginBottom: "1rem"}}>
                <label htmlFor="preference-select" style={{marginRight: "1rem"}}>Choose a preference:</label>
                <select
                    value={selectedPreference}
                    onChange={(e) => setSelectedPreference(e.target.value)}
                >
                    <option value="Machine">Machine</option>
                    <option value="Freeweight">Free Weights</option>
                </select>

            </div>

            <div style={{marginBottom: "1rem"}}>
                <label htmlFor="sex-select" style={{marginRight: "1rem"}}>Choose a sex:</label>
                <select
                    value={selectedSex}
                    onChange={(e) => setSelectedSex(e.target.value)}
                >
                    <option value="Other">Other</option>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                </select>

            </div>

            <div style={{marginBottom: "1rem"}}>
                <label htmlFor="bp-select" style={{marginRight: "1rem"}}>Do you have high blood pressure:</label>
                <select
                    value={selectedBP}
                    onChange={(e) => setSelectedBP(e.target.value)}
                >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                </select>

            </div>

            <button
                onClick={handleSubmit}
                style={{
                    padding: "0.5rem 1rem",
                    backgroundColor: "#0070f3",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                }}
            >
                Submit
            </button>

            {submitted}
        </div>
    );
};

export default Form;
