var connect = require("connect");
var http = require('http');
var url = require("url");

var app = connect();

app.use(function(req, res){
    let urlObject = url.parse(req.originalUrl, true);
    if ('query' in urlObject) {
        query = urlObject.query;
        let operator = query.method;
        let operandOne = query.x;
        let operandTwo = query.y;

        let answer = calculate(operator, parseInt(operandOne), parseInt(operandTwo));

        let operatorSign = operatorSymbol(operator);

        res.write(`${operandOne} ${operatorSign} ${operandTwo} = ${answer}`);
    }
    res.end();
});

http.createServer(app).listen(3000);

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