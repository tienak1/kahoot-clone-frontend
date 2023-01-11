import { Grid } from "@mui/material";
import React from "react";

const Home = () => {
    return (
        <div
            style={{
                backgroundImage: "url(./mentibackground.jpg)",
                backgroundSize: "cover",
            }}
        >
            <div style={{ width: "90vw", height: "90vh", color: "#fff" }}></div>
            <a href="/login">
                <button
                    className="button-1"
                    style={{
                        padding: "10px",
                        margin: "10px",
                    }}
                >
                    LOGIN
                </button>
            </a>
            <a href="/signup">
                <button
                    className="button-1"
                    style={{
                        padding: "10px",
                        margin: "10px",
                    }}
                >
                    REGISTER
                </button>
            </a>
        </div>
    );
};

export default Home;
