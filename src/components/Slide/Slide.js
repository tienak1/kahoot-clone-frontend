import React, { useEffect, useMemo, useReducer, useLayoutEffect } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { SLIDE_TYPE } from "../../service/PersentationService";

// const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}];
const renderCustomBarLabel = ({ x, y, width, value }) => {
    return (
        <text
            x={x + width / 2}
            y={y}
            fill="#666"
            textAnchor="middle"
            dy={-6}
        >{`${value}`}</text>
    );
};

const Slide = ({ slide }) => {
    const data = useMemo(() => {
        return [...slide?.content.option];
    }, [slide]);

    return (
        // <Box
        //     sx={{
        //         width: "100%",
        //         height: "100%",
        //         background: "#fff",
        //         borderRadius: "4px",
        //         display: "flex",
        //         flexDirection: "column",
        //         fontFamily: "PatrickHand",
        //         padding: "20px",
        //     }}
        // >
        //     <Typography
        //         component="p"
        //         variant="h2"
        //         align="center"
        //         color="black"
        //         marginTop={1.5}
        //         fontFamily="PatrickHand"
        //         fontSize="2rem"
        //     >
        //         {slide.content.question}
        //     </Typography>
        //     <ResponsiveContainer>
        //         <BarChart
        //             data={data}
        //             margin={{ top: 40, right: 40, left: 20, bottom: 20 }}
        //         >
        //             <XAxis dataKey="key" stroke="#8884d8" />
        //             <YAxis />
        //             <Tooltip />
        //             <Bar
        //                 dataKey="value"
        //                 fill="#8884d8"
        //                 barSize={30}
        //                 label={renderCustomBarLabel}
        //             />
        //         </BarChart>
        //     </ResponsiveContainer>
        // </Box>
        <React.Fragment>
            {(slide.content.heading && slide.content.subHeading) ||
            slide.content.paragraph ? (
                <Box
                    sx={{
                        width: "100%",
                        height: "100%",
                        background: "#fff",
                        display: "flex",
                        flexDirection: "column",
                        fontFamily: "PatrickHand",
                        padding: "20px",
                        fontSize: "2.5rem",
                    }}
                >
                    <Typography
                        component="p"
                        variant="h2"
                        align="center"
                        color="black"
                        // gutterBottom.
                        marginTop={1.5}
                        // fontWeight={700}
                        fontFamily="PatrickHand"
                        fontSize="4rem"
                    >
                        {slide.content.heading || slide.content.paragraph}
                    </Typography>

                    <Typography
                        component="p"
                        variant="h2"
                        align="center"
                        color="black"
                        // gutterBottom.
                        marginTop={1.5}
                        // fontWeight={700}
                        fontFamily="PatrickHand"
                        fontSize="4rem"
                    >
                        {slide.content.subHeading || ""}
                    </Typography>
                </Box>
            ) : (
                <Box
                    sx={{
                        width: "100%",
                        height: "100%",
                        background: "#fff",
                        display: "flex",
                        flexDirection: "column",
                        fontFamily: "PatrickHand",
                        padding: "20px",
                        fontSize: "2.5rem",
                    }}
                >
                    <Typography
                        component="p"
                        variant="h2"
                        align="center"
                        color="black"
                        // gutterBottom.
                        marginTop={1.5}
                        // fontWeight={700}
                        fontFamily="PatrickHand"
                        fontSize="4rem"
                    >
                        {slide.content.question}
                    </Typography>

                    <ResponsiveContainer>
                        <BarChart
                            data={data}
                            margin={{
                                top: 40,
                                right: 40,
                                left: 20,
                                bottom: 20,
                            }}
                        >
                            <XAxis dataKey="key" stroke="#8884d8" />
                            <YAxis />
                            <Tooltip />
                            <Bar
                                dataKey="value"
                                fill="#8884d8"
                                barSize={30}
                                label={renderCustomBarLabel}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </Box>
            )}
        </React.Fragment>
    );
};

export default Slide;
