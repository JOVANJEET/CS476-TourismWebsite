const MainPage = require("../model/mainpage");
const Package = require("../model/package");
exports.getMainPage = async (req, res, next) => {
  let logintype = "none";
  if (req.session.isAdminLoggedIn) {
    logintype = "admin";
  } else if (req.session.isLoggedIn) {
    logintype = "guide";
  } else if (req.session.isTouristLoggedIn) {
    logintype = "tourist";
  }
  const trendingBlogs = await Package.find({
    status: "approved",
  })
    .sort({ packageViews: -1 })
    .limit(4)
    .exec();
  MainPage.find()
    .then((mainpage) => {
      res.render("pages/landingPage", {
        mainpage: mainpage,
        packages: trendingBlogs,
        logintype: logintype,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
