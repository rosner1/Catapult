export default function Page() {
    return (
        <div style={{display: "flex", flexDirection: "column", padding: "2rem", fontFamily: "Arial, sans-serif"}}>
            <div style={{
                marginBottom: "2rem",
                fontSize: "24px",
                fontWeight: "bold",
                textAlign: "center", // Center horizontally
                width: "100%", // Ensure it takes up the full width
            }}>
                Egg Hunters
            </div>

            <div style={{display: "flex", flexDirection: "column", gap: "1rem"}}>
                {/* Person 1 */}
                <div style={{display: "flex", alignItems: "center"}}>
                    <div style={{flex: 1}}>
                        <p><strong>Gabe Morgenstern</strong> - Second year data science and applied statistics major.
                            Plays clarinet in Wind Ensemble (extremely cracked).
                            Participates in the fencing club.
                            Found three eggs.</p>
                    </div>
                    <img
                        src="/GabeMorgenstern.JPG" // Replace with your image path
                        alt="Gabe Morgenstern"
                        style={{
                            width: "150px",
                            height: "150px",
                            objectFit: "cover",
                            borderRadius: "50%",
                            marginLeft: "1rem",
                        }}
                    />
                </div>

                {/* Person 2 */}
                <div style={{display: "flex", alignItems: "center"}}>
                    <div style={{flex: 1}}>
                        <p><strong>Nathan Witt</strong> - Second year computer science, data science, and artificial
                            intelligence major.
                            Has no other free time.
                            Found two eggs.
                        </p>
                    </div>
                    <img
                        src="/NathanWitt.jpg" // Replace with your image path
                        alt="NathanWitt"
                        style={{
                            width: "150px",
                            height: "150px",
                            objectFit: "cover",
                            borderRadius: "50%",
                            marginLeft: "1rem",
                        }}
                    />
                </div>

                {/* Person 3 */}
                <div style={{display: "flex", alignItems: "center"}}>
                    <div style={{flex: 1}}>
                        <p><strong>Jonah Rosner</strong> - Second year computer science major.
                            Participates in Autonomous Robotics Club, wizards chess.
                            Plays euphonium in Collegiate Band and Gold and Black Sound.
                            Found zero eggs.</p>
                    </div>
                    <img
                        src="/JonahRosner.jpeg" // Replace with your image path
                        alt="Jonah Rosner"
                        style={{
                            width: "150px",
                            height: "150px",
                            objectFit: "cover",
                            borderRadius: "50%",
                            marginLeft: "1rem",
                        }}
                    />
                </div>
            </div>
            <div style={{marginBottom: "2rem", fontSize: "24px", fontWeight: "bold"}}>
                Total Egg Count: 5
            </div>
        </div>
    );
}
