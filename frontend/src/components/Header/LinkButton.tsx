import { Link as RouterLink } from "react-router-dom";
import { Link as MatLink } from "@mui/material";

const LinkButton = ({ to, label }: { to: string; label: string }) => {
  return (
    <MatLink
      component={RouterLink}
      to={to}
      underline="none"
      variant="h6"
      color="white"
      sx={{
        m: 1.5,
        "&:hover": {
          color: "primary.main",
        },
      }}
    >
      {label}
    </MatLink>
  );
};

export default LinkButton;
