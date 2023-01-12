import {
    Box,
    FormControl,
    FormLabel,
    RadioGroup,
    Radio,
    FormControlLabel,
    Button,
    Stack,
    Typography,
    OutlinedInput,
    TextField,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import io from "socket.io-client";
import { SOCKET_TYPE, SOCKET_URL } from "../../config";
import {
    sendQuestionToHost,
    submitAnswer,
    submitQuestion,
} from "../../service/PersentationService";
import WaitingSlide from "../WaitingSlide/WaitingSlide";
import CircularProgress from "@mui/material/CircularProgress";
import { API_STATUS } from "../../config/common";
import EndSlide from "../EndSlide/EndSlide";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Controller } from "react-hook-form";

const socket = io(SOCKET_URL, {
    autoConnect: false,
    transports: ["websocket"],
});

// page của viewer, chọn lựa chọn
const ViewerScreen = ({ presentation }) => {
    const { user } = useContext(AppContext);
    const [currentSlide, setCurrentSlide] = useState(null);
    const [value, setValue] = useState(null);
    const [valueQuestion, setValueQuestion] = useState(null);
    const [dataQuestion, setDataQuestion] = useState(null);
    const [isWaitingScreen, setIsWaitingScreen] = useState(false);
    const [isSubmiting, setIsSubmiting] = useState(false);
    const [isDone, setIsDone] = useState(false);

    const handleChangeSlide = ({ slide }) => {
        if (slide && slide.presentationID === presentation?.presentationID) {
            setCurrentSlide(slide);
            setIsSubmiting(false);
            setIsWaitingScreen(false);
            setIsDone(false);
        }
    };

    const handleChangeOption = (event) => {
        setValue(event.target.value);
    };

    const handleChangeQuestion = (event) =>
        setValueQuestion(event.target.value);

    const handleSubmit = async () => {
        setIsSubmiting(true);
        const res = await submitAnswer({
            slideID: currentSlide.slideID,
            option: value,
            presentationID: currentSlide.presentationID,
            accountID: user.accountID,
        });
        console.log(res);
        if (res.status === API_STATUS.OK) {
            if (res.data[0].isLastSlide) {
                setIsDone(true);
            }
        }
        setIsSubmiting(false);
        setIsWaitingScreen(true);
    };

    const handleSubmitQuestion = async () => {
        setIsSubmiting(true);
        const res = await sendQuestionToHost({
            question: valueQuestion,
            presentationID: presentation.presentationID,
        });
        console.log(res);
        if (res.status === API_STATUS.OK) {
            setDataQuestion(res.data[0]);
            if (res.data[0].isLastSlide) {
                setIsDone(true);
            }
        }
        setIsSubmiting(false);
        setIsWaitingScreen(true);
    };

    const handleRecieveMessageSocket = (data) => {
        console.log(data);
    };

    const handleRecieveQuestionSocket = (data) => {
        console.log(data);
    };

    const handleUpvoteQuestionSocket = (data) => {
        console.log(data);
    };

    const handleAnswerQuestionSocket = (data) => {
        console.log(data);
    };

    const slideContent = useMemo(() => {
        if (currentSlide) {
            return currentSlide.content;
        }
    }, [currentSlide]);

    useEffect(() => {
        if (presentation && presentation.slides && presentation.slides.length) {
            if (
                !currentSlide ||
                currentSlide.slideID !== presentation.currentSlideID ||
                true
            ) {
                setCurrentSlide(
                    presentation.slides.find(
                        (item) => item.slideID === presentation.currentSlideID
                    )
                );
            }
            setValue(null);
        }
    }, [presentation]);

    useEffect(() => {
        try {
            socket.connect();
            socket.on(SOCKET_TYPE.NEXT_SLIDE, handleChangeSlide);
            socket.on(SOCKET_TYPE.SEND_MESSAGE, handleRecieveMessageSocket);
            socket.on(
                SOCKET_TYPE.MARKED_AS_ANWSERED_QUESTION,
                handleAnswerQuestionSocket
            );
            socket.on(SOCKET_TYPE.UPVOTE_QUESTION, handleUpvoteQuestionSocket);
            socket.on(SOCKET_TYPE.SUBMIT_QUESTION, handleRecieveQuestionSocket);
            socket.emit(SOCKET_TYPE.SEND_QUESTION, dataQuestion, (socket) =>
                console.log(socket)
            );
        } catch (error) {
            console.log(error);
        }

        return () => {
            socket.disconnect();
        };
    }, []);

    if (isDone) {
        return <EndSlide></EndSlide>;
    }

    if (isWaitingScreen) {
        return <WaitingSlide></WaitingSlide>;
    }

    return (
        <React.Fragment>
            {currentSlide?.content.heading ? (
                <Box
                    sx={{
                        width: "100%",
                        padding: "4rem",
                        background: "#white",
                        flex: "1 1 auto",
                    }}
                >
                    <Typography
                        component="h1"
                        variant="h2"
                        align="center"
                        color="white"
                        fontFamily="PatrickHand"
                    >
                        Menti Menti
                    </Typography>
                    <Stack
                        direction="column"
                        spacing={2}
                        justifyContent="flex-start"
                        sx={{
                            maxWidth: "60%",
                            margin: "0 auto",
                            marginTop: "2rem",
                        }}
                    >
                        <Typography
                            component="h4"
                            variant="h4"
                            color="white"
                            fontFamily="PatrickHand"
                        >
                            {slideContent?.heading || slideContent?.paragraph}
                        </Typography>
                        {/* <FormControl>
                            <RadioGroup
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"
                                value={value}
                                onChange={handleChangeOption}
                            >
                                {slideContent?.option.map((item, index) => {
                                    return (
                                        <Box
                                            sx={{
                                                border: "2px solid",
                                                borderImageSlice: 1,
                                                borderWidth: "2px",
                                                borderImageSource:
                                                    "linear-gradient(79deg, #7439db, #C66FBC 48%, #F7944D)",
                                                marginY: "1rem",
                                                "& .MuiRadio-root": {
                                                    color: "#fff",
                                                },
                                                "& .MuiTypography-root": {
                                                    fontFamily: "PatrickHand",
                                                    fontSize: "1.5rem",
                                                },
                                                "& .Mui-checked": {
                                                    color: "#F59251",
                                                },
                                                color: "#fff",
                                            }}
                                        >
                                            <FormControlLabel
                                                key={index}
                                                value={item.key}
                                                control={
                                                    <Radio
                                                        sx={{
                                                            "& .MuiSvgIcon-root":
                                                                {
                                                                    fontSize:
                                                                        "2rem",
                                                                },
                                                        }}
                                                    />
                                                }
                                                sx={{
                                                    display: "flex",
                                                    padding: "1rem",
                                                }}
                                                label={item.key}
                                            />
                                        </Box>
                                    );
                                })}
                            </RadioGroup>
                        </FormControl> */}
                        <TextField
                            onBlur={handleChangeQuestion}
                            value={valueQuestion}
                            style={{ color: "#fff" }}
                        ></TextField>
                        <button
                            onClick={handleSubmitQuestion}
                            className="button-1 color-1"
                            style={{
                                fontSize: "1.5rem",
                                marginLeft: "auto",
                                marginRight: "auto",
                                ...(isSubmiting && { background: "#909090" }),
                            }}
                            disabled={isSubmiting}
                        >
                            <Stack
                                direction="row"
                                alignItems="center"
                                justifyContent="center"
                                spacing={3}
                                sx={{
                                    width: "100%",
                                }}
                            >
                                {isSubmiting && (
                                    <CircularProgress
                                        size={25}
                                        sx={{ color: "#fff" }}
                                    />
                                )}
                                <div>Send Question</div>
                            </Stack>
                        </button>
                    </Stack>
                </Box>
            ) : (
                <Box
                    sx={{
                        width: "100%",
                        padding: "4rem",
                        background: "#202020",
                        flex: "1 1 auto",
                    }}
                >
                    <Typography
                        component="h1"
                        variant="h2"
                        align="center"
                        color="white"
                        fontFamily="PatrickHand"
                    >
                        Menti
                    </Typography>
                    <Stack
                        direction="column"
                        spacing={2}
                        justifyContent="flex-start"
                        sx={{
                            maxWidth: "60%",
                            margin: "0 auto",
                            marginTop: "2rem",
                        }}
                    >
                        <Typography
                            component="h4"
                            variant="h4"
                            color="white"
                            fontFamily="PatrickHand"
                        >
                            {slideContent?.question}
                        </Typography>
                        <FormControl>
                            <RadioGroup
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"
                                value={value}
                                onChange={handleChangeOption}
                            >
                                {slideContent?.option.map((item, index) => {
                                    return (
                                        <Box
                                            sx={{
                                                border: "2px solid",
                                                borderImageSlice: 1,
                                                borderWidth: "2px",
                                                marginY: "1rem",
                                                "& .MuiRadio-root": {
                                                    color: "#fff",
                                                },
                                                "& .MuiTypography-root": {
                                                    fontFamily: "PatrickHand",
                                                    fontSize: "1.5rem",
                                                },
                                                "& .Mui-checked": {
                                                    color: "#F59251",
                                                },
                                                color: "#fff",
                                            }}
                                        >
                                            <FormControlLabel
                                                key={index}
                                                value={item.key}
                                                control={
                                                    <Radio
                                                        sx={{
                                                            "& .MuiSvgIcon-root":
                                                                {
                                                                    fontSize:
                                                                        "2rem",
                                                                },
                                                        }}
                                                    />
                                                }
                                                sx={{
                                                    display: "flex",
                                                    padding: "1rem",
                                                }}
                                                label={item.key}
                                            />
                                        </Box>
                                    );
                                })}
                            </RadioGroup>
                        </FormControl>
                        <button
                            onClick={handleSubmit}
                            className="button-1 color-1"
                            style={{
                                fontSize: "1.5rem",
                                marginLeft: "auto",
                                marginRight: "auto",
                                ...(isSubmiting && { background: "#909090" }),
                            }}
                            disabled={isSubmiting}
                        >
                            <Stack
                                direction="row"
                                alignItems="center"
                                justifyContent="center"
                                spacing={3}
                                sx={{
                                    width: "100%",
                                }}
                            >
                                {isSubmiting && (
                                    <CircularProgress
                                        size={25}
                                        sx={{ color: "#fff" }}
                                    />
                                )}
                                <div>Submit</div>
                            </Stack>
                        </button>
                    </Stack>
                </Box>
            )}
        </React.Fragment>
    );
};

export default ViewerScreen;
