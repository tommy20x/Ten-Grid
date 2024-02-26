import { styled } from "@mui/material/styles";
import { Dialog } from "@mui/material";

const ModalContainer = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(4),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(2),
  },
}));

export default ModalContainer;
