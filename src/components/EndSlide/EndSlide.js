import React from "react";
import { Box } from "@mui/material";

const EndSlide = () => {
    return (
        <Box
            sx={{
                width: "100%",
                padding: "4rem",
                background: "#202020",
                flex: "1 1 auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <h1 style={{ fontSize: "28px", color: "#fff" }}>
                The presentation is end. Thanks for joining
            </h1>
        </Box>
    );
};

export default EndSlide;
