const readline = require('readline');
const creditCard = require('./credit_card.js')
const fs = require('fs');
const rl = readline.createInterface({
  input: fs.createReadStream('input.txt')
});
var cards =  {};
var output = [];
var Card = creditCard.Card;

rl.on('line', function (line) {

  var words = line.split(" ");

  var cardCommand = words[0]
  var cardName = words[1]
  var cardNumber = words[2]

  var card = cards[cardName]

  if (cardCommand === "Add") {
      if (card) {
        console.log("Error!")
      }
      else {
        card = cards[cardName] = new Card(cardName, cardNumber, parseInt(words[3].replace('$','')), 0)
        // console.log(card.number)
        if (creditCard.validCreditCard(card.number) === false)
        {
          card.error = true;
          console.log("Error Card number is invalid");
        }
      }
  }
  else if (cardCommand === "Charge") {
    if (card && card.error != true) {
        var charge = card.balance + parseInt(words[2].replace('$',''))
        if (charge < card.limit) {
          card.balance = charge
        } else  {
          console.log("Error Charge amount exceeded");
        }
    }
  }
  else if (cardCommand == "Credit") {
    if (card && card.error != true) {
        card.balance -= parseInt(cardNumber.replace('$',''))
    }
    else {
      console.log("Invalid input (the card has an error)")
    }
  }
});

rl.on("close", function () {
    console.log("Summary: ");
    var cardNames = Object.keys(cards).sort();
    cardNames.forEach(function (currentCardName) {
        var currentCard = cards[currentCardName];
        // debugger
        if (currentCard.error === true) {
            console.log(`${currentCardName}: error`);
        } else {
            console.log(`${currentCardName}: \$${currentCard.balance}`);
        }
    });
});

