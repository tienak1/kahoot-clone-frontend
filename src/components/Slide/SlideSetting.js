import {
    Grid,
    TextField,
    Typography,
    Stack,
    Button,
    Box,
    FormControl,
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
import { LeaderboardOutlined, StoreMallDirectory } from "@mui/icons-material";
import { useMemo } from "react";
import { displayResult } from "../../service/PersentationService";
import { getAllAccount } from "../../service/AccountService";
import { Modal } from "antd";
import { isContentEditable } from "@testing-library/user-event/dist/utils/edit/isContentEditable";
const SlideSetting = ({ slide, handleChangeSlide }) => {
    const { register, handleSubmit, setValue, getValues, control } = useForm();
    const toast = useToast();
    const [slideResult, setSlideResult] = useState([]);

    // ANTD MODAL
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    // ANTD MODAL

    const warningDelete = () => {
        toast.warning("Không thể xóa lựa chọn này");
    };

    const slideContent = useMemo(() => {
        return slide.content;
    }, [slide]);

    const [slideType, setSlideType] = useState(slide.type);

    useEffect(() => {
        // set value for multiple choice
        setValue("question", slideContent.question);
        const setOptionValue = () => {
            const n = slideContent.option.length;
            for (let i = 0; i < n; i++) {
                setValue(`option-${i}`, slideContent.option[i].key);
            }
        };
        setOptionValue();

        // set value for heading
    }, [slide, slideContent]);

    // thay đổi cho multiple choice
    // thay đổi câu hỏi
    const onSubmitQuestion = (data) => {
        const newSlide = slide;
        newSlide.content.question = data.question;
        handleChangeSlide(newSlide);
    };

    // thay đổi option
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

    // thêm lựa chọn
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

    // xóa lựa chọn
    const onDeleteOption = (index) => {
        const newSlide = slide;
        newSlide.content.option.splice(index, 1);
        console.log(newSlide.content);
        handleChangeSlide(newSlide);
    };

    // thay đổi cho heading và subheading
    const onSubmitHeading = (data) => {
        const newSlide = slide;
        newSlide.content.heading = data.heading;
        handleChangeSlide(newSlide);
    };
    const onSubmitSubHeading = (data) => {
        const newSlide = slide;
        newSlide.content.subHeading = data.subheading;
        handleChangeSlide(newSlide);
    };

    // thay đổi heading và paragraph
    const onSubmitParagraph = (data) => {
        const newSlide = slide;
        newSlide.content.paragraph = data.paragraph;
        handleChangeSlide(newSlide);
    };

    // change slide type
    const handleChangeSlideType = () => {
        const newSlide = slide;
        newSlide.type = slideType;
        handleChangeSlide(newSlide);
    };

    const handleDisplayResult = async () => {
        const res = await displayResult({
            presentationID: slide.presentationID,
            slideID: slide.slideID,
        });
        const resUser = await getAllAccount();
        const listUser = resUser.data; //{fullname,accountID} - array
        const listOption = res.data[0].option; //{id,option:[{key,value,submitBy:[{accountID, _id}]}]} - array
        setSlideResult(res.data[0].option);
    };

    if (isModalOpen) handleDisplayResult();

    return (
        <React.Fragment>
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
                    onChange={(e) => {
                        setSlideType(e.target.value);
                    }}
                    style={{ color: "#fff" }}
                >
                    <MenuItem value="MULTIPLE_CHOICE">Mutiple Choice</MenuItem>
                    <MenuItem value="HEADING">Heading</MenuItem>
                    <MenuItem value="PARAGRAPH">Paragrah</MenuItem>
                </Select>
                <Button type="primary" onChange={() => handleChangeSlideType()}>
                    Change
                </Button>
            </FormControl>
            {slideType === "MULTIPLE_CHOICE" && (
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
                                margin: "10px",
                                textTransform: "none",
                                fontFamily: "PatrickHand",
                                fontSize: "1.3rem",
                                backgroundColor: "red",
                            }}
                            variant="contained"
                            size="small"
                            onClick={showModal}
                        >
                            <LeaderboardOutlined
                                sx={{ marginRight: "0.5rem" }}
                            ></LeaderboardOutlined>
                            <p>Xem kết quả</p>
                        </Button>
                    </Box>
                </Box>
            )}
            {/* HEADING  */}
            {slideType === "HEADING" && (
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
                        Heading
                    </Typography>
                    <Controller
                        control={control}
                        name="heading"
                        defaultValue={slideContent.heading}
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
                                onBlur={handleSubmit(onSubmitHeading)}
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
                        Subheading
                    </Typography>
                    <Controller
                        control={control}
                        name="subheading"
                        defaultValue={slideContent.subHeading}
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
                                onBlur={handleSubmit(onSubmitSubHeading)}
                                value={value}
                                onChange={onChange}
                            />
                        )}
                    />
                </Box>
            )}
            {slideType === "PARAGRAPH" && (
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
                        Paragraph
                    </Typography>
                    <Controller
                        control={control}
                        name="paragraph"
                        defaultValue={slideContent.paragraph}
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
                                onBlur={handleSubmit(onSubmitParagraph)}
                                value={value}
                                onChange={onChange}
                            />
                        )}
                    />
                </Box>
            )}
            <Modal
                title="Basic Modal"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                {slideResult.map((item) => (
                    <>
                        <p>{item.key}</p>
                        <span>
                            {item.submitBy.map((itemSubmit) => (
                                <span>
                                    {itemSubmit.accountID && "submit by: Hải"}
                                </span>
                            ))}
                        </span>
                    </>
                ))}
            </Modal>
        </React.Fragment>
    );
};

export default SlideSetting;
