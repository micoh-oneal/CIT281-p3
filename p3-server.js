const fs = require("fs");
const { request } = require("http");
const fastify = require("fastify")();
const {coinCount} = require('./p3-module');

fastify.get("/", (request, reply) => {
    reply
        fs.readFile(`${__dirname}/index.html`, (err, data) => {
            if (err) {
                console.log(err);
                reply.code(500);
                reply.header("Content-Type", "text/html; charset=utf-8");
            }
            else {
                console.log("URL: ", request.url, " - working");
                reply.code(200);
                reply.header("Content-Type", "text/html; charset=utf-8");
                reply.send(data);
            }
        });
});

fastify.get("/coin", (request, reply) => {

    //can I use let? or do I have to use const
    let { denom = 0, count = 0} = request.query;
    denom = parseInt(request.query.denom);
    count = parseInt(request.query.count);

    let coinValue = coinCount({denom, count});
    console.log (coinValue);
    console.log(denom, count);
    reply
        fs.readFile(`${__dirname}/index.html`, (err, data) => {
            if (err) {
                console.log(err);
                reply.code(500);
                reply.header("Content-Type", "text/html; charset=utf-8");
            }
            else {
                console.log("URL: ", request.url, " - working");
                reply.code(200);
                reply.header("Content-Type", "text/html; charset=utf-8");
                //reply.send(data);
                reply.send(
                    `<h2>Value of ${count} of ${denom} is ${coinValue}</h2>
                    <br/>
                    <a href="/">Home</a>`
                );
            }               //is ${coinValue} supposed to be the solution to coinCount?
        });
});

fastify.get("/coins", (request, reply) => {

    //can I use let? or do I have to use const
    /* let { denom = 0, count = 0} = request.query;
    denom = parseInt(request.query.denom);
    count = parseInt(request.query.count); */

    let {option} = request.query;
    console.log(option);
   // const coins = [{denom: 25, count: 2},{denom: 1, count: 7}];

    //let coinValue = coinCount({denom, count});
    //const coinValue = coinCount();
   // console.log (coinValue);

    switch (option) {
        case '1': 
            console.log('1');
            coinValue = coinCount({ denom: 5, count: 3 }, { denom: 10, count: 2 });
                console.log(coinValue);
            break;
        case '2':
            console.log('2');
            const coins = [{denom: 25, count: 2},{denom: 1, count: 7}];
            coinValue = coinCount(...coins);
            console.log(coinValue);
            break;
            
        default:
            coinValue = 0;
            break;
    }

    reply
        fs.readFile(`${__dirname}/index.html`, (err, data) => {
            if (err) {
                console.log(err);
                reply.code(500);
                reply.header("Content-Type", "text/html; charset=utf-8");
            }
            else {
                console.log("URL: ", request.url, " - working");
                reply.code(200);
                reply.header("Content-Type", "text/html; charset=utf-8");
                //reply.send(data);
                reply.send(
                    `<h2>Option ${option} value is
                    ${coinValue}</h2><br /><a href="/">Home</a>`
                );
            }               //is ${coinValue} supposed to be the solution to coinCount?
        });
});

const listenIP = "localhost";
const listenPort = 8080;
fastify.listen(listenPort, listenIP, (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});