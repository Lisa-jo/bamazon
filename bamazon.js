var mysql = require("mysql");
const readline = require('readline');
var data = {};
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  readProducts();
  buy();
});



function updateProduct() {
  console.log("Updating all Rocky Road quantities...\n");
  var query = connection.query(
    "UPDATE products SET ? WHERE ?",
    [
      {
        quantity: 100
      },
      {
        flavor: "Rocky Road"
      }
    ],
    function(err, res) {
      console.log(res.affectedRows + " products updated!\n");
      // Call deleteProduct AFTER the UPDATE completes
      deleteProduct();
    }
  );

  // logs the actual query being run
  console.log(query.sql);
}

function readProducts() {
    this._data = {};
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;

    console.log("Welcome to the store!");
    console.log("---------------------------------------");
    // Pretty print all items in store.
    res.forEach(function(result) {
        console.log("ID: " + result.item_id);
        console.log("Name: " + result.product_name);
        console.log("Price: " + result.price);
        console.log("---------------------------------------");
        data[result.item_id] = result.stock_quantity;
    });
    connection.end();
  });
}

function buy() {
    var id, count, list;
    rl.question("Enter ID of the item you'd like to purchase and the amount: ", (answer) => {
        list = answer.split(' ');
        id = list[0];
        count = list[1];
        if(data[id] < count) {
            console.log('Insufficient quantity!');
        }
        else {
            console.log('Good Sale');
        }
        rl.close();
    });
}
