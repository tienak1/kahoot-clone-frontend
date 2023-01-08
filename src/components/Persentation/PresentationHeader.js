import React from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import CheckIcon from "@mui/icons-material/Check";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import ShareIcon from "@mui/icons-material/Share";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

import Button from "@mui/material/Button";

import { useForm } from "react-hook-form";

import SharePresentationDialog from "../SharePresentationDialog/SharePresentationDialog";
import { useState } from "react";

const PresentationHeader = ({ presentation, changetitle, isSaving, screen, changeSelectedSlide }) => {
    const [sharePresentation, setSharePresentation] = useState(null);


    const handleShareDialogClose = () => {
        setSharePresentation(null);
    };

    const { register, handleSubmit } = useForm();

    const onSubmitTitle = (data) => {
        changetitle(data.title);
    };

    const onSlideShow = () => {
        const n = presentation.slides.length;
        for (let i = 0; i < n; i++) {
            if(presentation.slides[i].slideID === presentation.currentSlideID)
            {
                changeSelectedSlide(presentation.slides[i]);
            }
        }
    }

    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{
                padding: "0.5rem 1rem",
                borderBottom: "1px solid #fff",
                fontFamily: "PatrickHand",
                fontSize: "1.3rem",
            }}
        >
            <TextField
                type="text"
                required
                variant="standard"
                margin="normal"
                defaultValue={presentation.name}
                inputProps={{
                    style: {
                        fontSize: "1.5rem",
                        fontFamily: "PatrickHand",
                        color: "white",
                        paddingLeft: "0.5rem",
                    },
                }} // font size of input text
                InputLabelProps={{
                    style: {
                        fontSize: "1.3rem",
                        fontFamily: "PatrickHand",
                        color: "white",
                    },
                }} // font size of input label
                {...register("title")}
                sx={{
                    "& .MuiInputBase-root::before": {
                        borderBottom: "1px solid #fff",
                    },
                    "& .MuiInputBase-root:hover:not(.Mui-disabled):before": {
                        borderBottom: "2px solid #fff",
                    },
                    "& .MuiInputBase-root::after": {
                        borderBottom: "2px solid #852D91",
                    },
                }}
                onBlur={handleSubmit(onSubmitTitle)}
            />
            <Stack direction="row" alignItems="center" spacing={2}>
                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={2}
                    divider={
                        <Divider
                            orientation="vertical"
                            sx={{ borderColor: "#fff" }}
                            flexItem
                        ></Divider>
                    }
                    sx={{
                        "& p": {
                            color: isSaving ? "white" : "#a7a7a7",
                        },
                    }}
                >
                    {isSaving ? (
                        <>
                            <CircularProgress
                                sx={{ color: "#a7a7a7" }}
                                size={20}
                            ></CircularProgress>
                            <p>Đang lưu</p>
                        </>
                    ) : (
                        <>
                            <CheckIcon color="success"></CheckIcon>
                            <p>Đã lưu</p>
                        </>
                    )}

                    <Button
                        sx={{
                            margin: "0px 20px 10px 20px",
                            textTransform: "none",
                            fontFamily: "PatrickHand",
                            fontSize: "1.3rem",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            backgroundColor: "#7439db"
                        }}
                        variant="contained"
                        size="small"
                        onClick={() => {
                            setSharePresentation(presentation);
                        }}
                    >
                        <ShareIcon sx={{ marginRight: "0.5rem" }}></ShareIcon>
                        Chia sẻ
                    </Button>

                    <Button
                        sx={{
                            margin: "0px 20px 10px 20px",
                            textTransform: "none",
                            fontFamily: "PatrickHand",
                            fontSize: "1.3rem",
                            backgroundColor: "#F7944D"
                        }}
                        variant="contained"
                        color="success"
                        size="small"
                        onClick={screen.enter}
                        onMouseUp={onSlideShow}
                    >
                        <PlayArrowIcon
                            sx={{ marginRight: "0.5rem" }}
                        ></PlayArrowIcon>
                        Bắt đầu trình chiếu
                    </Button>
                </Stack>
                <SharePresentationDialog
                    open={!!sharePresentation}
                    setOpen={setSharePresentation}
                    onClose={handleShareDialogClose}
                    sharePresentation={sharePresentation}
                ></SharePresentationDialog>
            </Stack>
        </Stack>
    );
};

export default PresentationHeader;