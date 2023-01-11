import React, { useCallback, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import SlideList from "../Slide/SlideList";
import Slide from "../Slide/Slide";
import SlideSetting from "../Slide/SlideSetting";
import SlideShow from "../Slide/SlideShow";
import CircularProgress from "@mui/material/CircularProgress";
import { FullScreen } from "react-full-screen";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { getQuestionList } from "../../service/PersentationService";
import { nextSlide } from "../../service/PersentationService";
import { SOCKET_TYPE, SOCKET_URL } from "../../config";
import { io } from "socket.io-client";

const socket = io(SOCKET_URL, {
    autoConnect: false,
    transports: ["websocket"],
});

const PresentationBody = ({
    presentation,
    addSlide,
    changeSlidesOrder,
    selectedSlide,
    changeSelectedSlide,
    updateSelectedSlide,
    handleRemoveSlide,
    newSlideLoading,
    screen,
    changeCurrentSlideID,
}) => {
    const handleSlideShowNextSlide = async (slide) => {
        changeSelectedSlide(slide);
        try {
            const res = await nextSlide({
                presentationID: presentation.presentationID,
                slideID: slide.slideID,
            });
            changeCurrentSlideID(slide.slideID);
        } catch (error) {
            console.log(error);
        }
    };

    const getQuestionListFromUser = async () => {
        const res = await getQuestionList({
            presentationID: presentation.presentationID,
            isAnswered: false,
        });
        console.log(res.data);
    };

    useEffect(() => {
        try {
            socket.connect();
            socket.emit(SOCKET_TYPE.RELOAD_PRESENTATION, presentation);
            getQuestionListFromUser();
        } catch (error) {
            console.log(error);
        }
        return () => {
            socket.disconnect();
        };
    });

    return (
        <Grid
            container
            sx={{
                width: "100%",
                flex: "1 1 auto",
            }}
        >
            <Grid
                item
                xs={2}
                sx={{
                    borderRight: "1px solid #fff",
                    position: "relative",
                    padding: "1rem 0.5rem",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Button
                    sx={{
                        margin: "0px 20px 10px 20px",
                        textTransform: "none",
                        fontFamily: "PatrickHand",
                        fontSize: "1.3rem",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        backgroundColor: "#7439db",
                    }}
                    variant="contained"
                    size="small"
                    onClick={addSlide}
                >
                    {newSlideLoading ? (
                        <CircularProgress
                            sx={{ color: "#a7a7a7" }}
                            size={20}
                        ></CircularProgress>
                    ) : (
                        <AddIcon sx={{ marginRight: "0.5rem" }}></AddIcon>
                    )}
                    <p>Add slide</p>
                </Button>
                <Box
                    sx={{
                        position: "relative",
                        width: "100%",
                        flex: "1 1 auto",
                        overflow: "auto",
                    }}
                >
                    <Box
                        sx={{
                            position: "absolute",
                            width: "100%",
                        }}
                    >
                        <SlideList
                            presentation={presentation}
                            slides={presentation.slides}
                            changeSlidesOrder={changeSlidesOrder}
                            changeSelectedSlide={changeSelectedSlide}
                            selectedSlide={selectedSlide}
                            handleRemoveSlide={handleRemoveSlide}
                        ></SlideList>
                    </Box>
                </Box>
            </Grid>

            <Grid
                item
                xs={7}
                sx={{
                    padding: "2rem",
                }}
            >
                <FullScreen handle={screen}>
                    {screen.active ? (
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                margin: "auto",
                                height: "100%",
                                width: "100%",
                            }}
                        >
                            {selectedSlide.slideOrder - 1 >= 0 ? (
                                <Button
                                    onClick={() => {
                                        const leftSlide =
                                            presentation.slides[
                                                selectedSlide.slideOrder - 1
                                            ];
                                        handleSlideShowNextSlide(leftSlide);
                                    }}
                                >
                                    <ArrowCircleLeftIcon
                                        sx={{
                                            color: "#F69351",
                                            fontSize: "2rem",
                                        }}
                                    ></ArrowCircleLeftIcon>
                                </Button>
                            ) : (
                                <Button disabled="true" />
                            )}

                            {/* Cập nhật ở màn hình giữa  */}
                            <SlideShow slide={selectedSlide}></SlideShow>

                            {selectedSlide.slideOrder + 1 <
                            presentation.slides.length ? (
                                <Button
                                    onClick={() => {
                                        if (
                                            selectedSlide.slideOrder + 1 <
                                            presentation.slides.length
                                        ) {
                                            const rightSlide =
                                                presentation.slides[
                                                    selectedSlide.slideOrder + 1
                                                ];
                                            handleSlideShowNextSlide(
                                                rightSlide
                                            );
                                        }
                                    }}
                                >
                                    <ArrowCircleRightIcon
                                        sx={{
                                            color: "#F69351",
                                            fontSize: "2rem",
                                        }}
                                    ></ArrowCircleRightIcon>
                                </Button>
                            ) : (
                                <Button disabled="true" />
                            )}
                        </div>
                    ) : (
                        <></>
                    )}
                </FullScreen>
                <Slide slide={selectedSlide}></Slide>
            </Grid>

            <Grid
                item
                xs={3}
                sx={{
                    borderLeft: "1px solid #fff",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Box
                    sx={{
                        position: "relative",
                        width: "100%",
                        flex: "1 1 auto",
                        overflow: "auto",
                    }}
                >
                    <Box
                        sx={{
                            position: "absolute",
                            width: "100%",
                        }}
                    >
                        <SlideSetting
                            slide={selectedSlide}
                            handleChangeSlide={updateSelectedSlide}
                        ></SlideSetting>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
};

export default PresentationBody;
