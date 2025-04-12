"use client";
/*import { useEffect, useState } from 'react';

const ResultPage = () => {
    const [result, setResult] = useState(null);

    useEffect(() => {
        // Retrieve data from localStorage
        const storedData = localStorage.getItem('resultData');
        if (storedData) {
            setResult(JSON.parse(storedData));
        }
    }, []);

    return (
        <div>
            <h1>Result Page</h1>
            {result ? <pre>{JSON.stringify(result, null, 2)}</pre> : <p>Loading...</p>}
        </div>
    );
};

export default ResultPage;


*/

import { notFound } from "next/navigation";

const ResultPage = ({ searchParams }: { searchParams: { resultData?: string } }) => {
    if (!searchParams.resultData) return notFound();

    let result;
    try {
        result = JSON.parse(decodeURIComponent(searchParams.resultData));
    } catch (err) {
        return <p>Invalid result data</p>;
    }

    return (
        <div style={{ padding: "2rem" }}>
            <h1>Result</h1>
            <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
    );
};

export default ResultPage;
