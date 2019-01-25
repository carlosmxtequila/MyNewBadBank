// setup server
// YOUR CODE


var express = require('express');
var app     = express();
var low     = require('lowdb');
var fs      = require('lowdb/adapters/FileSync');
var adapter = new fs('db.json');
var db      = low(adapter);



// configure express to serve static files from public directory
// ------------------------------------------------------------------
app.use(express.static('public'));

// allow Cross-Origin Resource Sharing (CORS)
var cors = require('cors');
app.use(cors());

// init the data store
db.defaults({ posts: []}).write();

// list posts
//app.get('/data', function(req, res){
//
//    res.send(db.get('posts-guia').value());
//
//});

// ----------------------------------------------------
// add post - test using:
//      curl http://localhost:3000/posts/ping/1/false
// ----------------------------------------------------
app.get('/posts/:email/:usr/:name/:timstamp ', function(req, res){

    var post = {
        "title" : req.params.title,
        "id"    : req.params.id,
        "published" : req.params.published,
        "guia" : req.params.guia
    };
    db.get('posts').push(post).write();
  
    res.send(db.get('posts').value());
});
// ----------------------------------------------------
// Create entry by id - test using:
//      curl http://localhost:3000/account/...
// ----------------------------------------------------
app.get('/account/create/posts/:table_name/:email/:name/:password/:rec_status/:rec_stampUTC', function (req, res) {
    // Create account route
    // return success or failure string
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
// Create entry by id - test using:
//      curl http://localhost:3000/account/...
// ----------------------------------------------------
app.get('/account/login/:table_name/:email/:rec_stampUTC', function (req, res) {
    // Create account route
    // return success or failure string
    var accountinfo = {
        "table_name"    :req.params.table_name,
        "email"         :req.params.email,
        "rec_stampUTC"  :req.params.rec_stampUTC
    };

   
    db.get('posts').push(accountinfo).write();
    
});
//2019-01-09 -ini-
// ----------------------------------------------------
// Create entry by id - test using:
//      curl http://localhost:3000/account/...
// ----------------------------------------------------
app.get('/account/create/data/:table_name/:email/:rec_status', function (req, res) {
    // Create account route
    // return success or failure string
    var accountinfo = {
        "table_name"    :req.params.table_name,
        "email"         :req.params.email,
        "rec_status"    :req.params.rec_status
    };



// PENDIENTE FUNCION FINDS ENERO10 20HRS

      res.send(db.get('posts')
      .filter({table_name: req.params.table_name,email: req.params.email, rec_status: req.params.rec_status})
      .value());


});
//2019-01-09 -end-
// ----------------------------------------------------
// filter by published state - test using:
//      curl http://localhost:3000/published/true
// ----------------------------------------------------
app.get('/published/:boolean', function(req, res){

    // YOUR CODE

});

// ----------------------------------------------------
// update published value - test using:
//      curl http://localhost:3000/published/1/true
// ----------------------------------------------------
app.get('/published/:id/:boolean', function(req, res){

    // YOUR CODE

});

// ----------------------------------------------------
// delete entry by id - test using:
//      curl http://localhost:3000/delete/5
// ----------------------------------------------------
app.get('/delete/:id/', function(req, res){

    // YOUR CODE

});

// start server
// -----------------------
app.listen(3000, function(){
    console.log('MyBadBank running on port 3000');
});

// setup directory used to serve static files
// YOUR CODE

// setup data store
// YOUR CODE

// required data store structure
// YOUR CODE
/*
{
    accounts:[
        {name        : '',
         email       : '',
         balance     : 0,
         password    : '',
         transactions: []}
    ]
}
*/


app.get('/account/create/data/:table_name/:email/:password/:rec_status', function (req, res) {

    // YOUR CODE
    // Login user - confirm credentials
    // If success, return account object
    // If fail, return null
// Create account route
    // return success or failure string
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

app.get('/account/get/:table_name/:email/:rec_status', function (req, res) {

    // YOUR CODE
    // Return account based on email
        var accountinfo = {
        "table_name"    :req.params.table_name,
        "email"         :req.params.email,
        "rec_status"    :req.params.rec_status
    };

});



app.get('/account/deposit/:table_name/:email/:amount/:balance/:rec_type/:rec_stampUTC', function (req, res) {

    // YOUR CODE
    // Deposit amount for email
    // return success or failure string
    var accountdeposit = {
        "table_name"    :req.params.table_name,
        "email"         :req.params.email,
        "amount"       :req.params.amount,
        "balance"       :req.params.balance,
        "rec_type"      :req.params.rec_type,        
        "rec_stampUTC"  :req.params.rec_stampUTC
    };

    db.get('posts').push(accountdeposit).write();

    res.send(db.get('posts').value());
});

app.get('/account/withdraw/:table_name/:email/:amount/:balance/:rec_type/:rec_stampUTC', function (req, res) {

    // YOUR CODE
    // Withdraw amount for email
    // return success or failure string
    var accountwithdraw = {
        "table_name"    :req.params.table_name,
        "email"         :req.params.email,
        "amount"       :req.params.amount,
        "balance"       :req.params.balance,
        "rec_type"      :req.params.rec_type,
        "rec_stampUTC"  :req.params.rec_stampUTC
    };

    db.get('posts').push(accountwithdraw).write();
 
    res.send(db.get('posts').value());    
});

app.get('/account/transactions/:email', function (req, res) {

    // YOUR CODE
    // Return all transactions for account
});

// ----------------------------------------------------
// Create CURRENT BALANCE:
//      curl http://localhost:3000/account/...
// ----------------------------------------------------
app.get('/currentbalance/get/:email/:rec_type', function (req, res) {
    // Create account route
    // return success or failure string
    var accountinfo = {
        "email"     :req.params.email,
        "rec_type"  :req.params.rec_type
    };

res.send(db.get('posts')
        .filter({email: req.params.email, rec_type: req.params.rec_type})
        .last()
        .value());


});

app.get('/account/all/:email', function (req, res) {

    // YOUR CODE
    // Return data for all accounts
        // Create account route
    // return success or failure string
    var accountinfo = {
        "email"     :req.params.email
    };


// PENDIENTE FUNCION FINDS ENERO10 20HRS
        
res.send(db.get('posts')
        .filter({email: req.params.email})
//        .sort('rec_stampUTC')
        .value());
});
