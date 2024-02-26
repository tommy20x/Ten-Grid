import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Header from "../components/Header/Header";

export default function MainLayout({ children }) {
  return (
    <div className="root">
      <Header />
      <Toolbar />
      <Container>{children}</Container>
    </div>
  );
}
