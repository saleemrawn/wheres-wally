import { Grid, Heading } from "@radix-ui/themes";
import { Outlet } from "react-router";
import Header from "./components/header";
import Footer from "./components/footer";

const App = () => {
  return (
    <>
      <Grid columns={"1"} rows={"auto 1fr auto"} height={"100vh"}>
        <Header />
        <Outlet />
        <Footer />
      </Grid>
    </>
  );
};

export default App;
