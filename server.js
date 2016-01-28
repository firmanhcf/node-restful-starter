#!/bin/env node
//  OpenShift sample Node application
//# DEPENDENCY
var express  = require('express');
var fs       = require('fs');
var mongoose = require('mongoose');
var path     = require('path');
var _        = require('underscore');
var multer  = require('multer');

//# VARIABLE INITIALIZATION
var url      = '127.0.0.1:27017/databasename';

/**
 *  Define the sample application.
 */
var App = function() {

    //  Scope.
    var self = this;


    /*  ================================================================  */
    /*  Helper functions.                                                 */
    /*  ================================================================  */

    /**
     *  Set up server IP address and port # using env variables/defaults.
     */
    self.setupVariables = function() {

        self.ipaddress = "127.0.0.1";
        self.port      = 8080;

    };


    /**
     *  Populate the cache.
     */
    self.populateCache = function() {
        
    };


    /**
     *  Retrieve entry (content) from cache.
     *  @param {string} key  Key identifying content to retrieve from cache.
     */
    self.cache_get = function(key) { return self.zcache[key]; };


    /**
     *  terminator === the termination handler
     *  Terminate server on receipt of the specified signal.
     *  @param {string} sig  Signal to terminate on.
     */
    self.terminator = function(sig){
        if (typeof sig === "string") {
           console.log('%s: Received %s - terminating sample app ...',
                       Date(Date.now()), sig);
           process.exit(1);
        }
        console.log('%s: Node server stopped.', Date(Date.now()) );
    };


    /**
     *  Setup termination handlers (for exit and a list of signals).
     */
    self.setupTerminationHandlers = function(){
        //  Process on exit and signals.
        process.on('exit', function() { self.terminator(); });

        // Removed 'SIGPIPE' from the list - bugz 852598.
        ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
         'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
        ].forEach(function(element, index, array) {
            process.on(element, function() { self.terminator(element); });
        });
    };


    /*  ================================================================  */
    /*  App server functions (main app logic here).                       */
    /*  ================================================================  */

    /**
     *  Create the routing table entries + handlers for the application.
     */
    self.createRoutes = function(app, controller) {
        require('./app/routes')(app, controller);
    };


    /**
     *  Initialize the server (express) and create the routes and register
     *  the handlers.
     */
    self.initializeServer = function() {
        //# APP INITIALIZATION
        self.app = express.createServer();
        self.app.use(multer({}));
        self.app.use(express.bodyParser());
        
        //# DB CONNECTION
        var db = mongoose.connect(url);
        mongoose.connection.once('connected', function() {
            console.log("Database connected successfully")
        });

        self.app.config  = require('./app/config')(self.app,fs,path,_,mongoose);
        self.app.helpers = require('./app/helpers')(self.app,fs,path,_,mongoose);
        self.app.models  = require('./app/models')(self.app,fs,path,_,mongoose);
        self.controller  = require('./app/controllers')(self.app,fs,path,_,mongoose);
        self.createRoutes(self.app, self.controller);
    };


    /**
     *  Initializes the sample application.
     */
    self.initialize = function() {
        self.setupVariables();
        self.populateCache();
        self.setupTerminationHandlers();

        // Create the express server and routes.
        self.initializeServer();
    };


    /**
     *  Start the server (starts up the sample application).
     */
    self.start = function() {
        //  Start the app on the specific interface (and port).
        self.app.listen(self.port, self.ipaddress, function() {
            console.log('%s: Node server started on %s:%d ...',
                        Date(Date.now() ), self.ipaddress, self.port);
        });

        // // if our user.js file is at app/models/user.js
        // var User = require('./app/models/user');
          
        // // create a new user called chris
        // var chris = new User({
        //   name: 'Chris',
        //   username: 'sevilayha',
        //   password: 'password' 
        // });

        // chris.save(function(err) {
        //   if (err) throw err;

        //   console.log('User saved successfully!');
        // });
    };

};   /*  Sample Application.  */



/**
 *  main():  Main code.
 */
var zapp = new App();
zapp.initialize();
zapp.start();

