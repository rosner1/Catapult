'use client';

import { notFound } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";


const getGradientColor = (score: number): string => {
    const clamp = (num: number) => Math.max(0, Math.min(1, num));
    const red = [248, 113, 113];
    const green = [74, 222, 128];
    const t = clamp(score);

    const r = Math.round(red[0] + (green[0] - red[0]) * t);
    const g = Math.round(red[1] + (green[1] - red[1]) * t);
    const b = Math.round(red[2] + (green[2] - red[2]) * t);

    return `rgb(${r}, ${g}, ${b})`;
};

const capitalizeWords = (str: string) =>
    str.replace(/\b\w/g, (char) => char.toUpperCase());


const ResultPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams(); // Retrieve search params using the useSearchParams hook
    const [result, setResult] = useState<any>(null);

    useEffect(() => {
        const resultData = searchParams.get("resultData");

        if (!resultData) {
            notFound();
            return;
        }

        try {
            const parsedResult = JSON.parse(decodeURIComponent(resultData));
            if (typeof parsedResult !== 'object' || parsedResult === null) {
                notFound();
                return;
            }
            setResult(parsedResult);
        } catch (err) {
            console.error("Error parsing result data:", err);
            setResult(null);
        }
    }, [searchParams]);

    if (result === null) {
        return <p>Loading or Invalid result data...</p>;
    }

    return (
        <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
            {/* Add border and center the heading */}
            <div
                style={{
                    padding: "1rem",
                    marginBottom: "2rem", // Space between heading and recommendations
                    textAlign: "center", // Center the text horizontally
                    maxWidth: "330px", // Optional, to limit the width
                    marginLeft: "auto", // Center the element horizontally
                    marginRight: "auto", // Center the element horizontally
                    borderRadius: "8px", // Optional, for rounded corners
                    color: "black",
                    background: "#f5d790",
                    fontWeight: "bold",

                }}
            >
                <h1 style={{ margin: 0 }}>Recommendations</h1>
            </div>

            {Object.entries(result).map(([category, items]) => {
                if (typeof items !== 'object' || items === null) return null;

                return (
                    <div key={category} style={{ marginBottom: "2rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
                        {/* Category box */}
                        <div
                            style={{
                                display: "inline-block",
                                padding: "0.5rem 1rem",
                                backgroundColor: "#f5d790",
                                borderRadius: "8px",
                                marginBottom: "0",  // Remove margin at the bottom so it aligns vertically
                                fontWeight: "bold",
                                textAlign: "center",
                                width: "150px",   // Fixed width for the category box
                                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                                height: "auto", // Ensure it adjusts to content height
                                lineHeight: "1.5", // Adjust line-height to prevent any text overflow
                            }}
                        >
                            {capitalizeWords(category)}
                        </div>
                        {/* Button grid */}
                        <div
                            style={{
                                display: "flex",
                                flexWrap: "wrap",
                                justifyContent: "center", // Center the items horizontally
                                gap: "1rem", // Space between buttons
                            }}
                        >
                            {Object.entries(items).sort((a, b) => Number(b[1]) - Number(a[1])) // descending by value
                                .map(([key, value]) => {
                                    // Conditional logic to determine if a link is needed
                                    const isLinkDisabled = category !== "Exercises"; // Replace this with your condition

                                    return (
                                        <button
                                            key={key}
                                            onClick={() => {
                                                if (!isLinkDisabled) {  // Only navigate if the link is not disabled
                                                    const encoded = encodeURIComponent(JSON.stringify(capitalizeWords(key)));
                                                    router.push(`/dashboard/generator/result/detail?name=${encoded}`);
                                                }
                                            }}
                                            style={{
                                                padding: "1rem",
                                                backgroundColor: getGradientColor(Number(value)),
                                                borderRadius: "8px",
                                                color: "white",
                                                width: "150px",
                                                textAlign: "center",
                                                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",

                                            }}
                                            //disabled={isLinkDisabled}  // Optional: disable the button
                                        >
                                            <strong>{capitalizeWords(key)}</strong>
                                        </button>
                                    );
                                })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ResultPage;
