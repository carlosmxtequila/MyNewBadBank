
var express = require('express');
var app     = express();
var low     = require('lowdb');
var fs      = require('lowdb/adapters/FileSync');
var adapter = new fs('db.json');
var db      = low(adapter);
var table_name = '';
var ind_transaction = '';
var ind_trx = false;
var current_balance = 0;
var message_out = '';

//**----------------------------------------------------------------------------------------**//
//**                   COFIRM CREDENTIALS (EMAIL & PASSW ARE REQUIRED)                      **//
//**----------------------------------------------------------------------------------------**//
function login() {
    
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var table_name = 'Account'
    var rec_status = 'Active';
    
    if (email == null || email == '' || password == null || password == ''){
        message_out = ("Account and Password are required.");
        document.getElementById("msg").innerHTML = message_out;
    }else{
        var url = '/account/login/data/' 
                + table_name + '/' 
                + email + '/'
                + password + '/'
                + rec_status

                superagent
                    .get(url)
                    .end(function(err, res){
                        if(err){
                            console.log(err);
                            console.log(res.body);
                        }
                        else{
                            status.innerHTML = JSON.stringify(res.status);
                            if (typeof res.body[0] === "undefined" || res.body[0] === null) {
                                message_out = ("Your email and/or password are incorrect.");
                                document.getElementById("msg").innerHTML = message_out;
                            } else {
                                var msg_login = "logged in as: " + "<br>" + email;
                                document.getElementById("userlogin").innerHTML = msg_login;
                                document.getElementById("userlogin").style.font = "oblique 15px arial,serif,underline";
                                var msg_welcome = "Welcome back " + res.body[0].name;
                                document.getElementById("msg").innerHTML = msg_welcome;
                            }    
                        }
                    });
        }
    }

//**----------------------------------------------------------------------------------------**//
//**                ACCOUNT CREATION (EMAIL, NAME & PASSWORD ARE REQUIRED)                  **//
//**----------------------------------------------------------------------------------------**//
function create() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var table_name = 'Account'
    var rec_status = 'Active';
    if (email == null || email == '' || name == null || name == '' || password == null || password == ''){
        message_out = ("Account, Name and Password are required.");
        document.getElementById("msg").innerHTML = message_out;
    }else{        
        var url = '/account/get/data/' 
                + table_name + '/' 
                + email + '/'
                + rec_status

                superagent
                    .get(url)
                    .end(function(err, res){
                        if(err){
                            console.log(err);
                            console.log(res.body);
                        }
                        else{
                            status.innerHTML = JSON.stringify(res.status);
                            if (typeof res.body[0] !== "undefined" && res.body[0] !== null) {
                                message_out = ("This email already have an account.");
                                document.getElementById("msg").innerHTML = message_out;
                            } else {
                                apply_createaccount(email,name,password);
                            }    
                        }
                    });
    
        }
    }
//**----------------------------------------------------------------------------------------**//
//**              CREATE A RECORD FOR NEW ACCOUNT >FULL LIST OF INFO IS REQUIRED<           **//
//**----------------------------------------------------------------------------------------**//
function apply_createaccount(email,name,password){
    var table_name = 'Account';
    var rec_status = 'Active';
    var rec_stampUTC = '1234567890';
    var currentDate = new Date();
    var rec_stampUTC = currentDate.toISOString();
            
    var url = '/account/create/posts/' 
                + table_name + '/'
                + email + '/' 
                + name + '/'
                + password + '/'
                + rec_status + '/'
                + rec_stampUTC;
                                
                superagent
                    .get(url)
                    .end(function(err, res){
                        if(err){
                            console.log(err);
                            console.log(res.body);
                        }else{
                            status.innerHTML = JSON.stringify(res.status);
                            message_out = ("Your Account has been created!");
                            document.getElementById("msg").innerHTML = message_out;
                        } 
                });
    }
//**----------------------------------------------------------------------------------------**//
//**                         BALANCE INQUIRE (EMAIL IS REQUIRED)                            **//
//**----------------------------------------------------------------------------------------**//
function consulta() {
    var email = document.getElementById('email').value;
    var userlogin = document.getElementById('userlogin').innerHTML;
    if (userlogin == null || userlogin == ''){
        message_out = ("You are not connected. Please login.");
        document.getElementById("msg").innerHTML = message_out;
    }else{

        if (email == null || email == ''){
            message_out = ("Account is required.");
            document.getElementById("msg").innerHTML = message_out;
       }else{    
            ind_transaction = 'Balance';
            var url = '/account/get/data/' 
                + 'Account/'
                + email + '/'
                + 'Active'

                superagent
                    .get(url)
                    .end(function(err, res){
                 if(err){
                        console.log(err);
                        console.log(res.body);
                  } else {
                        status.innerHTML = JSON.stringify(res.status);
                        if (typeof res.body[0] === "undefined" || res.body[0] === null) {
                            message_out = ("This account (email) does not exist.");
                          document.getElementById("msg").innerHTML = message_out;
                        } else {

                            if (email == null || email == ''){
                                message_out = ("Account (email) is required.");
                                document.getElementById("msg").innerHTML = message_out;
                            }else{    
                                check_balance(email,0);
                            }
                        }                            
                     }
                });
            }
        }
    }
//**----------------------------------------------------------------------------------------**//
//**                         DEPOSIT (EMAIL & AMOUNT ARE REQUIRED)                          **//
//**----------------------------------------------------------------------------------------**//
function deposit() {
    var email = document.getElementById('emailto').value;
    var amount = document.getElementById('amount').value;
    var balance = 0;
    var rec_type = "OP";
    var userlogin = document.getElementById('userlogin').innerHTML;
    if (userlogin == null || userlogin == ''){
        message_out = ("You are not connected. Please login.");
        document.getElementById("msg").innerHTML = message_out;
    }else{    
        if (email == null || email == '' || amount == null || amount == '' || amount == 0){
            message_out = ("Account and Amount are required.");
            document.getElementById("msg").innerHTML = message_out;
       }else{    
            ind_transaction = 'Deposit';
            var url = '/account/get/data/' 
                + 'Account/'
                + email + '/'
                + 'Active'

                superagent
                    .get(url)
                    .end(function(err, res){
                 if(err){
                        console.log(err);
                        console.log(res.body);
                  } else {
                        status.innerHTML = JSON.stringify(res.status);
                        if (typeof res.body[0] === "undefined" || res.body[0] === null) {
                            message_out = ("This account (email) does not exist.");
                          document.getElementById("msg").innerHTML = message_out;
                        } else {
                            table_name = 'Deposit'; 
                            check_balance(email,amount);
                        }
                    }
             });
         }
        }
    }
//**----------------------------------------------------------------------------------------**//
//**             CHECK BALANCE (GET THE CURRENT BALANCE TO BE USED FOR OTHER OPS)           **//
//**                  IT CALLS "APPLY OP" FOR WITHDRAW, DEPOSIT OR TRANSFER                 **//
//**----------------------------------------------------------------------------------------**//
function check_balance(email,amount){
    var rec_type = 'OP';
    var num_parts =0;

    var url = '/currentbalance/get/' 
                + email + '/'
                + rec_type

                superagent.get(url)
                .end(function(err, res){

                     if(err){
                        console.log(err);
                        console.log(res.body);
                    } else {
                        if (typeof res.body === "undefined" || res.body === null) {
                            current_balance = 0;
                        }else {
                            current_balance = res.body.balance;
                        }
                      
                        if (ind_transaction == "Deposit"){
                            balance = Number(current_balance) + Number(amount);
                        }else{
                            balance = Number(current_balance) - Number(amount);
                        }
                        
                        if (Number(balance) < 0){
                            message_out = ('There is not enough funds for this operation');
                            document.getElementById("msg").innerHTML = message_out;
                        }else{
                            if (ind_transaction == "Deposit" || ind_transaction == "Withdraw" ){  
                                apply_operation(ind_transaction,email,amount,balance,rec_type);
                            } else{
                                original_amount = balance; 
                                num_parts = original_amount.toString().split(".");
                                num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        
                                var text = document.createTextNode(num_parts);
                                var msg_balance = 'The current balance is: $'+ text.data;
                                document.getElementById("msg").innerHTML = msg_balance;
                            }
                        }
                    }
                });        
      }
//**----------------------------------------------------------------------------------------**//
//**           APPLY OP -IT CREATES THE RECORD FOR DEPOSIT/WITHDRAW/BOTH(TRANSFERS)-        **//
//**----------------------------------------------------------------------------------------**//
function apply_operation(table_name,email,amount,balance,rec_type){
    var currentDate = new Date();
    var rec_stampUTC = currentDate.toISOString();
    
    var url = '/account/applyop/' 
                + table_name + '/' 
                + email + '/'
                + amount + '/'
                + balance + '/'
                + rec_type + '/'
                + rec_stampUTC;
                
                superagent
                    .get(url)
                    .end(function(err, res){
                        if(err){
                            console.log(err);
                            console.log(res.body);
                        }else{
                            status.innerHTML = JSON.stringify(res.status);
                            if (ind_trx && table_name == 'Withdraw'){
                                deposit();
                            }else{
                                if (ind_trx) {
                                    message_out = "Your Transaction has completed!";
                                    ind_trx = false;
                                }else{
                                    if (ind_transaction == 'Deposit'){
                                        message_out = "Your Deposit has completed!";
                                    }else{
                                        message_out = "Your Withdraw has completed!";
                                    }
                                }
                                document.getElementById("msg").innerHTML = message_out;
                            }
                        }
                });
        }
//**----------------------------------------------------------------------------------------**//
//**                       WITHDRAW -EMAIL(FROM) & AMOUNT ARE REQUIRED-                     **//
//**----------------------------------------------------------------------------------------**//
function withdraw() {
    var email = document.getElementById('emailfrom').value;
    var amount = document.getElementById('amount').value;
    var balance = 0;
    var rec_type = "OP";
    var userlogin = document.getElementById('userlogin').innerHTML;
    if (userlogin == null || userlogin == ''){
        message_out = ("You are not connected. Please login.");
        document.getElementById("msg").innerHTML = message_out;
    }else{
        if (email == null || email == '' || amount == null || amount == '' || amount == 0){
            message_out = ("Account and Amount are required.");
            document.getElementById("msg").innerHTML = message_out;
        }else{    
            ind_transaction = 'Withdraw';
            var url = '/account/get/data/' 
                    + 'Account/'
                    + email + '/'
                    + 'Active'
  
                    superagent
                        .get(url)
                        .end(function(err, res){
                            if(err){
                                console.log(err);
                                console.log(res.body);
                            }else{
                                status.innerHTML = JSON.stringify(res.status);
                                if (typeof res.body[0] === "undefined" || res.body[0] === null) {
                                   message_out = "This account (email) does not exist.";
                                   document.getElementById("msg").innerHTML = message_out;
                                }else{
                                    check_balance(email,amount);
                                }
                            }
                    });
            }
        }    
    }
//**----------------------------------------------------------------------------------------**//
//**      TRANSACTIONS -CAPABILITY TO TRANSFER AN AMOUNT FROM AN ACCOINT TO ANOTHER-        **//
//**----------------------------------------------------------------------------------------**//            
function transactions() {
    var userlogin = document.getElementById('userlogin').innerHTML;
    if (userlogin == null || userlogin == ''){
        message_out = ("You are not connected. Please login.");
        document.getElementById("msg").innerHTML = message_out;
    }else{
        var emailfrom = document.getElementById('emailfrom').value;
        var emailto = document.getElementById('emailto').value;
        var amount = document.getElementById('amount').value;
        if (emailfrom == null || emailfrom == '' || emailto == null || emailto == '' || amount == null || amount == '' || amount == 0){
            message_out = ("Accounts (from and to) and Amount are required.");
            document.getElementById("msg").innerHTML = message_out;
        }else{    
            ind_trx = true;
            withdraw();   
        }
    }
}
//**----------------------------------------------------------------------------------------**//
//**   ALL DATA >EMAIL IS REQUIRED, IT SHOWS ACCOUNT DATA + THE FULL LIST OF OPERATIONS<    **//
//**----------------------------------------------------------------------------------------**//
function allData() {
    var email = document.getElementById('email').value;
    var original_amount = 0;
    var num_parts =0;
    var userlogin = document.getElementById('userlogin').innerHTML;
    if (userlogin == null || userlogin == ''){
        message_out = ("You are not connected. Please login.");
        document.getElementById("msg").innerHTML = message_out;
    }else{
        if (email == null || email == ''){
            message_out = ("Account is required.");
            document.getElementById("msg").innerHTML = message_out;
      }else{    

            var url = '/account/all/' 
                    + email
            
                    superagent
                        .get(url)
                        .end(function(err, res){
                            if(err){
                                console.log(err);
                                console.log(res.body);
                             }else{
                                status.innerHTML = JSON.stringify(res.status);
                                if (typeof res.body[0] === "undefined" || res.body[0] === null) {
                                    message_out = "This account (email) does not exist.";
                                    document.getElementById("msg").innerHTML = message_out;
                                } else {
                                    var i=0;
                                    var top = 0;
                                    var text = '';
                                    top = res.body.length;
                                    message_out = "Account (email): " + res.body[0].email + "<br>" + "Name: " + res.body[0].name + "<br>";
                                    document.getElementById("msg").innerHTML = message_out;
                                    for (i = 0; i < top; i++) {
                                        var table = document.createElement('table');
                                        table.setAttribute('border','1');
                                        var row = table.insertRow(0);
//**-------------------- INSERT COLUMN OF TIMESTAMP --------------------**//                                    
                                        if (i==0){
                                            var text = document.createTextNode('Time - Date');    
                                        } else {
                                            var text = document.createTextNode(res.body[i].rec_stampUTC.slice(0, 16));
                                        }
                                        var cell = row.insertCell(0);
                                        cell.setAttribute('align','center')
                                        cell.setAttribute('width', '120px');
                                        cell.appendChild(text);
//**-------------------- INSERT COLUMN OF TYPE OF OPERATION --------------------**//
                                        if (i==0){
                                            var text = document.createTextNode('Movement');    
                                        } else {
                                            var text = document.createTextNode(res.body[i].table_name);
                                        }
                                        var cell = row.insertCell(1);
                                        cell.setAttribute('align','center')
                                        cell.setAttribute('width', '120px');
                                        cell.appendChild(text);
//**-------------------- INSERT COLUMN OF AMOUNT --------------------**//                                    
                                        if (i==0){
                                            var text = document.createTextNode('Amount');    
                                        } else {
                                            original_amount = res.body[i].amount; 
                                            num_parts = original_amount.toString().split(".");
                                            num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                            var text = document.createTextNode(num_parts);
                                        }   
                                        var cell = row.insertCell(2);
                                        cell.setAttribute('align','center')
                                        cell.setAttribute('width', '120px');
                                        cell.appendChild(text);
//**-------------------- INSERT COLUMN OF CUMULATIVE BALANCE --------------------**//
                                        if (i==0){
                                            var text = document.createTextNode('Last Balance');    
                                        } else {
                                            original_amount = res.body[i].balance; 
                                            num_parts = original_amount.toString().split(".");
                                            num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                            var text = document.createTextNode(num_parts);
                                        }
                                        var cell = row.insertCell(3);
                                        cell.setAttribute('align','center')
                                        cell.setAttribute('width', '120px');
                                        cell.appendChild(text);
//**-------------------- INSERT FULL ROW --------------------**//
                                       document.getElementById("tdetails").appendChild(table);
                                    }
                                } 
                            }
                    });
            }
        }            
    }