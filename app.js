const express = require("express");
const app = express();
const PORT = process.env.PORT;
const cors = require("cors");
const { checkeuser, finduserbyid, Signup } = require("./queries");
const homepage = require("./routes/homepage");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { PrismaClient } = require("@prisma/client");
const session = require("express-session");
const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();
const chat = require('./routes/chats')
const acc = require('./routes/account')


app.use(express.static('public'))


app.use(cors());

app.use(
  session({
    secret: process.env.SECRET,
    cookie: {
      maxAge: 604800 * 1000,
      httpOnly: true,
      sameSite: "lax"
    },
    resave: true,
    saveUninitialized: false,
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 2 * 60 * 1000, //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);

app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

app.use("/home", homepage);
app.use('/chat', chat)
app.use('/account', acc)
const customfields = {
  usernameField: "email",
  passwordField: "password",
};

const callback = async (email, password, done) => {
  console.log('emails & passowrd' , email, password)
  const user = await checkeuser(email);
  if (!user) {
   
    return done(null, false, { message: "email not Found" });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return done(null, false, { message: "invalid Password" });
  }
  return done(null, user);
};
const strategy = new LocalStrategy(customfields, callback);
passport.use(strategy);
const functiond = async (userid, done) => {
  const user = await finduserbyid(userid);
  if (!user) {
 
    return done(new Error("usernot found"));
  }
  console.log("NOT X", user);
  return done(null, user);
};
passport.serializeUser((user, done) => {
  return done(null, user.id);
});
passport.deserializeUser(functiond);

app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {

    if (err) return next(err);
    if (!user) {
      return res
        .status(401)
        .json({ message: "Email or Password is incorrect" });
    }
    req.login(user, (err) => {
      if (err) {
      return next(err);
      }
    
      return res.json({ message: "Login successful", user });
    });
  })(req, res, next);
});

app.get("/logout", async (req, res, next) => {
  await req.logout();
  res.json("logged-out");
});

app.post("/signup", async (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const hashedpass = await bcrypt.hash(password, 10);
  const data = await Signup(username, hashedpass, email);
  if (!data.success) {
    return res.json({ message: data.message });
  }
  return res.json({ message: "Signup successful" });
});

// app.use(cors()) // enables all the cors request okah so

app.get("/", (req, res) => {
  //  res.set('Cache-Control', 'max-age=1209600, public must-revalidate') // no-store and no-cache also for shared proxy-revalidate public to always cache private for client side store public is sahred cache ok s-maxage
  res.send("hi");
});

// here just send cache control respective headers using Cache Controls
app.listen(PORT, () => {
  console.log(`listening to Port ${PORT}`);
});



