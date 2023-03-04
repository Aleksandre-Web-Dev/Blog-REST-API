require("dotenv").config();
const express = require("express");
const cors = require("cors");
const serverConfig = require("./configurations/serverConfig.json");
const userRoute = require("./routes/usersRoute");
const postRoute = require("./routes/postRoute");
const DatabaseService = require("./services/dbService");
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(serverConfig.routes.user.route, userRoute);
app.use(serverConfig.routes.post.route, postRoute);

(async () => {
  await DatabaseService.createConnection();
})();
app.listen(port, () => {
  console.log(`Started listening on port ${port}`);
});
