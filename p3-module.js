function validDenomination(coin) {
    //const coinValues = [1, 5, 10, 25, 50, 100];
    //return coinValues.indexOf(coin) !== -1;
    return [1, 5, 10, 25, 50, 100].indexOf(coin) !== -1;
}

function valueFromCoinObject(obj) {
    const {denom = 0, count = 0} = obj;
    return denom * count;
}

function valueFromArray(arr) {
    //let result = 0;
    //for (let i = 0; i < arr.length; i++) {
        //result += valueFromCoinObject(arr[i])
    //}
    //return result
    return arr.reduce((accumulator, currentValue) => accumulator + valueFromCoinObject(currentValue), 0);
}

function coinCount(...coinage) {
    return valueFromArray(coinage);
}

module.exports = {coinCount};


console.log(validDenomination(1));
console.log("{}", coinCount({denom: 5, count: 3}));
console.log("{}s", coinCount({denom: 5, count: 3},{denom: 10, count: 2}));
const coins = [{denom: 25, count: 2},{denom: 1, count: 7}];
console.log("...[{}]", coinCount(...coins));