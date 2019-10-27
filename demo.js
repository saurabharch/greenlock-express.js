"use strict";

var Greenlock = require("./");
var greenlockOptions = {
	cluster: false,

	serverId: "bowie.local",
	servername: "foo-gl.test.utahrust.com",
	maintainerEmail: "greenlock-test@rootprojects.org",

	/*
  manager: {
    module: "greenlock-manager-sequelize",
    dbUrl: "postgres://foo@bar:baz/quux"
  }
  */

	challenges: {
		"dns-01": {
			module: "acme-dns-01-digitalocean"
		}
	}
};

Greenlock.create(greenlockOptions)
	.worker(function(glx) {
		console.info();
		console.info("Hello from worker");

		glx.serveApp(function(req, res) {
			res.end("Hello, Encrypted World!");
		});
	})
	.master(function() {
		console.log("Hello from master");
	});