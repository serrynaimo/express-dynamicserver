var express = require('express'),
	evh = require('express-vhost'),
	app = exports.app = express();

var develop = require('./develop/server.js').app,
	feature = function (req, res, next) {
	   var host = req.headers.host.split(':')[0],
	   	branch = host.split('.')[0].toLowerCase();
	   try {
			require('./'+branch+'/server.js').app(req, res, next);
		}
		catch(e) {
			if(e.code === 'MODULE_NOT_FOUND') {
				res.send("Subdomain does not exist", 404);
			}
			else {
				throw e;
			}
		}
	};

evh.register('eds.localhost', develop);
evh.register('*.eds.localhost', feature);

app.use(evh.vhost()).listen(80);

console.log("Server running at http://eds.localhost:80/");

