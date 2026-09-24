import { Grid, Heading } from "@radix-ui/themes";
import { Outlet } from "react-router";
import { Toaster, ToastBar } from "react-hot-toast";
import { GameStateProvider } from "./context/game-state";
import { Header } from "./components/header";
import { Footer } from "./components/footer";

const App = () => {
  return (
    <>
      <Toaster
        toastOptions={{
          success: {
            className:
              "font-sniglet text-2xl w-full !bg-green-600 !text-white !rounded-lg",
          },
          error: {
            className:
              "font-sniglet text-2xl w-full !bg-red-600 !text-white !rounded-lg",
          },
        }}
      >
        {(t) => (
          <ToastBar toast={t}>{({ message }) => <>{message}</>}</ToastBar>
        )}
      </Toaster>
      <GameStateProvider>
        <Grid columns={"1"} rows={"auto 1fr auto"} height={"100vh"}>
          <Header />
          <Outlet />
          <Footer />
        </Grid>
      </GameStateProvider>
    </>
  );
};

export { App };
