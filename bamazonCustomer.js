var mysql = require("mysql");
var inquirer = require("inquirer");


var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazonDB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("CONNECTED as ID : " + connection.threadID + "\n");
    showAll();

});



function showAll() {

    var query = connection.query("SELECT * FROM products_bam", function (err, result) {

        var choicesArray = [];
        for (var i = 0; i < result.length; i++) {
            choicesArray.push(
                result[i].product_name + " $" +
                result[i].price);
        }

        if (err) throw err;

        inquirer
            .prompt([
                {
                    name: "id",
                    type: "rawlist",
                    message: "Which item would you like to purchase select and item 1-10?",
                    choices: choicesArray
                },
                {
                    name: "quantity",
                    type: "input",
                    message: "How many would you like to purchase?",
                }

            ])

            .then(function (answer) {
                var index = result.findIndex(function (item) {
                    return item.id = answer.id;
                });

                // var Total = answer.quantity * result[index].price;
                
                if (answer.quantity < result[index].stock_quantity) {

                    console.log(answer.quantity);
                    console.log("We have enough! Let's finish your transaction!")
                    console.log("---------------------------------")
                    console.log("Your total price is: $" + answer.quantity * result[answer.quantity].price);
                    console.log("---------------------------------")

                    var newStock = result[index].stock_quantity - answer.quantity;
                    updateStock(answer.item_id, newStock);
                    console.log("THANK YOU FOR YOUR PURCHASE!");

                } else {
                    console.log("Insufficient quantity!");
                    connection.end();
                }
            });
    });
}

function updateStock(id, quantity) {
    var query = connection.query(
        "UPDATE products SET ? WHERE ?",
        [
            { stock_quantity: quantity },
            {
                item_id: id
            }
        ],
        function (err, res) {
            connection.end();
        }
    );
}
