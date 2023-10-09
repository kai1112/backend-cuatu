require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const app = express();
const session = require("express-session");
console.log(7);
const router = require("./router/index");
const { checkSale } = require("./middleware/checkSale");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.set("views", "views");
app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/views", express.static(path.join(__dirname, "views")));

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);
// điều hướng router
app.use("/", router);

new CronJob("* * * 1 * *", await checkSale(), null, true, "Asia/Ho_Chi_Minh");
app.listen(process.env.PORT || "4000", () => {
  console.log("Server is running: http://localhost:4000");
});
