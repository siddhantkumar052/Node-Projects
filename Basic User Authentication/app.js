const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const static = express.static(__dirname + '/public');
const session = require('express-session')
const configRoutes = require('./routes');


app.use('/public', static);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(session({
  name: 'AuthCookie',
  secret: 'some secret string!',
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 60000}
}));


configRoutes(app);

app.listen(3000, () => {
  console.log("Server is started");
  console.log('Your routes will be running on http://localhost:3000');
});