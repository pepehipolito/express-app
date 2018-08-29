To tell nodemon extensions to watch:
  nodemon <filename> -e <ext>,<ext> ...
  example:
    nodemon server.js -e js,hbs
      This will watch for files with extension 'js' and 'hbs' and if changes are made to those the app will be reloaded.
