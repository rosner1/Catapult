'use client';

import { useSearchParams } from 'next/navigation';
import React from 'react';
//import {Button} from "@/app/ui/button";

const linksDictionary: { [key: string]: string } = {
    "Front Squats": "https://www.youtube.com/watch?v=uYumuL_G_V0",
    "Back Squats": "https://www.youtube.com/watch?v=-bJIpOq-LWk",
    "Goblet Squats": "https://www.youtube.com/watch?v=Z_e7HVr5-nI",
    "Leg Curl": "https://www.youtube.com/watch?v=Orxowest56U",
    "Leg Extension": "https://www.youtube.com/watch?v=4ZDm5EbiFI8",
    "Hip Thrust": "https://www.youtube.com/watch?v=5S8SApGU_Lk",
    "Bench Press": "https://www.youtube.com/watch?v=SCVCLChPQFY",
    "Incline Bench Press": "https://www.youtube.com/watch?v=2jFFCy8JBU8",
    "Push Ups": "https://www.youtube.com/watch?v=WDIpL0pjun0",
    "Pec Fly": "https://www.youtube.com/watch?v=eGjt4lk6g34",
    "Body Weight Dips": "https://www.youtube.com/watch?v=yZ83t4mrPrI",
    "Shoulder Press": "https://www.youtube.com/watch?v=WvLMauqrnK8",
    "Lateral Raise": "https://www.youtube.com/watch?v=OuG1smZTsQQ",
    "Front Raise": "https://www.youtube.com/watch?v=hRJ6tR5-if0",
    "Shoulder Shrugs": "https://www.youtube.com/watch?v=_t3lrPI6Ns4",
    "Deadlift": "https://www.youtube.com/watch?v=AweC3UaM14o",
    "Chest Supported Row": "hhttps://www.youtube.com/watch?v=_FrrYQxA6kc",
    "Lat Pulldown": "https://www.youtube.com/watch?v=JGeRYIZdojU",
    "Pullups": "https://www.youtube.com/watch?v=aAggnpPyR6E",
    "Cable row": "https://www.youtube.com/watch?v=UCXxvVItLoM",
    "Bent over row": "https://www.youtube.com/watch?v=6FZHJGzMFEc"
};

const formatWords = (str: string) =>
    str.replace(/^["']|["']$/g, '');

const DetailPage = () => {

    const searchParams = useSearchParams();
    const name = searchParams.get('name') || "Unknown";

    return (
        <div style={{ padding: "2rem" }}>
            <button
                onClick={() => {
                    window.open(linksDictionary[name], "_blank");
                }}
                style={{
                    padding: "1rem",
                    backgroundColor: "#FFD700",
                    borderRadius: "8px",
                    color: "white",
                    width: "150px",
                    textAlign: "center",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}>
                <strong>{formatWords(name)}</strong>
            </button>
        </div>
    );
};

export default DetailPage;