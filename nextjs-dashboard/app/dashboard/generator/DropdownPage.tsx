"use client";
import React, { useState } from 'react';

const DropdownPage: React.FC = () => {
    const [selectedGoal, setSelectedGoal] = useState("Gain muscle");
    const [selectedExperience, setSelectedExperience] = useState("Beginner");

    const handleGoalChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedGoal(event.target.value);
    };

    const handleExperienceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedExperience(event.target.value);
    };

    return (
        <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
            <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Dropdown Selector</h1>

            <div style={{ marginBottom: "1rem" }}>
                <label htmlFor="goal-select" style={{ marginRight: "1rem" }}>Choose a goal:</label>
                <select id="goal-select" value={selectedGoal} onChange={handleGoalChange}>
                    <option value="Gain muscle">Gain muscle</option>
                    <option value="Gain weight">Gain weight</option>
                    <option value="Lose weight">Lose weight</option>
                </select>
            </div>

            <div style={{marginBottom: "1rem"}}>
                <label htmlFor="experience-select" style={{ marginRight: "1rem" }}>Choose a color:</label>
                <select id="experience-select" value={selectedExperience} onChange={handleExperienceChange}>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Olympian">Olympian</option>
                </select>
            </div>

            <p>You are a <strong>{selectedExperience}</strong> athlete trying to <strong>{selectedGoal}</strong>.</p>
        </div>
    );
};

export default DropdownPage;
