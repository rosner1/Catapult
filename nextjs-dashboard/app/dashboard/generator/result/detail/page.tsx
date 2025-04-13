'use client';

import { useSearchParams } from 'next/navigation';
import React from 'react';
//import {Button} from "@/app/ui/button";

const linksDictionary: { [key: string]: string } = {
    "Barbell Squat": "https://www.youtube.com/watch?v=-bJIpOq-LWk",
    "Dumbbell Walking Lunge": "https://www.youtube.com/watch?v=eFWCn5iEbTU",
    "Dumbbell Romanian Deadlift": "https://www.youtube.com/watch?v=cYKYGwcg0U8",
    "Dumbbell Step-Up": "https://www.youtube.com/watch?v=DxUNi119Qzs",
    "Dumbbell Bulgarian Split Squat": "https://www.youtube.com/watch?v=Fmjj7wFJWRE",
    "Dumbbell Calf Raise": "https://youtu.be/SRUtMJ0tE2A?t=1",
    "Leg Press Machine": "https://www.youtube.com/watch?v=q4W4_VJbKW0",
    "Leg Extension Machine": "https://www.youtube.com/watch?v=4ZDm5EbiFI8",
    "Seated Leg Curl Machine": "https://www.youtube.com/watch?v=Orxowest56U",
    "Cable Kickbacks": "https://www.youtube.com/watch?v=SqO-VUEak2M",
    "Hip Abduction Machine": "https://www.youtube.com/watch?v=G_8LItOiZ0Q",
    "Hip Adduction Machine": "https://www.youtube.com/watch?v=CjAVezAggkI",
    "Seated Calf Raise Machine": "https://www.youtube.com/watch?v=2Q-HQ3mnePg",
    "Bench Press": "https://www.youtube.com/watch?v=SCVCLChPQFY",
    "Incline Bench Press": "https://www.youtube.com/watch?v=5CECBjd7HLQ",
    "Dumbbell Chest Fly": "https://www.youtube.com/watch?v=Nhvz9EzdJ4U",
    "Dumbbell Pullover": "https://www.youtube.com/watch?v=jQjWlIwG4sI",
    "Pec Deck Machine (Chest Fly)": "https://www.youtube.com/watch?v=eGjt4lk6g34",
    "Seated Chest Press Machine ": "https://www.youtube.com/watch?v=NwzUje3z0qY",
    "Cable Crossover": "https://www.youtube.com/watch?v=hhruLxo9yZU",
    "Body Weight Dips": "https://www.youtube.com/watch?v=yZ83t4mrPrI",
    "Dumbbell Shoulder Press": "https://www.youtube.com/watch?v=HzIiNhHhhtA",
    "Dumbbell Lateral Raise": "https://www.youtube.com/watch?v=OuG1smZTsQQ",
    "Dumbbell Front Raise": "https://www.youtube.com/watch?v=hRJ6tR5-if0",
    "Dumbbell Rear Delt Fly": "https://www.youtube.com/watch?v=nlkF7_2O_Lw",
    "Dumbbell Arnold Press": "https://www.youtube.com/watch?v=jeJttN2EWCo",
    "Shoulder Press Machine": "https://www.youtube.com/watch?v=WvLMauqrnK8",
    "Lateral Raise Machine": "https://www.youtube.com/shorts/e8xAk2N7_ME",
    "Reverse Pec Deck (Rear Delt Fly)": "https://www.youtube.com/watch?v=5YK4bgzXDp0",
    "Cable Lateral Raise": "https://www.youtube.com/watch?v=Z5FA9aq3L6A",
    "Cable Rear Delt Fly": "https://www.youtube.com/watch?v=er15V96hG5U",
    "Dumbbell Bent-Over Row": "https://www.youtube.com/watch?v=6gvmcqr226U",
    "Single-Arm Dumbbell Row": "https://www.youtube.com/watch?v=ZRSGpBUVcNw",
    "Deadlift": "https://www.youtube.com/watch?v=AweC3UaM14o",
    "Dumbbell Shrug": "https://www.youtube.com/watch?v=_t3lrPI6Ns4",
    "Dumbbell Reverse Fly": "https://www.youtube.com/watch?v=nlkF7_2O_Lw",
    "Lat Pulldown Machine": "https://www.youtube.com/watch?v=JGeRYIZdojU",
    "Seated Row Machine": "https://www.youtube.com/watch?v=UCXxvVItLoM",
    "Assisted Pull-Up Machine": "https://www.youtube.com/watch?v=XeaRyJQ9y1k",
    "Cable Lat Pullover": "https://www.youtube.com/watch?v=FlS71yYOXKU",
    "T-Bar Row Machine": "https://www.youtube.com/watch?v=yPis7nlbqdY",
    "Back Extension Machine": "https://www.youtube.com/watch?v=ZjtGkMTOZj4",
    "Swimming": "https://www.youtube.com/watch?v=ujPlg-gl3fo",
    "Yoga": "https://www.youtube.com/watch?v=WltkvVB_lfM",
    "Running": "https://www.youtube.com/watch?v=IUIxWmZdBZg",
    "Brisk Walking": "https://www.youtube.com/watch?v=tVpUCkMLgms",
    "Cycling" : "https://www.youtube.com/watch?v=OAnmjgm4_hQ&list=PLpD8gt2F_Z5-cpSTj_-DogCUwh1F_EKYe",
    "Dancing": "https://www.youtube.com/watch?v=ujREEgxEP7g"
};

const imageFileName = (name: string) =>
    `/exercises/${name.replace(/ /g, "")}.png`;

const formatWords = (str: string) =>
    str.replace(/^["']|["']$/g, '');

const DetailPage = () => {

    const searchParams = useSearchParams();
    const name = searchParams.get('name') || "Unknown";

    return (
        <div style={{padding: "2rem"}}>
            <img
                src={imageFileName(formatWords(name))}
                alt={name}
                style={{
                    width: "800px",   // Set a fixed width
                    height: "500px",  // Set a fixed height
                    objectFit: "cover", // Ensures the image covers the area without distorting aspect ratio
                    borderRadius: "12px",
                    marginBottom: "1rem"
                }}
                onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                }}
            />
            <button
                onClick={() => {
                    window.open(linksDictionary[formatWords(name)], "_blank");
                }}
                style={{
                    padding: "1rem",
                    backgroundColor: "#f5d790",
                    borderRadius: "8px",
                    color: "black",
                    width: "150px",
                    textAlign: "center",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}>
                <strong>{formatWords(name) + " Tutorial"}</strong>
            </button>
        </div>
    );
};

export default DetailPage;