if (process.env.NODE_ENV != "production") {
  require('dotenv').config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const expressError = require("./utils/expressError.js");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/users.js");
const { isLoggedIn } = require("./middleware.js")

const listingRouter = require("./routes/listings.js");
const reviewRouter = require("./routes/reviews.js");
const userRouter = require("./routes/users.js");

app.engine('ejs', ejsMate);
app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, "public")));

const dburl = process.env.ATLASDB_URL;
main()
  .then(() => {
    console.log("connected to mongo database")
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(dburl);
}

app.listen(8080, () => {
  console.log("listening the port carefully");
})

const store = MongoStore.create({
  mongoUrl: dburl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24*3600,
})


const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true
  }
}

store.on("error",()=>{
  console.log("error in MONGO SESSION STORE",err);
});

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
})

// app.get("/demouser",async (req,res)=>{
//   let fakeuser=new User({
//     email: "sdsdfrgrhb",
//     username: "delta3.0",
//   });
//   let newUser=await User.register(fakeuser,"helloworld");
//   res.send(newUser);
// })
app.get("/",(req,res)=>{
  res.redirect("/listings");
})
app.use("/", userRouter);
app.use("/listings", listingRouter);
app.use("/listings/:_id/reviews", reviewRouter);


app.all("*", (req, res, next) => {
  next(new expressError(404, "page not found"));
})

//middleware to catch error
app.use((err, req, res, next) => {
  // console.log(err);
  res.render("./listings/error.ejs", { err });
});


