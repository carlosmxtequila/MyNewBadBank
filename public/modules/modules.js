var ui = {};

ui.navigation = `
<!-- ------------- NAVIGATION (MENU) ------------- -->

<nav class="navbar navbar-expand-sm bg-secondary navbar-dark" style="font-size:120%;">
        <logo class="navbar-brand">
            <a href="#">
              <img src="bank.png" alt="Logo" style="width:100px;" onclick="defaultModule()">
            </a>
        </logo>

<!-- MENU INI  -->
        <ul class="navbar-nav" style="width:1000px; height:50px;">
        <li class="nav-item active">
          <a class="nav-link" href="#" onclick="GoLogin()" >LOGIN </a>
        </li>
        <li class="nav-item active">
          <a class="nav-link" href="#" onclick="GoCreateAccount()" >ACCOUNT</a>
        </li>
        <li class="nav-item active">
          <a class="nav-link" href="#" onclick="GoDeposit()" >DEPOSIT</a>
        </li>
        <li class="nav-item active">
          <a class="nav-link" href="#" onclick="GoWithdraw()" >WITHDRAW</a>
        </li>
        <li class="nav-item active">
          <a class="nav-link" href="#" onclick="GoTransactions()" >TRANSACTION</a>
        </li>
        <li class="nav-item active">
          <a class="nav-link" href="#" onclick="GoBalance()" >BALANCE</a>
        </li>
        <li class="nav-item active">
          <a class="nav-link" href="#" onclick="GoAllData()" >ALL DATA</a>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled" href="#" >       </a>
        </li>
        <li class="nav-item active w3-large">
          <a class="nav-link" href="#" id="userlogin"></a>
        </li>
        </ul>
</nav>
    `;

ui.createAccount = `
    <!-- ------------- ACCOUNT CREATION UI ------------- -->

    <div class="card text-white bg-info mb-3" style="width:400px; margin: 10px 200px 100px 100px;">
    <div class="card-header">ACCOUNT CREATION</div>

    <form>
      <div class="form-group" style="margin: 10px 10px 10px 10px;">
        <label for="email">email:</label>
        <input type="email" placeholder="Enter email" class="form-control" id="email" required>
      </div>
      <div class="form-group" style="margin: 10px 10px 10px 10px;">
        <label for="name">Name:</label>
        <input type="text" placeholder="Enter your name" class="form-control" id="name" required>
      </div>
      <div class="form-group" style="margin: 10px 10px 10px 10px;">
        <label for="password">Password:</label>
        <input type="password" class="form-control" id="password" minlength="8" required>
      </div>
      <button type="button" class="btn btn-light pull-right mr-3 mb-3" onclick="create()">Create</button>
    </form>  
  </div>
    `;

ui.login = `
    <!-- ------------- LOGIN UI ------------- -->         
<div class="card text-white bg-primary mb-3" style="width:400px; margin: 10px 200px 100px 100px;">
<div class="card-header">LOGIN</div>

    <form>
      <div class="form-group" style="margin: 10px 10px 10px 10px;">
        <label for="email">Email:</label>
        <input type="email" class="form-control" id="email" placeholder="Enter email" name="email">
      </div>
      <div class="form-group" style="margin: 10px 10px 10px 10px;">
        <label for="pwd">Password:</label>
        <input type="password" class="form-control" id="password" placeholder="Enter password" name="password" minlength="8" required>
      </div>
      <div class="container-fluid">
            <a class="small text-white" href="#">Forgot password?</a>
      </div>
      <button type="button" class="btn btn-light pull-right mr-3 mb-3" onclick="login()">Submit</button>
    </form>
</div>
   `;

ui.deposit = `
    <!-- ------------- DEPOSIT UI ------------- -->
<div class="card text-white bg-secondary mb-3" style="width:400px; margin: 10px 200px 100px 100px;">
<div class="card-header">DEPOSIT</div>

    <form>
      <div class="form-group" style="margin: 10px 10px 10px 10px;">
        <label for="emailto">email to:</label>
        <input type="email" placeholder="Enter account" class="form-control" id="emailto" required>
      </div>
      <div class="form-group" style="margin: 10px 10px 10px 10px;">
        <label for="amount">amount:</label>
        <input type="number" min="1" max="500000" placeholder="Enter amount" class="form-control" id="amount">
      </div>
      <button type="button" class="btn btn-light pull-right mr-3 mb-3" onclick="deposit()">Submit</button>
    </form>
</div> 
   `;

ui.withdraw = `
    <!-- ------------- WITHDRAW UI ------------- --> 
<div class="card text-white bg-danger mb-3" style="width:400px; margin: 10px 200px 100px 100px;">
<div class="card-header">WITHDRAW</div>

    <form>
      <div class="form-group" style="margin: 10px 10px 10px 10px;">
        <label for="emailfrom">email from:</label>
        <input type="email" placeholder="Enter account" class="form-control" id="emailfrom" required>
      </div>

      <div class="form-group" style="margin: 10px 10px 10px 10px;">
        <label for="amount">amount:</label>
        <input type="number" min="1" max="500000" placeholder="Enter amount" class="form-control" id="amount">
      </div>
      <button type="button" class="btn btn-light pull-right mr-3 mb-3" onclick="withdraw()">Submit</button>
    </form>
</div>
`;

ui.transactions = `
    <!-- ------------- TRANSACTIONS UI ------------- --> 
<div class="card text-white bg-dark mb-3" style="width:400px; margin: 10px 200px 100px 100px;">
<div class="card-header">TRANSACTIONS (TRANSFER)</div>

    <form>
      <div class="form-group" style="margin: 10px 10px 10px 10px;">
        <label for="emailfrom">email from:</label>
        <input type="email" placeholder="Enter account (from)" class="form-control" id="emailfrom" required>
      </div>
      <div class="form-group" style="margin: 10px 10px 10px 10px;">
        <label for="emailto">email to:</label>
        <input type="email" placeholder="Enter account (to)" class="form-control" id="emailto" required>
      </div>
      <div class="form-group" style="margin: 10px 10px 10px 10px;">
        <label for="amount">amount:</label>
        <input type="number" min="1" max="500000" placeholder="Enter amount" class="form-control" id="amount">
      </div>
      <button type="button" class="btn btn-light pull-right mr-3 mb-3" onclick="transactions()">Submit</button>
    </form>
</div>
    `;

ui.balance = `
    <!-- ------------- BALANCE UI ------------- --> 
<div class="card text-white bg-info mb-3" style="width:400px; margin: 10px 200px 100px 100px;">
<div class="card-header">CURRENT TOTAL BALANCE</div>

    <form>
      <div class="form-group" style="margin: 10px 10px 10px 10px;">
        <label for="email">email:</label>
        <input type="email" placeholder="Enter account (email)" class="form-control" id="email" required>
      </div>
      <button type="button" class="btn btn-light pull-right mr-3 mb-3" onclick="consulta()">Submit</button>
    </form>
</div>
    `;

ui.allData = `
    <!-- ------------- ALL DATA UI ------------- --> 
<div class="card text-white bg-secondary mb-3" style="width:400px; margin: 10px 200px 100px 100px;">

<div class="card-header">ALL DATA</div>

    <form>
      <div class="form-group" style="margin: 10px 10px 10px 10px;">
        <label for="email">email:</label>
        <input type="email" placeholder="Enter account (email)" class="form-control" id="email" required>
      </div>

      <button type="button" class="btn btn-light pull-right mr-3 mb-3" onclick="allData()">Inquire</button>
    </form>
</div>
    `;

ui.default = `
    <!-- ------------- DEFAULT UI ------------- --> 
    <div class="card text-white bg-primary mb-3" style="margin: 50px 200px 50px 200px;">
        <div class="card-header">MyNewBadBank by Carlos Maldonado</div>
        <div class="card-body">
            <p class="card-text">This Bad Bank page is only for educational purposes.</p>
            <p class="card-text">It includes a first approach for the functional application around banking operations.</p>
            <p class="card-text">Here you will find options to:.</p>
            <p class="card-text">...i)   Create an account into this app</p>
            <p class="card-text">...ii)  Execute a Deposit into your account</p>
            <p class="card-text">...iii) Execute a Withdraw from your account</p>
            <p class="card-text">...iv)  Transfer an amount from your account to another one</p>
            <p class="card-text">...v)   Check the Current Balance</p>
            <p class="card-text">...vi)  Finally, All Data, which shows every transaction and details</p>
            <p class="card-text"> </p>
            <p class="card-text"> It has been a great exercise and a good initial challenge on this digital learning process</p>
            <p class="card-text"> Special Thanks. Whole MIT-LEARNING-TEAM</p>
        </div>
    </div>
`;

var target     = document.getElementById('target');
var navigation = document.getElementById('navigation');
navigation.innerHTML += ui.navigation;

var GoCreateAccount = function(){
  document.getElementById('tdetails').innerHTML = '';
  document.getElementById('msg').innerHTML = '';  
  target.innerHTML = ui.createAccount;
    
};

var GoLogin = function(){
  document.getElementById('tdetails').innerHTML = '';
  document.getElementById('msg').innerHTML = '';  
  target.innerHTML = ui.login;
};

var GoDeposit = function(){
  document.getElementById('tdetails').innerHTML = '';
  document.getElementById('msg').innerHTML = '';
  target.innerHTML = ui.deposit;
};

var GoWithdraw = function(){
  document.getElementById('tdetails').innerHTML = '';
  document.getElementById('msg').innerHTML = '';  
  target.innerHTML = ui.withdraw;
};

var GoTransactions = function(){
  document.getElementById('tdetails').innerHTML = '';
  document.getElementById('msg').innerHTML = '';  
  target.innerHTML = ui.transactions;
};

var GoBalance = function(){
  document.getElementById('tdetails').innerHTML = '';
  document.getElementById('msg').innerHTML = '';  
  target.innerHTML = ui.balance;    
};

var defaultModule = function(){
  document.getElementById('tdetails').innerHTML = '';
  document.getElementById('msg').innerHTML = '';
  target.innerHTML = ui.default;
};

var GoAllData = function(){
  document.getElementById('tdetails').innerHTML = '';
  document.getElementById('msg').innerHTML = '';  
  target.innerHTML = ui.allData;
};

defaultModule();
