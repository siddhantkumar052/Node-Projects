const session = require('express-session')
const data = require('../data');
const userData = data.user;

const exportMethod = (app) => {

  const logger = async (request, responce, next) => {
    console.log(`[${new Date().toUTCString()}]: ${request.method}\t${request.originalUrl}\t\t${!!request.session.user ? 'Authenticated' : 'Not Authenticated'}`);
    next()
  };
  app.use(logger);
  
  app.get('/', async (request, responce) => {
    try {
      if (!!request.session.user) {
        responce.redirect('/private')
      } else {
        responce.render('login', { title: "Login" })
      }
    } catch (e) {
      responce.sendStatus(500);
    }
  });


  app.get('/private', async (request, responce, next) => {

    try {
      responce.render('private', { title: "Private", user: request.session.user })
    } catch (error) {
      responce.sendStatus(500);
    }

  });

  app.post('/login', async (request, responce) => {
    try {
      if (!!request.session.user) {
        responce.redirect('/private')
      }
      const username = request.body['username'];
      const password = request.body['password'];

      let data = await userData.checkUser(username, password);


      if (data.authenticated) {
        request.session.user = { username: username };
        responce.redirect('private')
      } 
    } catch (e) {
      
      responce.status(400);
      responce.render('login', { error: e });
    }

  });

  app.get('/signup', async (request, responce) => {

    try {
      if (!!request.session.user) {
        responce.redirect('/private')
      } else {
        responce.render('signup', { title: "Signup" })
      }
    } catch (e) {
      responce.status(400);
    }

  });


  app.post('/signup', async (request, responce) => {
    try {
      if (!!request.session.user) {
        responce.redirect('/private')
      }
      const username = request.body['username'];
      const password = request.body['password'];

      let data = await userData.createUser(username, password);


      if (data.userInserted) {
        responce.redirect('/')
      } 
    } catch (e) {
      responce.status(400);
      responce.render('signup', { error: e });
    }

  });

 
  app.get('/logout', function (request, responce) {
    try {
      request.session.destroy();
      responce.render('logout', { title: "Logout" })

    } catch (e) {
      responce.status(400);
    }

  });

 

  
  
  app.use("*", (request, responce) => {
    responce.status(404).json({ error: "There are no any route found" });
  });

};

module.exports = exportMethod;
