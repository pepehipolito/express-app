const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

// Register where partials are stored.
hbs.registerPartials(__dirname + '/views/partials');

// Register a helper (to be used from partials/pages: {{getCurrentYear}} - notice no parenthesis).
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

// Register a helper that accepts arguments. Examples:
//    {{screamIt welcomeMessage}}   // where 'welcomeMessage' is a value.
//    {{screamIt 'my text'}}        // where "'my text'" is a string.
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

// Add some configuration to the server's app. Here we're telling to use the hbs engine for views.
app.set('view engine', 'hbs');


// MIDDLEWARE.
//    Executes in the sequence it is declared.
app.use((req, res, next) => {
  const now = new Date().toString();
  const log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err)
      console.log('Unable to append to server.log.');
  });
  next();
});

// Just put the application in maintenance mode.
// app.use((_, res) => {
//   res.render('maintenance.hbs');
// })

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to the Home Page'
  });
});

app.get('/about', (req, res) => {
  // res.send('About Page');
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to fulfill request'
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Projects Page'
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
