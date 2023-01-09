import {
    Grid,
    TextField,
    Typography,
    Stack,
    Button,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import "./contextmenu.css";
import { useToast } from "../../hook/useToast";
import { StoreMallDirectory } from "@mui/icons-material";
import { useMemo } from "react";
import {
    create,
    updateSlideTypeInPresentation,
} from "../../service/PersentationService";
import { updateSlideType } from "../../service/SlideService";
const SlideSetting = ({ slide, handleChangeSlide }) => {
    const { register, handleSubmit, setValue, getValues, control } = useForm();
    const toast = useToast();
    const warningDelete = () => {
        toast.warning("Không thể xóa lựa chọn này");
    };
    const slideContent = useMemo(() => {
        return slide.content;
    }, [slide]);
    const [slideType, setSlideType] = useState("multiple-choice");

    useEffect(() => {
        setValue("question", slideContent.question);
        const setOptionValue = () => {
            const n = slideContent.option.length;
            for (let i = 0; i < n; i++) {
                setValue(`option-${i}`, slideContent.option[i].key);
            }
        };
        setOptionValue();
    }, [slide, slideContent]);

    const onSubmitQuestion = (data) => {
        const newSlide = slide;
        newSlide.content.question = data.question;
        handleChangeSlide(newSlide);
    };

    const onSubmitOption = (index) => {
        // const index1 = 0;
        // console.log(getValues(`option-${index1}`));
        const newSlide = slide;
        // const n = slideContent.option.length;
        // for (let i = 0; i < n; i++) {
        //     newSlide.content.option[i].key = getValues(`option-${i}`);
        // }
        newSlide.content.option[index].key = getValues(`option-${index}`);
        handleChangeSlide(newSlide);
    };

    const onAddOption = () => {
        // const index1 = 0;
        // console.log(getValues(`option-${index1}`));
        const newSlide = slide;
        const n = slideContent.option.length;
        const data = { key: `Lựa chọn ${n + 1}`, value: 0 };
        newSlide.content.option.push(data);
        console.log(newSlide.content);
        handleChangeSlide(newSlide);
    };

    const onDeleteOption = (index) => {
        const newSlide = slide;
        newSlide.content.option.splice(index, 1);
        console.log(newSlide.content);
        handleChangeSlide(newSlide);
    };

    console.log("slideType: ", slideType);
    const handleChangeSlideType = (e) => {
        setSlideType(e.target.value);
    };

    return (
        <>
            <FormControl
                style={{ width: "22vw", marginTop: "10%", textAlign: "left" }}
            >
                <Typography style={{ color: "#fff", fontWeight: "bold" }}>
                    Slide Type
                </Typography>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={slideType}
                    label="Select the slide type"
                    onChange={handleChangeSlideType}
                    style={{ color: "#fff" }}
                >
                    <MenuItem value="multiple-choice">Mutiple Choice</MenuItem>
                    <MenuItem value="heading">Heading</MenuItem>
                    <MenuItem value="paragraph">Paragrah</MenuItem>
                </Select>
            </FormControl>
            {slideType === "multiple-choice" ? (
                <Box>
                    <Typography
                        component="p"
                        variant="h2"
                        align="center"
                        color="white"
                        marginTop={1.5}
                        fontWeight={700}
                        fontFamily="PatrickHand"
                        fontSize="1.3rem"
                    >
                        CÂU HỎI
                    </Typography>
                    <Controller
                        control={control}
                        name="question"
                        defaultValue={slideContent.question}
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                        }) => (
                            <TextField
                                fullWidth
                                required
                                variant="outlined"
                                margin="normal"
                                sx={{
                                    m: 1,
                                    width: "90%",
                                    "& fieldset": {
                                        borderColor: "#a1a1a1",
                                    },
                                    "& .MuiOutlinedInput-root:hover fieldset": {
                                        border: "2px solid #fff",
                                    },
                                }}
                                inputProps={{
                                    style: {
                                        fontSize: 20,
                                        fontFamily: "PatrickHand",
                                        color: "white",
                                        paddingLeft: "0.5rem",
                                    },
                                }} // font size of input text
                                InputLabelProps={{
                                    style: {
                                        fontSize: 20,
                                        fontFamily: "PatrickHand",
                                        color: "white",
                                    },
                                }} // font size of input label
                                onBlur={handleSubmit(onSubmitQuestion)}
                                value={value}
                                onChange={onChange}
                            />
                        )}
                    />
                    <Typography
                        component="p"
                        variant="h2"
                        align="center"
                        color="white"
                        // gutterBottom.
                        marginTop={2}
                        fontWeight={700}
                        fontFamily="PatrickHand"
                        fontSize="1.3rem"
                    >
                        LỰA CHỌN
                    </Typography>
                    <Stack
                        display="column"
                        align="center"
                        spacing={3}
                        justifyContent="center"
                        sx={{ marginBottom: "2rem", marginTop: "1rem" }}
                    >
                        {slideContent.option &&
                            slideContent.option.map((item, index) => {
                                return (
                                    <Stack
                                        container
                                        direction="row"
                                        key={index}
                                        justifyContent="center"
                                    >
                                        <Controller
                                            control={control}
                                            name={`option-${index}`}
                                            defaultValue={
                                                slideContent.option[index].key
                                            }
                                            render={({
                                                field: { onChange, value },
                                                fieldState: { error },
                                            }) => (
                                                <TextField
                                                    type="text"
                                                    required
                                                    variant="standard"
                                                    inputProps={{
                                                        style: {
                                                            fontSize: "1.3rem",
                                                            fontFamily:
                                                                "PatrickHand",
                                                            color: "white",
                                                            paddingLeft:
                                                                "0.5rem",
                                                        },
                                                    }} // font size of input text
                                                    InputLabelProps={{
                                                        style: {
                                                            fontSize: "1.3rem",
                                                            fontFamily:
                                                                "PatrickHand",
                                                            color: "white",
                                                        },
                                                    }} // font size of input label
                                                    sx={{
                                                        width: "80%",
                                                        "& .MuiInputBase-root::before":
                                                            {
                                                                borderBottom:
                                                                    "1px solid #fff",
                                                            },
                                                        "& .MuiInputBase-root:hover:not(.Mui-disabled):before":
                                                            {
                                                                borderBottom:
                                                                    "2px solid #fff",
                                                            },
                                                        "& .MuiInputBase-root::after":
                                                            {
                                                                borderBottom:
                                                                    "2px solid #852D91",
                                                            },
                                                    }}
                                                    onChange={onChange}
                                                    value={value}
                                                    onBlur={handleSubmit(() => {
                                                        onSubmitOption(index);
                                                    })}
                                                />
                                            )}
                                        />
                                        {slideContent.option.length >= 2 &&
                                        slideContent.option[index].value ===
                                            0 ? (
                                            <IconButton
                                                sx={{
                                                    color: "#fff",
                                                }}
                                                onClick={() => {
                                                    onDeleteOption(index);
                                                }}
                                                // onMouseDown={(e) => e.stopPropagation()}
                                            >
                                                <ClearIcon />
                                            </IconButton>
                                        ) : (
                                            <IconButton
                                                sx={{
                                                    color: "#fff",
                                                }}
                                                onClick={() => {
                                                    warningDelete();
                                                }}
                                                // onMouseDown={(e) => e.stopPropagation()}
                                            >
                                                <ClearIcon />
                                            </IconButton>
                                        )}
                                    </Stack>
                                );
                            })}
                    </Stack>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Button
                            sx={{
                                width: "90%",
                                // margin: "10px",
                                textTransform: "none",
                                fontFamily: "PatrickHand",
                                fontSize: "1.3rem",
                                backgroundColor: "#7439db",
                            }}
                            variant="contained"
                            size="small"
                            onClick={onAddOption}
                        >
                            <AddIcon sx={{ marginRight: "0.5rem" }}></AddIcon>
                            <p>Thêm lựa chọn</p>
                        </Button>
                    </Box>
                </Box>
            ) : (
                ""
            )}
        </>
    );
};

export default SlideSetting;
