import "dotenv/config";
import express from "express";
import * as routes from "./routes/routes.js";

const app = express();

app.use("/api/characters", routes.character);
app.use("/api/illustrations", routes.illustration);
app.use("/api/leaderboards", routes.leaderboard);

app.listen(process.env.PORT, (err) => {
  if (err) {
    throw err;
  }

  console.log(`App listening on port ${process.env.PORT}...`);
});
