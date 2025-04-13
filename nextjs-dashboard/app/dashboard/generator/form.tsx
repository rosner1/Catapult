"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Form: React.FC = () => {
    const router = useRouter();
    const [selectedExperience, setSelectedExperience] = useState("Beginner");
    const [selectedGoal, setSelectedGoal] = useState("Gain muscle");
    const [Height, setHeight] = useState("");
    const [Weight, setWeight] = useState("");

    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async() => {
        // Example: send this data to a server or just log it
        const formData = {
            Goal: selectedGoal,
            experience: selectedExperience,
            Height,
            Weight,
        };
        setSubmitted(true);

        try {
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
                    <option value="Muscle Gain">Muscle Gain</option>
                    <option value="Weight Gain">Weight Gain</option>
                    <option value="Weight Gain">Weight Gain</option>
                </select>

            </div>
            <div style={{marginBottom: "1rem"}}>
                <label htmlFor="experience-select" style={{marginRight: "1rem"}}>Choose a color:</label>
                <select
                    value={selectedGoal}
                    onChange={(e) => setSelectedExperience(e.target.value)}
                >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Olympian">Olympian</option>
                </select>

            </div>

            <div style={{marginBottom: "1rem"}}>
                <label style={{marginRight: "1rem"}}>Height (cm):</label>
                <input
                    type="text"
                    value={Height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="Enter height"
                />
            </div>

            <div style={{marginBottom: "1rem"}}>
                <label style={{marginRight: "1rem"}}>Weight (kg):</label>
                <input
                    type="text"
                    value={Weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="Enter weight"
                />
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

            {submitted && (
                <div style={{marginTop: "1rem"}}>
                    <h3>Submitted Info:</h3>
                    <p>Goal: {selectedGoal}</p>
                    <p>Experience: {selectedExperience}</p>
                    <p>Height: {Height} cm</p>
                    <p>Weight: {Weight} kg</p>
                </div>
            )}
        </div>
    );
};

export default Form;
