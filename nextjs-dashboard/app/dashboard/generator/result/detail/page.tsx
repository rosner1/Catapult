'use client';

import { useSearchParams } from 'next/navigation';
import React from 'react';

const DetailPage = () => {

    const searchParams = useSearchParams();
    const name = searchParams.get('name') || "Unknown";

    return (
        <div style={{ padding: "2rem" }}>
            <h1>Detail for {name}</h1>
        </div>
    );
};

export default DetailPage;