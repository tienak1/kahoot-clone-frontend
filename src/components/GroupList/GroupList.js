import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import {
    Grid,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Box,
    Typography,
    Card,
    Stack,
} from "@mui/material";

import jpgTemplate from "../../background.jpg";
import { groupList } from "../../service/GroupService";
import InPageLoading from "../PageLoading/InPageLoading";
import InviteGroupDialog from "../InviteGroupDialog/InviteGroupDialog";
import { AppContext } from "../../context/AppContext";

import "../../App.css";
// let names = [];
// let descriptions = [];

export default function GroupList() {
    const { user } = useContext(AppContext);
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [inviteGroup, setInviteGroup] = useState(null);
    const [owner, setOwner] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const list = async () => {
            const res = await groupList();
            console.log(res);
            for (let i = 0; i < res.data.length; i++) {
                setGroups(() => {
                    return res.data.map((item) => {
                        return {
                            ...item,
                            detailURL: "/group/" + item.groupID,
                        };
                    });
                });
                res.data.map((item) => {
                    // if (item.createdByAccountID === user.accountID) {
                    //     setOwner((oldValue) => { return [...oldValue, "OWNER"] });
                    // }
                    // else {
                    //     setOwner((oldValue) => { return [...oldValue, "NOT OWNER"] });
                    // }
                    item.members.map((mem) => {
                        if (user.accountID === mem.accountID) {
                            setOwner((oldValue) => {
                                return [...oldValue, mem.role];
                            });
                        }
                    });
                });
            }

            setLoading(false);
            //         console.log(groups);
            // console.log(groups.length);
        };
        list();
    }, []);

    const handleClickDetail = (url) => {
        navigate(url);
    };

    if (loading) {
        return <InPageLoading></InPageLoading>;
    }

    // const handleClickInviteDialogOpen = (groupID) => {
    //     console.log(groupID);
    //     setInviteCode(groupID);
    //     // setOpenInviteDialog(true);
    // };

    const handleInviteDialogClose = () => {
        // setOpenInviteDialog(false);
        setInviteGroup(null);
    };

    return (
        <Stack component="main" direction="column" spacing={2}>
            {/* Hero unit */}
            <Typography
                component="h1"
                variant="h2"
                align="center"
                color="white"
                fontFamily="PatrickHand"
            >
                Group
            </Typography>
            <a
                href="/group/create"
                className="button-1 color-1"
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "1.3rem",
                    margin: "1.5rem auto",
                }}
            >
                Create
            </a>
            {groups.length === 0 ? (
                <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    color="white"
                    gutterBottom
                    marginTop="10px"
                    fontFamily="PatrickHand"
                    fontSize="30px"
                >
                    You haven't joined in any group yet
                </Typography>
            ) : (
                <Box
                    sx={{
                        maxWidth: "70%",
                        marginX: "auto !important",
                        paddingBottom: "2rem",
                    }}
                >
                    <Grid container spacing={4}>
                        {groups.map((item, index) => (
                            <Grid item key={index} xs={12} sm={6} md={3}>
                                <Card
                                    sx={{
                                        height: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => {
                                        handleClickDetail(item.detailURL);
                                    }}
                                >
                                    {owner[index] === "OWNER" ? (
                                        <Box bgcolor="#F7944D">
                                            <Typography
                                                fontFamily="PatrickHand"
                                                color="white"
                                            >
                                                OWNER
                                            </Typography>
                                        </Box>
                                    ) : owner[index] === "COOWNER" ? (
                                        <Box bgcolor="#7439db">
                                            <Typography
                                                fontFamily="PatrickHand"
                                                color="white"
                                            >
                                                COOWNER
                                            </Typography>
                                        </Box>
                                    ) : (
                                        <Box bgcolor="#C66FBC">
                                            <Typography
                                                fontFamily="PatrickHand"
                                                color="white"
                                            >
                                                MEMBER
                                            </Typography>
                                        </Box>
                                    )}

                                    <CardMedia alt="random">
                                        <img src={jpgTemplate} />
                                    </CardMedia>
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography
                                            fontFamily="PatrickHand"
                                            gutterBottom
                                            variant="h5"
                                            component="h2"
                                        >
                                            {item.name}
                                        </Typography>
                                        <Typography fontFamily="PatrickHand">
                                            Description: {item.description}
                                        </Typography>
                                    </CardContent>
                                    <CardActions
                                        style={{ justifyContent: "center" }}
                                    >
                                        {/* <Button
                                            sx={{
                                                margin: "0px 20px 10px 20px",
                                                background: "#7439db",
                                                fontFamily: "PatrickHand",
                                            }}
                                            variant="contained"
                                            size="small"
                                            href={item.detailURL}
                                        >
                                            Xem
                                        </Button> */}

                                        <Button
                                            sx={{
                                                margin: "0px 10px 10px 10px",
                                                background: "#7439db",
                                                fontFamily: "PatrickHand",
                                            }}
                                            variant="contained"
                                            size="small"
                                            onClick={(e) => {
                                                // handleClickInviteDialogOpen(
                                                //     item.groupID
                                                // );
                                                e.stopPropagation();
                                                setInviteGroup(item);
                                            }}
                                        >
                                            Invite
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    <InviteGroupDialog
                        open={!!inviteGroup}
                        setOpen={setInviteGroup}
                        onClose={handleInviteDialogClose}
                        inviteGroup={inviteGroup}
                    ></InviteGroupDialog>
                </Box>
            )}
        </Stack>
    );
}
