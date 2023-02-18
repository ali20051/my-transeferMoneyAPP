const express    = require("express");
const path       = require("path");
const bodyParser = require("body-parser");
const app        = express();
const PORT = process.env.PORT || 3030;

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

const userData = {
  user: "Ali El",
  displayName: "Ali",
  amount: 5000000,
  history: [
    {
      where: "Wallmart",
      transactionNumber: 125,
    },
    {
      where: "ma7ale sa3ada",
      transactionNumber: 8763949341992,
    },
    {
      where: "tran",
      transactionNumber: 4536372876392,
    },
    {
      where: "jawaze",
      transactionNumber: 341992,
    },
    {
      where: "send mony to Bakkali Mohamed",
      transactionNumber: 4992,
    },
  ],
};
// the root 
app.get('/', (req , res) => {
     res.send('Still Working On It...')
});

app.get('/dashboard', (req , res) => {
   res.render("dashboard", { title: "dashboard", username: userData.displayName, amount: userData.amount, historys: userData.history });
});

app.get('/login', (req , res) => {
    res.render('login', {title: 'Login'});
});

app.get('/send', (req , res) => {
    res.render('send', { title: "send"});
});
app.post('/send', (req , res) => {
   function send(){
    const date = new Date();
    const tr = date.getMilliseconds();
      userData.history.unshift({
        where: `send to ${req.body.phonenumber} the amount of ${req.body.amount}DH`,
        transactionNumber: tr
      });
      const sendamount = userData.amount - req.body.amount;
      userData.amount = sendamount;
   };
   send();
   res.redirect('/dashboard');
});












app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
