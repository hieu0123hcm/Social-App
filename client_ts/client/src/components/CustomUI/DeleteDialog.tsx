import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { CustomButton } from "./CustomButton";

interface Props {
  open: boolean;
  handleClose: () => void;
  deletePost: () => void;
}

const DeleteDialog = ({ open, handleClose, deletePost }: Props) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Post delete"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Do you want to delete this post?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <CustomButton label="Cancel" handleClick={handleClose} />
        <CustomButton label="Agree" handleClick={deletePost} />
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
