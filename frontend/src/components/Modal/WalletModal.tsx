import { Button, DialogContent, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import ModalContainer from "./ModalContainer";
import ModalHeader from "./ModalHeader";
import connectors from "./config";

const WalletButton = styled(Button)(({ theme }) => ({
  borderRadius: "16px",
  display: "flex",
  justifyContent: "space-between",
  padding: "12px 28px",
  margin: "12px 0",
}));

const WalletCard = ({ login, walletConfig }) => {
  const { title, icon: Icon } = walletConfig;

  const connectWallet = () => {
    login(walletConfig.connectorId)
  }

  return (
    <WalletButton variant="outlined" onClick={connectWallet}>
      <Typography variant="body1">{title}</Typography>
      {<Icon />}
    </WalletButton>
  );
};

const WalletModal = ({ login, onClose }) => {
  return (
    <>
      <ModalContainer
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={true}
      >
        <ModalHeader id="select-network-title" onClose={onClose}>
          Connect to a wallet
        </ModalHeader>
        <DialogContent
          dividers
          sx={{
            display: "flex",
            flexDirection: "column",
            minWidth: "420px",
            maxWidth: "100%",
          }}
        >
          {connectors.map((config, index) => {
            return (
              <WalletCard
                key={index}
                login={login}
                walletConfig={config}
              />
            );
          })}
        </DialogContent>
      </ModalContainer>
    </>
  );
};

export default WalletModal;
