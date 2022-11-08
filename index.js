const flash = require("express-flash");
const session = require("express-session");
const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
// const myWaiterRoutes = require("./routes/waiter");
const myWaiter = require("./shoes");


const pgp = require("pg-promise")();
const app = express();

let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
  useSSL = true;
}

const DATABASE_URL =
  process.env.DATABASE_URL ||
  "postgresql://bunny:pg123@localhost:5432/shoes_api";

const config = {
  connectionString: DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
};

const db = pgp(config);

const sneakers = shoes(db);
// const regWaiters = myWaiterRoutes(waiters)




app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(
  session({
    secret: "using session http",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(flash());
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());





app.get("/", function(req, res){
  
  res.render("index")
})

//registering
app.post("/register",async function(req, res){
  let usernames =req.body.uname.charAt(0).toUpperCase() + req.body.uname.slice(1).toLowerCase();
  let mails = req.body.email
  let letters = /^[a-z A-Z]+$/;
  let results = (await waiters.Details(usernames,mails)) !== null

  if (results) {
    req.flash("error", `${usernames}, YOUR NAME IS ALREADY HAVE A CODE `);
  } else if (letters.test(usernames) == false) {
    req.flash("error", `PLEASE USE ALPHABETS ONLY`);
  } else {
    const code = uid();
    await waiters.customerDetails(usernames,mails, code);
    req.flash("output", "PLEASE SAVE YOUR CODE" + " " + " : " + " " + code);
  }

  res.redirect("registered")
})

app.get("/registered",async function(req, res){

res.render("registered")
})
//ending registering request

//login 
app.post("/signIn",async function(req, res){

  res.redirect("login")
})

app.get("/signIn",async function(req, res){

  res.render("login")
})

//ending login
const PORT = process.env.PORT || 3020;
app.listen(PORT, function () {
  console.log("APP STARTED AT PORT", PORT);
});