// SETUP SERVER
//************************************//
var express = require('express');
var app     = express();
var low     = require('lowdb');
var fs      = require('lowdb/adapters/FileSync');
var adapter = new fs('db.json');
var db      = low(adapter);
// Configure EXPRESS to serve static files from public directory
// ------------------------------------------------------------------
app.use(express.static('public'));

// allow Cross-Origin Resource Sharing (CORS)
var cors = require('cors');
app.use(cors());

// Init the data store
db.defaults({ posts: []}).write();

// ----------------------------------------------------
// Configure Port
// ----------------------------------------------------
app.listen(3000, function(){
    console.log('MyBadBank running on port 3000');
});
// ----------------------------------------------------
// Service to create an account with its stamp
// ----------------------------------------------------
app.get('/account/create/posts/:table_name/:email/:name/:password/:rec_status/:rec_stampUTC', function (req, res) {

    var accountinfo = {
        "table_name"    :req.params.table_name,
        "email"         :req.params.email,
        "name"          :req.params.name,
        "password"      :req.params.password,
        "rec_status"    :req.params.rec_status,
        "rec_stampUTC"  :req.params.rec_stampUTC
    };
    db.get('posts').push(accountinfo).write();
    res.send(db.get('posts').value());
});
// ----------------------------------------------------
// Confirm Login
// ----------------------------------------------------
app.get('/account/login/data/:table_name/:email/:password/:rec_status', function (req, res) {

    var accountinfo = {
        "table_name"    :req.params.table_name,
        "email"         :req.params.email,
        "password"      :req.params.password,
        "rec_status"    :req.params.rec_status
    };
      res.send(db.get('posts')
      .filter({table_name: req.params.table_name,email: req.params.email,password: req.params.password, rec_status: req.params.rec_status})
      .value());
});
// ----------------------------------------------------
// Get CURRENT BALANCE
// ----------------------------------------------------
app.get('/currentbalance/get/:email/:rec_type', function (req, res) {

    var accountinfo = {
        "email"     :req.params.email,
        "rec_type"  :req.params.rec_type
    };

    res.send(db.get('posts')
            .filter({email: req.params.email, rec_type: req.params.rec_type})
            .last()
            .value());
});
// ----------------------------------------------------
// Create record for apply operations
// ----------------------------------------------------
app.get('/account/applyop/:table_name/:email/:amount/:balance/:rec_type/:rec_stampUTC', function (req, res) {

    var r_operation = {
        "table_name"    :req.params.table_name,
        "email"         :req.params.email,
        "amount"        :req.params.amount,
        "balance"       :req.params.balance,
        "rec_type"      :req.params.rec_type,        
        "rec_stampUTC"  :req.params.rec_stampUTC
    };

    db.get('posts').push(r_operation).write();

    res.send(db.get('posts').value());
});
// ----------------------------------------------------
// Get a full set de information about the account
// ----------------------------------------------------
app.get('/account/all/:email', function (req, res) {

    var accountinfo = {
        "email"     :req.params.email
    };
        
    res.send(db.get('posts')
            .filter({email: req.params.email})
            .value());
});
// ----------------------------------------------------
// Verify the account
// ----------------------------------------------------
app.get('/account/get/data/:table_name/:email/:rec_status', function (req, res) {
    // Create account route
    // return success or failure string
    var accountinfo = {
        "table_name"    :req.params.table_name,
        "email"         :req.params.email,
        "rec_status"    :req.params.rec_status
    };

      res.send(db.get('posts')
      .filter({table_name: req.params.table_name,email: req.params.email, rec_status: req.params.rec_status})
      .value());
});