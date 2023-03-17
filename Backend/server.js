require("./db/db");
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoDBstore = require("connect-mongodb-session")(session);
const PORT = 5000;
require("dotenv").config();

// Importing Mongoose models
const Guide = require("./model/guide");
const Tourist = require("./model/tourist");

const dbUrl = "mongodb://0.0.0.0:27017/tourist";
const app = express();

// Guide session
const oSessionStore = new MongoDBstore({
  uri: dbUrl,
  collection: "usersessions",
});

// Importing routes
const guideRoute = require("./routes/guide");
const adminRoute = require("./routes/admin");
const touristRoute = require("./routes/tourist");
const publicRoute = require("./routes/publicCon");
const blogRoute = require("./routes/blog");
const packageRoute = require("./routes/package");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use("/profile", express.static("upload/images"));

// Setting up session for guide
app.use(
  session({
    secret: "Guide and Tourist is awesome",
    resave: false,
    saveUninitialized: false,
    store: oSessionStore,
  })
);

// Middleware to check if guide is authenticated
app.use((req, res, next) => {
  if (!req.session.guide) {
    return next();
  }
  Guide.findById(req.session.guide._id)
    .then((guide) => {
      req.guide = guide;
      req.isGuideAuth = true;
      next();
    })
    .catch((err) => console.log(err));
});

// Middleware to set local variables for templates
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  next();
});

// Setting up session for tourist
app.use((req, res, next) => {
  if (!req.session.tourist) {
    return next();
  }
  Tourist.findById(req.session.tourist._id)
    .then((tourist) => {
      req.tourist = tourist;
      req.isTouristAuth = true;
      next();
    })
    .catch((err) => console.log(err));
});

// Middleware to set local variables for templates
app.use((req, res, next) => {
  res.locals.isTouristAuthenticated = req.session.isTouristLoggedIn;
  next();
});

// Setting up session for admin
app.use((req, res, next) => {
  if (!req.session.admin) {
    return next();
  }
  req.admin = {
    adminname: process.env.ADMIN_ID,
    adminpass: process.env.ADMIN_PASS,
  };
  next();
});

// Middleware to set local variables for templates
app.use((req, res, next) => {
  res.locals.isAdminAuthenticated = req.session.isAdminLoggedIn;
  next();
});

// Routes setup
app.use(publicRoute);
app.use("/guide", guideRoute);
app.use("/admin", adminRoute);
app.use("/tourist", touristRoute);
app.use(packageRoute);
app.use(blogRoute);

app.get("/guide/booking", (req, res) => {
  res.render("guide/booking_details", {
    guide: req.guide,
    profileImage: false,
  });
});
// Render the all login page when accessed at the appropriate route
app.get("/login_as", (req, res) => {
  res.render("pages/allLogin");
});

// Render the about us page when accessed at the appropriate route
app.get("/about", (req, res) => {
  let logintype = "none";
  if (req.session.isAdminLoggedIn) {
    logintype = "admin";
  } else if (req.session.isLoggedIn) {
    logintype = "guide";
  } else if (req.session.isTouristLoggedIn) {
    logintype = "tourist";
  }
  res.render("pages/aboutus", { admin: req.admin, logintype: logintype });
});

// Render the error 404 page for any route that is not defined above
app.use((req, res) => {
  res.status(404).render("pages/error404");
});

// Start the server and listen for incoming requests on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
