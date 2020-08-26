const serverinfo = require("./serverinfo");

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = serverinfo.PORT;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;

mongoose.connect(serverinfo.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MONGODB connected'))
    .catch(e => console.error(e));

app.use('/device', require('./routes/device'));
app.use('/user', require('./routes/user'));

app.listen(port, () => console.log('API started on', port));