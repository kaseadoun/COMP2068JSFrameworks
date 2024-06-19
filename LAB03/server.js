var connect = require("connect");
var http = require('http');
var url = require("url");

var app = connect();

app.use(function(req, res){
    res.end(req.originalUrl);
    res.end("Hello from connect");
});

http.createServer(app).listen(3000);

// url.parse

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