var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
  
    password: "root",
    database: "bamazonDB"
});

connection.connect(function(err){
 if (err) throw err;
 console.log( "CONNECTED as ID : " + connection.threadID + "\n");
 showAll();

});

function showAll(){
    var query = connection.query( "SELECT * FROM products_bam", function(err,res){
        for (var i = 0; i < res.length; i++){
            console.log(res[i].item_id + "|" + res[i].product_name + "|" + res[i].department_name + "|" + res[i].price + "|" + res[i].stock_quantity) ;
        }
        console.log("-----------------------------------");
    });
    console.log(query.sql);
}

function 