var data = { // user: gold in gms
    // test1: 3.2,
    // test2: 1.1,
    // test3: 0
};

// 1 gold token = 1mg of gold

function balance(user) {
    var currentHoldings = data[user];
    console.log("Current holding of user: " + user + " is: " + currentHoldings);

    return currentHoldings ?? 0;
}

function buyGold(user, qty) {
    var currentHoldings = data[user];
    console.log("Current holding of user: " + user + " is: " + currentHoldings);

    if(currentHoldings){
        data[user] = data[user] + qty;
    } else {
        data[user] = qty;
    }

    console.log("New holding of user: " + user + " is: " + data[user]);
    return data[user];
}

function sellGold(user, qty) {
    var currentHoldings = data[user];
    console.log("Current holding of user: " + user + " is: " + currentHoldings);

    if(currentHoldings > qty) {
        data[user] = data[user] - qty;
    } else {
        throw new Error("User doesn't have enough gold");
    }
}

// export default {
//     balance: balance, 
//     buyGold: buyGold,
//     sellGold: sellGold
// }

module.exports = {
    balance: balance, 
    buyGold: buyGold,
    sellGold: sellGold
};