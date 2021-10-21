var express = require('express');
var router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// register
router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, email, password, cpassword } = req.body;

    // validation
    if (!firstName || !lastName || !email || !password || !cpassword)
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields." });

    if (password.length < 6)
      return res
        .status(400)
        .json({ errorMessage: "Please enter a password with at least 6 characters." });

    if (password !== cpassword)
      return res
        .status(400)
        .json({ errorMessage: "Please enter the same password twice." });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({
        errorMessage: "An account with this email already exists."
      });


    // hash the password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // save a new user account to the db
    const newUser = new User({
      firstName, lastName, email, passwordHash
    });

    const savedUser = await newUser.save();

    // log the user in
    // create a token
    const JWT_SECRET = "q*hpj>5s{>Sx(x`pS'c_Yn8y_u[#]hA:G@e5=_X=7##3B@]zQ^";

    const token = jwt.sign({
      user: savedUser._id
    }, JWT_SECRET);

    // send the token in a HTTP-only cookie

    res.cookie("token", token, {
      httpOnly: true,
    })
      .send();

  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});


// log in
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password)
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields." });

    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res
        .status(401)
        .json({ errorMessage: "Wrong email or password." });

    const passwordCorrect = await bcrypt.compare(password, existingUser.passwordHash);
    if (!passwordCorrect)
      return res
        .status(401)
        .json({ errorMessage: "Wrong email or password." });

    // sign the token
    const JWT_SECRET = "q*hpj>5s{>Sx(x`pS'c_Yn8y_u[#]hA:G@e5=_X=7##3B@]zQ^";

    const token = jwt.sign({
      user: existingUser._id
    }, JWT_SECRET);

    // send the token in a HTTP-only cookie

    res.cookie("token", token, {
      httpOnly: true,
    })
      .send();

  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

// logging out
router.get("/logout", (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0)
  })
    .send();
});

// checking if user is logged in
router.get("/loggedIn", (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.json(false);

    const JWT_SECRET = "q*hpj>5s{>Sx(x`pS'c_Yn8y_u[#]hA:G@e5=_X=7##3B@]zQ^";
    jwt.verify(token, JWT_SECRET);
    res.send(true);
  } catch (err) {
    res.json(false);
  }
});


module.exports = router;
