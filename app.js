const express = require('express'),
	app = express(),
	port = process.env.PORT || 4000,
	mongoose = require('mongoose'),
	Person = require('./models/personModel'),
	bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/PersonDb', { useNewUrlParser: true });

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const routes = require('./routes/personRoutes');
routes(app);

app.listen(port, () => {
	console.log(`Listening on port: ${port} `);
});