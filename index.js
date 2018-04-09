const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Routes = require('./routes');
const port = process.env.PORT || 3000;

app.use(bodyParser.json({limit: '20mb'}));
app.use(bodyParser.urlencoded({limit: '20mb', extended: true}));

app.use('/', ...Routes);

app.listen(port, () => {
  let start = new Date();
  console.log('----------------------------------------------------')
  console.log(' API running in port: '+port+ '!');
  console.log(' start at : '+start);
  console.log('----------------------------------------------------')
});
