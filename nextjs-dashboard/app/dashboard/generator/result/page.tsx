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
            <h1 style={{ marginBottom: "1rem" }}>Results</h1>

            {Object.entries(result).map(([category, items]) => {
                if (typeof items !== 'object' || items === null) return null;

                return (
                    <div key={category} style={{ marginBottom: "2rem" }}>
                        <h2>{category}</h2>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                            {Object.entries(items).sort((a, b) => Number(b[1]) - Number(a[1])) // descending by value
                                .map(([key, value]) => (
                                <button
                                    key={key}
                                    onClick={() => {
                                        const encoded = encodeURIComponent(JSON.stringify(capitalizeWords(key)));
                                        router.push(`/dashboard/generator/result/detail?name=${encoded}`);
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
                                >
                                    <strong>{capitalizeWords(key)}</strong>
                                </button>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ResultPage;
