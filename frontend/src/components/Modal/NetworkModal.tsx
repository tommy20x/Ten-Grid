import {
  Button,
  DialogContent,
} from "@mui/material";
import ModalContainer from './ModalContainer'
import ModalHeader from './ModalHeader'

const NetworkModal = ({ setNetwork }) => {
  return (
    <>
      <ModalContainer
        onClose={() => setNetwork(null)}
        aria-labelledby="customized-dialog-title"
        open={true}
      >
        <ModalHeader
          id="select-network-title"
          onClose={() => setNetwork(null)}
        >
          Select a network
        </ModalHeader>
        <DialogContent
          dividers
          sx={{
            display: "flex",
            flexDirection: "column",
            minWidth: "320px",
            maxWidth: '100%',
          }}
        >
          <Button
            variant="contained"
            sx={{ mb: 2 }}
            onClick={() => setNetwork("bsc")}
          >
            Binance Smart Chain
          </Button>
          <Button variant="contained" onClick={() => setNetwork("polygon")}>
            Polygon
          </Button>
        </DialogContent>
      </ModalContainer>
    </>
  );
};

export default NetworkModal;
