import React, { useEffect } from "react";
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
import { useState } from "react";
import {
    Button,
    Grid,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
} from "@mui/material";
import {
    getQuestionList,
    markAsAnsweredQuestion,
} from "../../service/PersentationService";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

const SlideShow = ({ slide }) => {
    const [listQuestion, setListQuestion] = useState([]);
    const getQuestionListFromUser = async () => {
        const res = await getQuestionList({
            presentationID: slide.presentationID,
            isAnswered: false,
        });
        setListQuestion(res.data);
    };
    // component đê trình chiếu
    if (slide.content.heading || slide.content.subHeading) {
        var dataHeading = [];
        dataHeading.push(slide.content.heading);
        dataHeading.push(slide.content.subHeading);
    }

    if (slide.content.paragraph) {
        var dataParagraph = [];
        dataParagraph.push(slide.content.paragraph);
    }
    const data = slide.content.option;
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

    useEffect(() => {
        getQuestionListFromUser();
    }, [listQuestion]);

    const handleAnswerQuestion = async (data) => {
        console.log("Clicked đây nèeeeeee");
        const res = await markAsAnsweredQuestion(data);
        console.log("Slide Show: res.data", res.data);
    };
    return (
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

                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <List>
                                {/* <Typography variant>Questions are not answer</Typography> */}
                                {listQuestion.map((item) => (
                                    <ListItem
                                        disablePadding
                                        style={{ backgroundColor: "#FFF6BD" }}
                                    >
                                        <ListItemButton
                                            onClick={() =>
                                                handleAnswerQuestion({
                                                    questionID: item.questionID,
                                                })
                                            }
                                        >
                                            <ListItemText
                                                primary={item.question}
                                                fontFamily="PatrickHand"
                                            />
                                            {item.isAnswered ? (
                                                <Button>
                                                    <CheckIcon />
                                                </Button>
                                            ) : (
                                                <Button>
                                                    <CloseIcon />
                                                </Button>
                                            )}
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>
                        </Grid>
                        {/* <Grid item xs={6}>
                            Question is answered
                        </Grid> */}
                    </Grid>

                    {/* <ResponsiveContainer>
                        <BarChart
                            data={dataHeading || dataParagraph}
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
                    </ResponsiveContainer> */}
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

export default SlideShow;
