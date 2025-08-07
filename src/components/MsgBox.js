import React, { useEffect, useState } from "react";
import { DefButton, DefInput } from "./ComponentList";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// import { Transition } from "@headlessui/react";
export default function MsgBox(p) {
  const [open, setOpen] = React.useState(false);
  const [InputBox, setInputBox] = useState("");
  const handlerx = (e) => {
    setInputBox(e.target.value);
  };
  const handleClickOpen = () => {
    p.InputMsg("");
    setOpen(true);
  };

  const handleClose = () => {
    p.InputMsg(InputBox);
    setOpen(false);
  };

  return (
    <div>
      <DefButton
        variant="outlined"
        onClick={handleClickOpen}
        text={p.label}
        className={p.className}
      />
      <Dialog
        open={open}
        // TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description "
        className=""
      >
        <DialogTitle className="bg-black text-white">{p.title}</DialogTitle>
        <DialogContent className="bg-black">
          <DialogContentText id="alert-dialog-slide-description">
            <DefInput
              label={p.text}
              handler={handlerx}
              dropDownId={p.dropDownId}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions className="bg-black">
          <DefButton
            onClick={handleClose}
            text="Cancel"
            className={"bg-red-500"}
            id={p.id}
          />
          <DefButton onClick={handleClose} text="Confirm" />
        </DialogActions>
      </Dialog>
    </div>
  );
}
