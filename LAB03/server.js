// Required packages
var connect = require("connect");
var http = require('http');
var url = require("url");
// Create instance of Connect
var app = connect();
// Middleware to display the expression
app.use(function(req, res){
    // Set a variable to the parsed URL object
    let urlObject = url.parse(req.originalUrl, true);
    // If query exists in object...
    if ('query' in urlObject) {
        // Set the values found in query, get the values and set it in its respective variables
        query = urlObject.query;
        let operator = query.method;
        let operandOne = query.x;
        let operandTwo = query.y;
        // Calculate and save the answer
        let answer = calculate(operator, parseInt(operandOne), parseInt(operandTwo));
        // Get the operator symbol
        let operatorSign = operatorSymbol(operator);
        // Write it on the page
        res.write(`${operandOne} ${operatorSign} ${operandTwo} = ${answer}`);
    } else {
        res.write("Error. Query not found.");
    }
    // End response process
    res.end();
});
// Server port
http.createServer(app).listen(3000);
// Function to calculate
function calculate(operator, operandOne, operandTwo) {
    switch(operator) {
        case "add":
            return operandOne + operandTwo;
            break;
        case "subtract":
            return operandOne - operandTwo;
            break;
        case "multiply":
            return operandOne * operandTwo;
            break;
        case "divide":
            return operandOne / operandTwo;
            break;
        default:
            break;
    }
}
// Function to set the symbol
function operatorSymbol(operator) {
    switch(operator) {
        case "add":
            return '+'
        case "subtract":
            return '-'
        case "multiply":
            return 'x'
        case "divide":
            return '/'
        default:
            break;
    }
}