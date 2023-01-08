import React from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import copy from "copy-to-clipboard";
import { HOST_URL, SECRET_PRESENTATION } from "../../config";
import { useToast } from "../../hook/useToast";
const sign = require("jwt-encode");

const SharePresentationDialog = ({
    open,
    setOpen,
    onClose,
    sharePresentation,
}) => {
    const shareCode = sharePresentation
        ? sign(sharePresentation.presentationID, SECRET_PRESENTATION)
        : "";
    const inviteLink = HOST_URL + "presentation/join/" + shareCode;

    const toast = useToast();

    const handleCopyLinkClick = () => {
        copy(inviteLink);
        toast.success("Đã sao chép liên kết");
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>
                Chia sẻ bản trình bày{" "}
                <b>{sharePresentation ? sharePresentation.name : ""}</b>
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Mời tham gia xem và bình chọn trên bản trình bày thông qua
                    đường liên kết dưới đây:
                </DialogContentText>
                <TextField
                    id="invite-link"
                    defaultValue={inviteLink}
                    InputProps={{
                        readOnly: true,
                        endAdornment: (
                            <IconButton onClick={handleCopyLinkClick}>
                                <ContentCopyIcon />
                            </IconButton>
                        ),
                    }}
                    variant="standard"
                    margin="dense"
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Đóng</Button>
            </DialogActions>
        </Dialog>
    );
};

export default SharePresentationDialog;
