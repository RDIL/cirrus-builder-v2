import React from "react"
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@material-ui/core"

interface PopupProps {
    handleClose(isOpen: boolean): void
    title: string
    desc: JSX.Element
}

const Popup = (props: PopupProps) => (
    <Dialog
        open={true}
        onClose={() => props.handleClose(false)}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
    >
        <DialogTitle id="alert-dialog-slide-title">{props.title}</DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
                {props.desc}
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={() => props.handleClose(false)} color="primary">
                Close
            </Button>
        </DialogActions>
    </Dialog>
)

export default Popup
